import { useLogout } from "@/api/queries";
import { Main } from "@/components/layout";
import { Logo } from "@/components/ui";
import { routeConfigMap } from "@/router";
import { LogOut, Settings } from "lucide-react";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

const Homepage: React.FC = memo(() => {
  const { t } = useTranslation();
  const { mutateAsync: logout } = useLogout();

  const onLogoutClick = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <Main showNavBar dataTestId="homepage">
      <div className="text-center">
        <div className="max-w-50 mx-auto mb-6">
          <Logo />
        </div>
        <h1>{t("Django React Starter")}</h1>
        <p>{t("An easy way to start a Django + React project")}</p>
        <div className="w-full max-w-80 sm:max-w-120 mx-auto mt-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              type="button"
              className="btn btn-primary sm:flex-1"
              to={routeConfigMap.settings.path}
            >
              <Settings /> {t("Go to settings")}
            </Link>
            <button
              type="button"
              className="btn btn-secondary sm:flex-1"
              onClick={onLogoutClick}
            >
              <LogOut /> {t("Logout")}
            </button>
          </div>
        </div>
      </div>
    </Main>
  );
});

export default Homepage;
