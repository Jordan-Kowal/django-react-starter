import { useAppConfig, useCheckAuth, useSelf } from "@/api/queries";
import { Main } from "@/components/layout";
import { NotFound } from "@/components/pages";
import { LoadingRing } from "@/components/ui";
import { Suspense, memo, useMemo } from "react";
import { Route, Switch } from "wouter";
import { routeConfigMap } from "./routeConfigMap";

export const Routes = memo(() => {
  useCheckAuth();
  const { isPending: isAppConfigPending } = useAppConfig();
  const { data: user, isPending: isUserPending } = useSelf();

  const isLoading = isAppConfigPending || isUserPending;
  const isAuthenticated = !!user;

  const routes = useMemo(
    () =>
      Object.values(routeConfigMap)
        .filter((route) => !(route.requiresAuth && !isAuthenticated))
        .map((route) => (
          <Route
            key={route.routeKey}
            path={route.path}
            component={route.component}
          />
        )),
    [isAuthenticated],
  );

  if (isLoading) {
    return (
      <Main>
        <LoadingRing />
      </Main>
    );
  }

  return (
    <Suspense fallback={<LoadingRing />}>
      <Switch>
        {routes}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
});
