import { RootRoute } from "@/router";
import { maybeRedirectToHome } from "@/router/utils";
import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

export const loginPath = "/login";

export const LoginRoute = createRoute({
  beforeLoad: maybeRedirectToHome,
  getParentRoute: () => RootRoute,
  component: lazyRouteComponent(() => import("./pages/LoginPage")),
  path: loginPath,
  staticData: {
    routeKey: "login",
  },
});
