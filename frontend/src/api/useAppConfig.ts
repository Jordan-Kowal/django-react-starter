import { API_ROOT_URL } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { type KeysToSnakeCase, keysToCamel } from "jkscript";
import { useMemo } from "react";
import { performRequest } from "./utils";

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
  error: unknown;
  data?: AppConfig;
};

export const useAppConfig = (): UseAppConfigReturn => {
  const url = `${API_ROOT_URL}/app/config/`;
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["appConfig"],
    queryFn: () => performRequest(url, { method: "GET" }),
    select: (data: ApiAppConfig) => keysToCamel(data) as AppConfig,
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
