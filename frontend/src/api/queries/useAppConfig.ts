import { API_ROOT_URL } from "@/api/config";
import { useQuery } from "@tanstack/react-query";
import { type KeysToSnakeCase, keysToCamel } from "jkscript";
import { useMemo } from "react";
import type { ApiError } from "../types";
import { performRequest } from "../utils";

export type AppConfig = {
  debug: boolean;
  mediaUrl: string;
  staticUrl: string;
  appVersion: string;
};

type ApiAppConfig = KeysToSnakeCase<AppConfig>;

type UseAppConfigReturn = {
  isPending: boolean;
  isError: boolean;
  error: ApiError | null;
  data?: AppConfig;
};

export const useAppConfig = (): UseAppConfigReturn => {
  const url = `${API_ROOT_URL}/app/config/`;
  const { isPending, isError, error, data } = useQuery<
    ApiAppConfig,
    ApiError,
    AppConfig
  >({
    queryKey: ["appConfig"],
    queryFn: () => performRequest(url, { method: "GET" }),
    select: (data) => keysToCamel(data) as AppConfig,
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
