import type { RouteConfig } from "@/router";
import LoginPage from "./pages/LoginPage";

export type LoginRouteKey = "login";

export const loginRoutes: Record<LoginRouteKey, RouteConfig> = {
  login: {
    path: "/login",
    // component: lazy(() => import("./pages/LoginPage")),
    component: LoginPage,
    key: "login",
    requiresAuth: false,
  },
};
