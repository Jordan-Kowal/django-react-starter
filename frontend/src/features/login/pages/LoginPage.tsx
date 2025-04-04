import { useSelf } from "@/api/queries";
import { Main } from "@/components/layout";
import { Logo } from "@/components/ui";
import { routeConfigMap } from "@/router";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { LoginForm, RegisterForm } from "../components";

type AuthMode = "login" | "register";

const LoginPage: React.FC = memo(() => {
  const { t } = useTranslation();
  const { data: self } = useSelf();
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<AuthMode>("login");

  if (self) {
    navigate(routeConfigMap.homepage.path);
  }

  return (
    <Main dataTestId="login-page">
      <div className="max-w-50 mx-auto mb-6">
        <Logo />
      </div>
      <div className="text-center">
        <h1>{t("Django React Starter")}</h1>
        <div className="join my-4 justify-center w-full max-w-100">
          <input
            className="join-item btn w-1/2"
            type="radio"
            name="auth-mode"
            aria-label={t("Login")}
            checked={mode === "login"}
            onClick={() => setMode("login")}
            data-testid="mode-login"
          />
          <input
            className="join-item btn w-1/2"
            type="radio"
            name="auth-mode"
            aria-label={t("Register")}
            checked={mode === "register"}
            onClick={() => setMode("register")}
            data-testid="mode-register"
          />
        </div>
      </div>
      {mode === "login" ? <LoginForm /> : <RegisterForm />}
    </Main>
  );
});

export default LoginPage;
