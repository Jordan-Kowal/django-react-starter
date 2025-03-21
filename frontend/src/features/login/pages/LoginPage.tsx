import { useSelf } from "@/api/queries";
import { Main } from "@/components/layout";
import { Logo } from "@/components/ui";
import { routeConfigMap } from "@/router";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { LoginForm } from "../components";

const LoginPage: React.FC = memo(() => {
  const { t } = useTranslation();
  const { data: self } = useSelf();
  const [, navigate] = useLocation();

  if (self) {
    navigate(routeConfigMap.homepage.path);
  }

  return (
    <Main data-testid="login-page">
      <div className="max-w-50 mx-auto mb-6">
        <Logo />
      </div>
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">{t("Django React Starter")}</h1>
        <p className="mb-6">
          {t("Don't have an account? Please reach out to your administrator")}
        </p>
      </div>
      <LoginForm />
    </Main>
  );
});

export default LoginPage;
