import { Main } from "@/components/layout";
import { Logo } from "@/components/ui";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { LoginForm, RegisterForm } from "../components";

type AuthMode = "login" | "register";

const LoginPage: React.FC = memo(() => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <Main dataTestId="login-page" className="w-full max-w-lg mx-auto">
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
      <div className="text-center mt-2 italic text-sm">
        <Link to="/password-reset" data-testid="password-reset-link">
          {t("Forgot your password?")}
        </Link>
      </div>
    </Main>
  );
});

export default LoginPage;
