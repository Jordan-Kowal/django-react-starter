import {
  Outlet,
  createRootRoute,
  createRoute,
  lazyRouteComponent,
} from "@tanstack/react-router";
import { memo } from "react";
import { AppLayout } from "./components";
import { useUpdateMetadata } from "./hooks";

export const Route = createRootRoute({
  staticData: {
    routeKey: "homepage",
  },
  component: memo(() => {
    useUpdateMetadata();
    return (
      <AppLayout>
        <Outlet />
        {/* <TanStackRouterDevtools initialIsOpen={false} /> */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </AppLayout>
    );
  }),
});

export const HomepageRoute = createRoute({
  getParentRoute: () => Route,
  component: lazyRouteComponent(() => import("@/features/home/pages/Homepage")),
  path: "/",
  staticData: {
    routeKey: "homepage",
  },
});

export const routeTree = Route.addChildren([HomepageRoute]);
