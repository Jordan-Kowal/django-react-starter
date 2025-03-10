import { NotFound } from "@/components";
import { queryClient } from "@/config/api";
import { HomepageRoute } from "@/features/home/routes";
import {
  Outlet,
  createRootRouteWithContext,
  createRouter,
} from "@tanstack/react-router";
import { memo } from "react";
import { AppLayout } from "./components";

export type RouterContext = {
  isAuthenticated: boolean;
  queryClient: typeof queryClient;
};

export const RootRoute = createRootRouteWithContext<RouterContext>()({
  staticData: {
    routeKey: "homepage",
  },
  component: memo(() => {
    return (
      <AppLayout>
        <Outlet />
        {/* <TanStackRouterDevtools initialIsOpen={false} /> */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </AppLayout>
    );
  }),
});

const routeTree = RootRoute.addChildren([HomepageRoute]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    isAuthenticated: false,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  notFoundMode: "root",
  defaultNotFoundComponent: NotFound,
});

export type RouteKey = "homepage" | "profile" | "login";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    routeKey: RouteKey;
  }
  interface RouterContext {
    isAuthenticated: boolean;
  }
}
