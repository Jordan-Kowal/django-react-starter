import { Main } from "@/components/layout";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import {
  GoBackButton,
  PasswordForm,
  UserForm,
  UserSettings,
} from "../components";

const SettingsPage: React.FC = memo(() => {
  const { t } = useTranslation();

  return (
    <Main
      dataTestId="settings-page"
      showNavBar
      className="w-full max-w-lg mx-auto"
    >
      <GoBackButton />
      <h1>{t("Settings")}</h1>
      <div className="divider divider-start">
        <span className="text-lg font-bold">{t("Preferences")}</span>
      </div>
      <UserSettings />
      <div className="divider divider-start mt-20">
        <span className="text-lg font-bold">{t("Information")}</span>
      </div>
      <UserForm />
      <div className="divider divider-start">
        <span className="text-lg font-bold">{t("Security")}</span>
      </div>
      <PasswordForm />
    </Main>
  );
});

export default SettingsPage;
