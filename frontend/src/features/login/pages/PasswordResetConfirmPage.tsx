import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Main } from "@/components/layout";
import { Logo } from "@/components/ui";
import { PasswordResetConfirmForm } from "../components";

const PasswordResetConfirmPage: React.FC = memo(() => {
  const { t } = useTranslation();
  return (
    <Main dataTestId="password-reset-confirm-page">
      <div className="max-w-50 mx-auto mb-6">
        <Logo />
      </div>
      <div className="text-center">
        <h2>{t("Set your new password")}</h2>
      </div>
      <PasswordResetConfirmForm />
    </Main>
  );
});

export default PasswordResetConfirmPage;
