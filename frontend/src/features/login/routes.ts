import type { RouteConfig } from "@/router";
import LoginPage from "./pages/LoginPage";
import PasswordResetPage from "./pages/PasswordResetPage";

export type LoginRouteKey = "login" | "passwordReset";

export const loginRoutes: Record<LoginRouteKey, RouteConfig> = {
  login: {
    path: "/login",
    // component: lazy(() => import("./pages/LoginPage")),
    component: LoginPage,
    key: "login",
    authAccess: "public-only",
  },
  passwordReset: {
    path: "/password-reset",
    // component: lazy(() => import("./pages/PasswordResetPage")),
    component: PasswordResetPage,
    key: "passwordReset",
    authAccess: "public-only",
  },
};
