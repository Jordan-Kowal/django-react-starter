import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { API_ROOT_URL } from "@/api/config";
import type { ApiError } from "../types";
import { performRequest } from "../utils";

export type AppConfig = {
  debug: boolean;
  mediaUrl: string;
  staticUrl: string;
  appVersion: string;
};

export type ApiAppConfig = {
  debug: boolean;
  media_url: string;
  static_url: string;
  app_version: string;
};

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
    select: (data) => ({
      debug: data.debug,
      mediaUrl: data.media_url,
      staticUrl: data.static_url,
      appVersion: data.app_version,
    }),
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
