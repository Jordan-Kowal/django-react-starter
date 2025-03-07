import type React from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

export const NotFound: React.FC = memo(() => {
  const { t } = useTranslation();

  return <div data-testid="not-found">{t("Page not found")}</div>;
});
