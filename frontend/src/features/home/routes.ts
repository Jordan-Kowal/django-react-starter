import type { RouteConfig } from "@/router/types";
import { lazy } from "react";

export type HomeRouteKey = "homepage";

export const homeRoutes: Record<HomeRouteKey, RouteConfig> = {
  homepage: {
    path: "/",
    component: lazy(() => import("./pages/Homepage")),
    exact: true,
    routeKey: "homepage",
    requiresAuth: true,
  },
};
