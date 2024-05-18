import { routeConfig } from "@/routes";
import { useMemo } from "react";
import { matchRoutes, useLocation } from "react-router-dom";

const useCurrentRoute = () => {
  const location = useLocation();
  const routes = useMemo(
    () => matchRoutes(Object.values(routeConfig), location.pathname),
    [location.pathname],
  );
  return useMemo(() => routes?.[0].route, [routes]);
};

export default useCurrentRoute;
