import React, { Suspense, memo } from 'react';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import { Spin } from '@/components/ui';
import { RouteConfigPropShape, RoutePropShape } from '@/core/proptypes';
import { routeConfig } from './routeConfig';

const RouteList = ({ config, defaultRoute }) => (
  <RouterRoutes>
    {Object.entries(config).map(([id, { path, exact }]) => {
      const Component = routeConfig[id].component;
      return (
        <Route
          key={id}
          path={path}
          element={
            <Suspense fallback={<Spin text="Chargement en cours..." />}>
              <Component />
            </Suspense>
          }
          exact={exact}
        />
      );
    })}
    <Route path="*" element={<Navigate to={defaultRoute.path} replace />} />
  </RouterRoutes>
);

RouteList.propTypes = {
  config: RouteConfigPropShape.isRequired,
  defaultRoute: RoutePropShape.isRequired,
};

export default memo(RouteList);
