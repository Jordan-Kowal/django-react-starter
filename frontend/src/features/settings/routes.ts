import type { RouteConfig } from "@/router";
import { lazy } from "react";

export type SettingsRouteKey = "settings";

export const settingsRoutes: Record<SettingsRouteKey, RouteConfig> = {
  settings: {
    path: "/settings",
    component: lazy(() => import("./pages/SettingsPage")),
    key: "settings",
    requiresAuth: true,
  },
};
