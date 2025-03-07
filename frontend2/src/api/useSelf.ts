import { API_ROOT_URL } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { type KeysToSnakeCase, keysToCamel } from "jkscript";
import { useMemo } from "react";
import { performRequest } from "./utils";

export type Self = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  profile: {
    user: number;
  };
};

type ApiSelf = KeysToSnakeCase<Self>;

type UseSelfReturn = {
  isPending: boolean;
  isError: boolean;
  error: unknown;
  data?: Self;
};

export const useSelf = (): UseSelfReturn => {
  const url = `${API_ROOT_URL}/self/`;
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["self"],
    queryFn: () => performRequest(url, { method: "GET" }),
    select: (data: ApiSelf) => keysToCamel(data) as Self,
  });

  return useMemo(
    () => ({
      isPending,
      isError,
      error,
      data,
    }),
    [isPending, isError, error, data],
  );
};
