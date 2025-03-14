import { useAppConfig, useSelf } from "@/api";
import { useCheckAuth } from "@/api/useCheckAuth";
import { HeroLayout, LoadingRing } from "@/components";
import { RouterProvider as TanStackRouterProvider } from "@tanstack/react-router";
import { memo, useMemo } from "react";
import { router } from "./router";

export const RouterProvider: React.FC = memo(() => {
  useCheckAuth();
  const { isPending } = useAppConfig();
  const { data: user, isPending: isFetchingUser } = useSelf();

  const context = useMemo(
    () => ({
      isAuthenticated: !!user,
    }),
    [user],
  );

  if (isFetchingUser || isPending)
    return (
      <HeroLayout>
        <LoadingRing />
      </HeroLayout>
    );

  return <TanStackRouterProvider router={router} context={context} />;
});
