import { useAppConfig, useCheckAuth, useSelf } from "@/api/queries";
import { Main } from "@/components/layout";
import { LoadingRing } from "@/components/ui";
import { Suspense, memo, useMemo } from "react";
import { Redirect, Route, Switch } from "wouter";
import { useUpdateMetadata } from "./hooks";
import { routeConfigMap } from "./routeConfig";

export const Routes = memo(() => {
  const { isPending: isAppConfigPending } = useAppConfig();
  const { data: user, isPending: isUserPending } = useSelf();
  useUpdateMetadata();
  useCheckAuth();

  const isLoading = isAppConfigPending || isUserPending;
  const isAuthenticated = !!user;

  const routes = useMemo(
    () =>
      Object.values(routeConfigMap)
        .filter((route) => !(route.requiresAuth && !isAuthenticated))
        .map((route) => (
          <Route key={route.key} path={route.path}>
            <Suspense fallback={<LoadingRing />}>
              <route.component />
            </Suspense>
          </Route>
        )),
    [isAuthenticated],
  );

  const defaultRoute = isAuthenticated
    ? routeConfigMap.homepage
    : routeConfigMap.login;

  if (isLoading) {
    return (
      <Main>
        <LoadingRing />
      </Main>
    );
  }

  return (
    <Switch>
      {routes}
      <Redirect to={defaultRoute.path} replace />
    </Switch>
  );
});
