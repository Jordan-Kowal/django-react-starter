import { useQueryUtils } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryKeysBuilder } from "../queryKeys";
import { useSelf } from "../self";
import type { UseQueryResult } from "../types";
import { performRequest } from "../utils";
import { routeBuilder } from "./routes";

type UseCheckAuth = () => UseQueryResult;

export const useCheckAuth: UseCheckAuth = () => {
  const { removeQueries } = useQueryUtils();
  const { data: user } = useSelf();

  const { isPending, isError, error } = useQuery({
    queryKey: queryKeysBuilder.checkAuth(),
    queryFn: () => performRequest(routeBuilder.checkAuth(), { method: "GET" }),
    enabled: !!user,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  if (isError) {
    removeQueries(queryKeysBuilder.checkAuth());
    removeQueries(queryKeysBuilder.self());
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
