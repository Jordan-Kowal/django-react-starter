import React, { memo, useEffect } from 'react';
import { useMount } from 'react-use';
import { useShallow } from 'zustand/react/shallow';
import { Spin } from '@/components/ui';
import { useToggleLayout } from '@/hooks';
import { useAppConfig, useAuthStore } from '@/stores';
import RouteList from './RouteList';
import {
  authenticatedRoutes,
  nonAuthenticatedRoutes,
  routeConfig,
} from './routeConfig';

const Routes = () => {
  const { checkAuth, fetchUser, isAuthenticated, hasFetchedUserOnce } =
    useAuthStore(
      useShallow((state) => ({
        checkAuth: state.checkAuth,
        fetchUser: state.fetchUser,
        isAuthenticated: state.isAuthenticated(),
        hasFetchedUserOnce: state.hasFetchedUserOnce,
      }))
    );

  const { isAppConfigLoaded, fetchAppConfig } = useAppConfig(
    useShallow((state) => ({
      isAppConfigLoaded: state.isAppConfigLoaded,
      fetchAppConfig: state.fetchAppConfig,
    }))
  );

  useToggleLayout();

  useMount(fetchUser);

  /** Periodically check if the user is still authenticated */
  useEffect(() => {
    let interval;
    if (isAuthenticated) {
      interval = setInterval(checkAuth, 1000 * 60 * 5);
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
