import type { RouteConfig } from "@/router";
import { lazy } from "react";

export type LoginRouteKey = "login";

export const loginRoutes: Record<LoginRouteKey, RouteConfig> = {
  login: {
    path: "/login",
    component: lazy(() => import("./pages/LoginPage")),
    key: "login",
    requiresAuth: false,
  },
};
