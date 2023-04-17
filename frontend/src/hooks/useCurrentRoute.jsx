import { matchRoutes, useLocation } from 'react-router-dom';
import { routeConfig } from '@/routes';

const useCurrentRoute = () => {
  const location = useLocation();
  const routes = matchRoutes(Object.values(routeConfig), location.pathname);
  return routes ? routes[0].route : undefined;
};

export default useCurrentRoute;
