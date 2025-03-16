import { useAppConfig, useCheckAuth, useSelf } from "@/api/queries";
import { Main } from "@/components/layout";
import { LoadingRing } from "@/components/ui";
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
      <Main>
        <LoadingRing />
      </Main>
    );

  return <TanStackRouterProvider router={router} context={context} />;
});
