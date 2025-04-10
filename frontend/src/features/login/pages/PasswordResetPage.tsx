import { Main } from "@/components/layout";
import { Logo } from "@/components/ui";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { PasswordResetForm } from "../components";

const PasswordResetPage: React.FC = memo(() => {
  const { t } = useTranslation();
  return (
    <Main dataTestId="password-reset-page" className="w-full max-w-lg mx-auto">
      <div className="max-w-50 mx-auto mb-6">
        <Logo />
      </div>
      <div className="text-center">
        <h1>{t("Django React Starter")}</h1>
      </div>
      <PasswordResetForm />
    </Main>
  );
});

export default PasswordResetPage;
