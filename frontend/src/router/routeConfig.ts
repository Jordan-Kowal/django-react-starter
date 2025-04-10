import { type HomeRouteKey, homeRoutes } from "@/features/home/routes";
import { type LoginRouteKey, loginRoutes } from "@/features/login/routes";
import {
  type SettingsRouteKey,
  settingsRoutes,
} from "@/features/settings/routes";

export type RouteKey = HomeRouteKey | LoginRouteKey | SettingsRouteKey;
export type AuthAccess = "public" | "private" | "public-only";

export type RouteConfig = {
  path: string;
  component: React.ComponentType<any>;
  key: RouteKey;
  authAccess: AuthAccess;
};

export type RouteConfigMap = Record<RouteKey, RouteConfig>;

export const routeConfigMap: RouteConfigMap = {
  ...homeRoutes,
  ...loginRoutes,
  ...settingsRoutes,
};

export const pathToRoute: Record<string, RouteConfig> = Object.values(
  routeConfigMap,
).reduce(
  (acc, route) => {
    acc[route.path] = route;
    return acc;
  },
  {} as Record<string, RouteConfig>,
);
