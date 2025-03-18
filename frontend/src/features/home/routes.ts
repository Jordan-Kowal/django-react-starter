import type { RouteConfig } from "@/router";
import Homepage from "./pages/Homepage";

export type HomeRouteKey = "homepage";

export const homeRoutes: Record<HomeRouteKey, RouteConfig> = {
  homepage: {
    path: "/",
    // component: lazy(() => import("./pages/Homepage")),
    component: Homepage,
    key: "homepage",
    requiresAuth: true,
  },
};
