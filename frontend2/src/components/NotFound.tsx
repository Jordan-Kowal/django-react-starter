import type React from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { HeroLayout } from "./HeroLayout";

export const NotFound: React.FC = memo(() => {
  const { t } = useTranslation();
  return <HeroLayout dataTestId="not-found">{t("Page not found")}</HeroLayout>;
});
