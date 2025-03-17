import { useLogout } from "@/api/queries";
import { Main } from "@/components/layout";
import { Logo } from "@/components/ui";
import { routeConfigMap } from "@/router";
import { LogOut, Settings } from "lucide-react";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";

const Homepage: React.FC = memo(() => {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const { mutateAsync: logout } = useLogout();

  const onLogoutClick = useCallback(async () => {
    try {
      await logout();
      navigate(routeConfigMap.login.path);
    } catch {}
  }, [logout, navigate]);

  return (
    <Main showNavBar dataTestId="homepage">
      <div className="text-center">
        <div className="max-w-50 mx-auto mb-6">
          <Logo />
        </div>
        <h1 className="text-5xl font-bold">{t("Django React Starter")}</h1>
        <p className="py-6">
          {t("An easy way to start a Django + React project")}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            type="button"
            className="btn btn-primary w-50"
            to={routeConfigMap.settings.path}
          >
            <Settings /> {t("Go to settings")}
          </Link>
          <button
            type="button"
            className="btn btn-secondary w-50"
            onClick={onLogoutClick}
          >
            <LogOut /> {t("Logout")}
          </button>
        </div>
      </div>
    </Main>
  );
});

export default Homepage;
