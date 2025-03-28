import type { RouteConfig } from "@/router";
import SettingsPage from "./pages/SettingsPage";

export type SettingsRouteKey = "settings";

export const settingsRoutes: Record<SettingsRouteKey, RouteConfig> = {
  settings: {
    path: "/settings",
    // component: lazy(() => import("./pages/SettingsPage")),
    component: SettingsPage,
    key: "settings",
    requiresAuth: true,
  },
};
