import { lazy } from 'react';

const publicRoutes = {};

export const nonAuthenticatedRoutes = {
  ...publicRoutes,
  login: {
    key: 'login',
    component: lazy(() => import('../pages/LoginPage')),
    path: `/login`,
    exact: true,
  },
};

export const authenticatedRoutes = {
  ...publicRoutes,
  home: {
    key: 'home',
    component: lazy(() => import('../pages/Homepage')),
    path: `/`,
    exact: true,
  },
  profile: {
    key: 'profile',
    component: lazy(() => import('../pages/ProfilePage')),
    path: `/profile`,
    exact: true,
  },
};

export const routeConfig = {
  ...nonAuthenticatedRoutes,
  ...authenticatedRoutes,
};

export const externalRoutePaths = {};
