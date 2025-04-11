import { Main } from "@/components/layout";
import { Logo } from "@/components/ui";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { PasswordResetForm } from "../components";

const PasswordResetPage: React.FC = memo(() => {
  const { t } = useTranslation();
  return (
    <Main dataTestId="password-reset-page">
      <div className="max-w-50 mx-auto mb-6">
        <Logo />
      </div>
      <div className="text-center">
        <h2>{t("Forgot your password?")}</h2>
      </div>
      <PasswordResetForm />
    </Main>
  );
});

export default PasswordResetPage;
