import { useCurrentRoute, useLocale } from "@/hooks";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useUpdateMetadata = () => {
  const { t } = useTranslation();
  const currentRoute = useCurrentRoute();
  const { currentLocale } = useLocale();

  const routeTitles = useMemo(
    () => ({
      homepage: t("Django React Starter"),
    }),
    [t],
  );

  useEffect(() => {
    const routeKey = currentRoute?.staticData?.routeKey;
    if (!routeKey) return;
    document.title = routeTitles[routeKey] || t("Django React Starter");
  }, [currentRoute, routeTitles, t]);

  useEffect(() => {
    document.documentElement.lang = currentLocale;
  }, [currentLocale]);
};
