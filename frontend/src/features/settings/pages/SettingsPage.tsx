import { Main } from "@/components/layout";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const SettingsPage: React.FC = memo(() => {
  const { t } = useTranslation();

  return (
    <Main data-testid="settings-page" showNavBar>
      {t("Settings")}
    </Main>
  );
});

export default SettingsPage;
