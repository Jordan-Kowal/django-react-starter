import { RootRoute } from "@/router";
import { maybeRedirectToLogin } from "@/router/utils";
import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

export const homepagePath = "/";

export const HomepageRoute = createRoute({
  beforeLoad: maybeRedirectToLogin,
  getParentRoute: () => RootRoute,
  component: lazyRouteComponent(() => import("./pages/Homepage")),
  path: homepagePath,
  staticData: {
    routeKey: "homepage",
  },
});
