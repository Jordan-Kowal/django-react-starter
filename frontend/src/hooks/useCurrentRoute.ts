import { routeConfig } from "@/routes";
import type { RouteConfigProps } from "@/routes/routeConfig";
import { useMemo } from "react";
import { matchRoutes, useLocation } from "react-router-dom";

type UseCurrentRoute = () => RouteConfigProps | undefined;

export const useCurrentRoute: UseCurrentRoute = () => {
  const location = useLocation();

  return useMemo(() => {
    const routes = matchRoutes(Object.values(routeConfig), location.pathname);
    return routes?.[0].route;
  }, [location.pathname]);
};
