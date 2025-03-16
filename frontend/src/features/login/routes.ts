import type { RouteConfig } from "@/router/types";
import { lazy } from "react";

export type LoginRouteKey = "login";

export const loginRoutes: Record<LoginRouteKey, RouteConfig> = {
  login: {
    path: "/login",
    component: lazy(() => import("./pages/LoginPage")),
    exact: true,
    routeKey: "login",
    requiresAuth: false,
  },
};
