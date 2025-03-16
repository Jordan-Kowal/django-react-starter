import { homeRoutes } from "@/features/home/routes";
import { loginRoutes } from "@/features/login/routes";
import type { RouteConfig, RouteKey } from "./types";

export type RouteConfigMap = Record<RouteKey, RouteConfig>;

export const routeConfigMap: RouteConfigMap = {
  ...homeRoutes,
  ...loginRoutes,
};
