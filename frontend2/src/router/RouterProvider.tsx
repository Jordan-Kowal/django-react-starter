import { useAppConfig, useSelf } from "@/api";
import { useCheckAuth } from "@/api/useCheckAuth";
import { RouterProvider as TanStackRouterProvider } from "@tanstack/react-router";
import { memo, useMemo } from "react";
import { useUpdateMetadata } from "./hooks";
import { router } from "./router";

export const RouterProvider: React.FC = memo(() => {
  useUpdateMetadata();
  useCheckAuth();
  const { isPending } = useAppConfig();
  const { data: user, isPending: isFetchingUser } = useSelf();

  const context = useMemo(
    () => ({
      isAuthenticated: !!user,
    }),
    [user],
  );

  // TODO: Loading animation
  if (isFetchingUser || isPending) return null;

  return <TanStackRouterProvider router={router} context={context} />;
});
