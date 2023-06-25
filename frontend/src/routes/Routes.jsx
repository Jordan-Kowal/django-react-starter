import React, { memo, useEffect } from 'react';
import { useMount } from 'react-use';
import { Spin } from '@/components';
import { useAppConfig, useAuthStore } from '@/stores';
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
  const isAppConfigLoaded = useAppConfig((state) => state.isAppConfigLoaded());
  const fetchAppConfig = useAppConfig((state) => state.fetchAppConfig);

  useMount(fetchUser);

  /** Periodically check if the user is still authenticated */
  useEffect(() => {
    let interval;
    if (isAuthenticated) {
      interval = setInterval(checkAuth, 60000);
    }
    return () => clearInterval(interval);
  }, [checkAuth, isAuthenticated]);

  /** Fetch the app config once the user is authenticated */
  useEffect(() => {
    if (isAuthenticated && !isAppConfigLoaded) {
      fetchAppConfig();
    }
  }, [fetchAppConfig, isAppConfigLoaded, isAuthenticated]);

  if (!hasFetchedUserOnce)
    return <Spin text="Récupération des informations utilisateur..." />;

  if (!isAuthenticated)
    return (
      <RouteList
        defaultRoute={routeConfig.login}
        config={nonAuthenticatedRoutes}
      />
    );

  if (!isAppConfigLoaded)
    return <Spin text="Récupération des informations de l'application..." />;

  return (
    <RouteList defaultRoute={routeConfig.home} config={authenticatedRoutes} />
  );
};

export default memo(Routes);
