import { NotFound } from "@/components";
import { queryClient } from "@/config/api";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes";

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  notFoundMode: "root",
  defaultNotFoundComponent: NotFound,
});

export type RouteKey = "homepage";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    routeKey: RouteKey;
  }
}
