import { useLogout } from "@/api/queries";
import { routeConfigMap } from "@/router";
import { LogOut, Settings } from "lucide-react";
import type React from "react";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Logo } from "../ui";

export const NavBar: React.FC = memo(() => {
  const { t } = useTranslation();
  const { mutateAsync: logout } = useLogout();

  const onLogoutClick = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 shadow-xs not-prose">
      <div className="navbar-start">
        <Link className="w-8" href={routeConfigMap.homepage.path}>
          <Logo />
        </Link>
      </div>
      <div className="navbar-center">
        <Link href={routeConfigMap.homepage.path}>
          <span className="text-xl font-bold">{t("Django React Starter")}</span>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="tooltip tooltip-bottom" data-tip={t("Settings")}>
          <Link
            type="button"
            className="btn btn-ghost btn-circle"
            href={routeConfigMap.settings.path}
          >
            <Settings />
          </Link>
        </div>
        <div className="tooltip tooltip-bottom" data-tip={t("Logout")}>
          <button
            type="button"
            className="btn btn-ghost btn-circle"
            onClick={onLogoutClick}
          >
            <LogOut />
          </button>
        </div>
      </div>
    </div>
  );
});
