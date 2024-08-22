import { useQuery } from "@tanstack/react-query";
import { keysToCamel } from "jkscript";
import { useMemo } from "react";
import { queryKeysBuilder } from "../queryKeys";
import type { UseQueryResult } from "../types";
import { performRequest } from "../utils";
import { routeBuilder } from "./routes";
import type { Self } from "./types";

type UseSelf = () => UseQueryResult<Self>;

export const useSelf: UseSelf = () => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: queryKeysBuilder.self(),
    queryFn: () => performRequest(routeBuilder.self(), { method: "GET" }),
    select: (data) => keysToCamel(data) as Self,
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
