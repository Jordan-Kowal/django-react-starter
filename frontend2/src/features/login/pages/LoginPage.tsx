import { Logo } from "@/components";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const LoginPage: React.FC = memo(() => {
  const { t } = useTranslation();

  return (
    <div data-testid="login-page" className="text-center">
      <div className="max-w-50 mx-auto mb-6">
        <Logo />
      </div>
      <h1 className="text-5xl font-bold mb-6">{t("Django React Starter")}</h1>
      <p className="mb-6">
        {t("Don't have an account? Please reach out to your administrator.")}
      </p>
      <form className="flex flex-col gap-4 justify-center max-w-100 mx-auto">
        <label className="input input-primary w-full validator">
          <input
            type="email"
            placeholder={t("Enter your email address")}
            required
          />
        </label>
        <label className="input input-primary w-full validator">
          <input type="password" placeholder={t("Password")} required />
        </label>
        <button type="submit" className="btn btn-primary w-full">
          {t("Login")}
        </button>
      </form>
    </div>
  );
});

export default LoginPage;
