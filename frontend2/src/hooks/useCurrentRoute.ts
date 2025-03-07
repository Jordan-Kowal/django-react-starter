import {
  type MakeRouteMatchUnion,
  useRouterState,
} from "@tanstack/react-router";
import { useMemo } from "react";

export const useCurrentRoute = (): MakeRouteMatchUnion => {
  const { location, matches } = useRouterState();

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  return useMemo(() => {
    return matches[matches.length - 1];
  }, [location.pathname]);
};
