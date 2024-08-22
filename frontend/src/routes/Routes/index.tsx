import { useAppConfig } from "@/api/app";
import { useCheckAuth } from "@/api/auth";
import { useSelf } from "@/api/self";
import { Spin } from "@/components/ui";
import type React from "react";
import { memo } from "react";
import { RouteList } from "../RouteList";
import {
  authenticatedRoutes,
  nonAuthenticatedRoutes,
  routeConfig,
} from "../routeConfig";

export const Routes: React.FC = memo(() => {
  useCheckAuth();
  const { isPending } = useAppConfig();
  const {
    data: user,
    isPending: isFetchingUser,
    isError: errorFetchingUser,
  } = useSelf();

  if (isFetchingUser) return <Spin dataTestId="loading-user" />;

  if (!user || errorFetchingUser)
    return (
      <RouteList
        defaultRoute={routeConfig.login}
        config={nonAuthenticatedRoutes}
      />
    );

  if (isPending) return <Spin dataTestId="loading-app" />;

  return (
    <RouteList defaultRoute={routeConfig.home} config={authenticatedRoutes} />
  );
});
