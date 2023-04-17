import { useEffect } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';
import { routeConfig } from '@/routes';
import { useLayoutStore } from '@/stores';

const NO_LAYOUT_ROUTES = [routeConfig.login];

const useToggleLayout = () => {
  const location = useLocation();

  const setShowLayout = useLayoutStore((state) => state.setShowLayout);

  useEffect(() => {
    const routes = matchRoutes(NO_LAYOUT_ROUTES, location.pathname);
    setShowLayout(!routes || routes.length === 0);
  }, [location.pathname, setShowLayout]);
};

export default useToggleLayout;
