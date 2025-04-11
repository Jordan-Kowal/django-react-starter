import type { RouteConfig } from "@/router";
import LoginPage from "./pages/LoginPage";
import PasswordResetConfirmPage from "./pages/PasswordResetConfirmPage";
import PasswordResetPage from "./pages/PasswordResetPage";

export type LoginRouteKey = "login" | "passwordReset" | "passwordResetConfirm";

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
  passwordResetConfirm: {
    path: "/password-reset-confirm/:uid/:token",
    // component: lazy(() => import("./pages/PasswordResetConfirmPage")),
    component: PasswordResetConfirmPage,
    key: "passwordResetConfirm",
    authAccess: "public-only",
  },
};
