import { API_ROOT_URL } from "@/api/config";
import { routeConfigMap } from "@/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useLocation } from "wouter";
import type { ApiError } from "../types";
import { performRequest } from "../utils";
import { useSelf } from "./useSelf";

type UseCheckAuthReturn = {
  isPending: boolean;
  isError: boolean;
  error: ApiError | null;
};

export const useCheckAuth = (): UseCheckAuthReturn => {
  const url = `${API_ROOT_URL}/auth/check/`;
  const queryClient = useQueryClient();
  const { data: user } = useSelf();
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  const { isPending, isError, error } = useQuery<null, ApiError>({
    queryKey: ["auth", "check"],
    queryFn: () => performRequest(url, { method: "GET" }),
    enabled: !!user,
    refetchInterval: 1000 * 60 * 1, // 5 minutes
  });

  if (isError) {
    queryClient.removeQueries({ queryKey: ["auth", "check"] });
    queryClient.removeQueries({ queryKey: ["self"] });
    toast.warning(t("Your session has expired"));
    navigate(routeConfigMap.login.path);
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
