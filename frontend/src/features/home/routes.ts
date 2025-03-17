import type { RouteConfig } from "@/router";
import { lazy } from "react";

export type HomeRouteKey = "homepage";

export const homeRoutes: Record<HomeRouteKey, RouteConfig> = {
  homepage: {
    path: "/",
    component: lazy(() => import("./pages/Homepage")),
    key: "homepage",
    requiresAuth: true,
  },
};
