import { useLocale } from "@/hooks";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { type RouteKey, pathToRoute } from "../routeConfig";

export const useUpdateMetadata = () => {
  const { t } = useTranslation();
  const { currentLocale } = useLocale();
  const [location] = useLocation();

  const routeTitles: Record<RouteKey, string> = useMemo(
    () => ({
      homepage: t("Django React Starter"),
      login: t("Login"),
      settings: t("Settings"),
      passwordReset: t("Password reset"),
    }),
    [t],
  );

  useEffect(() => {
    const routeKey = pathToRoute[location]?.key;
    document.title = routeTitles[routeKey] || t("Django React Starter");
    document.documentElement.lang = currentLocale;
  }, [location, routeTitles, t, currentLocale]);
};
