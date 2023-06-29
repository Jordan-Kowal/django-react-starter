import { useMemo } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';
import { routeConfig } from '@/routes';

const useCurrentRoute = () => {
  const location = useLocation();
  const routes = useMemo(
    () => matchRoutes(routeConfig, location.pathname),
    [location.pathname]
  );
  return routes ? routes[0].route : undefined;
};

export default useCurrentRoute;
