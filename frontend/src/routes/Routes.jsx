import React, { memo, useEffect } from 'react';
import { useMount } from 'react-use';
import { Spin } from '@/components';
import { useToggleLayout } from '@/hooks';
import { useAuthStore } from '@/stores';
import RouteList from './RouteList';
import {
  authenticatedRoutes,
  nonAuthenticatedRoutes,
  routeConfig,
} from './routeConfig';

const Routes = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const hasFetchedUserOnce = useAuthStore((state) => state.hasFetchedUserOnce);

  useToggleLayout();

  useMount(fetchUser);

  useEffect(() => {
    let interval;
    if (isAuthenticated) {
      interval = setInterval(checkAuth, 60000);
    }
    return () => clearInterval(interval);
  }, [checkAuth, isAuthenticated]);

  if (!hasFetchedUserOnce)
    return <Spin text="Récupération des informations utilisateur..." />;

  if (!isAuthenticated)
    return (
      <RouteList
        defaultRoute={routeConfig.login}
        config={nonAuthenticatedRoutes}
      />
    );

  return (
    <RouteList defaultRoute={routeConfig.home} config={authenticatedRoutes} />
  );
};

export default memo(Routes);
