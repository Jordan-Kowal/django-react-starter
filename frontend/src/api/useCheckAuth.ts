import { API_ROOT_URL } from "@/config/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSelf } from "./useSelf";
import { performRequest } from "./utils";

type UseCheckAuthReturn = {
  isPending: boolean;
  isError: boolean;
  error: unknown;
};

export const useCheckAuth = (): UseCheckAuthReturn => {
  const url = `${API_ROOT_URL}/auth/check/`;
  const queryClient = useQueryClient();
  const { data: user } = useSelf();

  const { isPending, isError, error } = useQuery({
    queryKey: ["auth", "check"],
    queryFn: () => performRequest(url, { method: "GET" }),
    enabled: !!user,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  if (isError) {
    queryClient.removeQueries({ queryKey: ["auth", "check"] });
    queryClient.removeQueries({ queryKey: ["self"] });
  }

  return useMemo(
    () => ({
      isPending,
      isError,
      error,
    }),
    [isPending, isError, error],
  );
};
