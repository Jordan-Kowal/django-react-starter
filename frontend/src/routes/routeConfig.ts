import type React from "react";
import { lazy } from "react";

export type RouteConfigKey = "login" | "home" | "profile";

export type RouteConfigProps = {
  key: RouteConfigKey;
  name: string;
  description: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  path: string;
};

export type RouteConfig = Record<RouteConfigKey, RouteConfigProps>;

export type PartialRouteConfig = Partial<RouteConfig>;

export type NonAuthenticatedRoutes = Pick<RouteConfig, "login">;

export type AuthenticatedRoutes = Omit<RouteConfig, "login">;

export const nonAuthenticatedRoutes: NonAuthenticatedRoutes = {
  login: {
    key: "login",
    name: "Connexion",
    description:
      "Connectez-vous pour accéder à la plateforme Django React Starter",
    component: lazy(() => import("../pages/LoginPage")),
    path: "/login",
  },
};

export const authenticatedRoutes: AuthenticatedRoutes = {
  home: {
    key: "home",
    name: "Accueil",
    description: "Bienvenue sur Django React Starter",
    component: lazy(() => import("../pages/Homepage")),
    path: "/",
  },
  profile: {
    key: "profile",
    name: "Profil",
    description: "Modifiez vos informations personnelles",
    component: lazy(() => import("../pages/ProfilePage")),
    path: "/profile",
  },
};

export const routeConfig: RouteConfig = {
  ...nonAuthenticatedRoutes,
  ...authenticatedRoutes,
};
