import type { KeysToSnakeCase } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { keysToCamel } from "jkscript";
import { useMemo } from "react";
import { queryKeysBuilder } from "../queryKeys";
import { useSelf } from "../self";
import type { UseQueryResult } from "../types";
import { performRequest } from "../utils";
import { routeBuilder } from "./routes";
import type { AppConfig } from "./types";

type ApiAppConfig = KeysToSnakeCase<AppConfig>;

type UseAppConfig = () => UseQueryResult<AppConfig>;

export const useAppConfig: UseAppConfig = () => {
  const { data: user } = useSelf();

  const { isPending, isError, error, data } = useQuery({
    queryKey: queryKeysBuilder.appConfig(),
    queryFn: () => performRequest(routeBuilder.appConfig(), { method: "GET" }),
    select: (data: ApiAppConfig) => keysToCamel(data) as AppConfig,
    enabled: !!user,
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
