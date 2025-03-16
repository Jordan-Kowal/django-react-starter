import type { HomeRouteKey } from "@/features/home/routes";
import type { LoginRouteKey } from "@/features/login/routes";

export type RouteKey = HomeRouteKey | LoginRouteKey;

export type RouteConfig = {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  routeKey: RouteKey;
  requiresAuth?: boolean;
};
