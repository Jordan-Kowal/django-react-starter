import { useCurrentRoute, useLocale } from "@/hooks";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { RouteKey } from "../router";

export const useUpdateMetadata = () => {
  const { t } = useTranslation();
  const currentRoute = useCurrentRoute();
  const { currentLocale } = useLocale();

  const routeTitles: Record<RouteKey, string> = useMemo(
    () => ({
      homepage: t("Django React Starter"),
      profile: t("Profile"),
      login: t("Login"),
    }),
    [t],
  );

  useEffect(() => {
    const routeKey = currentRoute?.staticData?.routeKey;
    if (!routeKey) return;
    document.title = routeTitles[routeKey] || t("Django React Starter");
    document.documentElement.lang = currentLocale;
  }, [currentRoute, routeTitles, t, currentLocale]);
};
