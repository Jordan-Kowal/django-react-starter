import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

type QueryKey = Array<string | number>;

type UseQueryUtils = () => {
  invalidateQueries: (queryKey: QueryKey) => void;
  removeQueries: (queryKey: QueryKey) => void;
  resetQueries: (queryKey: QueryKey) => void;
};

export const useQueryUtils: UseQueryUtils = () => {
  const queryClient = useQueryClient();

  /** To trigger a new call because the data might be outdated */
  const invalidateQueries = useCallback(
    (queryKey: QueryKey) => {
      queryClient.invalidateQueries({ queryKey });
    },
    [queryClient],
  );

  /** Resets the query state (data, error, ...) as if it was never called */
  const resetQueries = useCallback(
    (queryKey: QueryKey) => {
      queryClient.resetQueries({ queryKey });
    },
    [queryClient],
  );

  /** Removes the query from the cache */
  const removeQueries = useCallback(
    (queryKey: QueryKey) => {
      queryClient.removeQueries({ queryKey });
    },
    [queryClient],
  );

  return useMemo(
    () => ({ invalidateQueries, removeQueries, resetQueries }),
    [invalidateQueries, removeQueries, resetQueries],
  );
};
