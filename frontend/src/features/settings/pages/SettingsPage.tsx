import { Main } from "@/components/layout";
import { Settings } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { PasswordForm, UserForm, UserSettings } from "../components";

const SettingsPage: React.FC = memo(() => {
  const { t } = useTranslation();

  return (
    <Main
      data-testid="settings-page"
      showNavBar
      className="w-full max-w-lg mx-auto"
    >
      <div className="flex gap-2">
        <Settings size={48} />
        <h1>{t("Settings")}</h1>
      </div>
      <div className="divider divider-start">{t("User settings")}</div>
      <UserSettings />
      <div className="divider divider-start">{t("User information")}</div>
      <UserForm />
      <div className="divider divider-start">{t("Password management")}</div>
      <PasswordForm />
    </Main>
  );
});

export default SettingsPage;
