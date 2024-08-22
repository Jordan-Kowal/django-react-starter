import { Spin } from "@/components/ui";
import type React from "react";
import { Suspense, memo } from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import type { PartialRouteConfig, RouteConfigProps } from "../routeConfig";

type RouteListProps = {
  config: PartialRouteConfig;
  defaultRoute: RouteConfigProps;
};

export const RouteList: React.FC<RouteListProps> = memo(
  ({ config, defaultRoute }) => (
    <RouterRoutes>
      {Object.values(config).map(({ key, path, component }) => {
        const Component = component;
        return (
          <Route
            key={key}
            path={path}
            element={
              <Suspense fallback={<Spin dataTestId="loading-route" />}>
                <Component />
              </Suspense>
            }
          />
        );
      })}
      <Route path="*" element={<Navigate to={defaultRoute.path} replace />} />
    </RouterRoutes>
  ),
);
