import type React from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Main } from "../layout";

export const NotFound: React.FC = memo(() => {
  const { t } = useTranslation();
  return <Main dataTestId="not-found">{t("Page not found")}</Main>;
});
