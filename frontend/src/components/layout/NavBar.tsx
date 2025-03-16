import { Settings, UserRound } from "lucide-react";
import type React from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../ui";

export const NavBar: React.FC = memo(() => {
  const { t } = useTranslation();

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0">
      <div className="navbar-start">
        <div className="w-8">
          <Logo />
        </div>
      </div>
      <div className="navbar-center">
        <span className="text-xl font-bold">{t("Django React Starter")}</span>
      </div>
      <div className="navbar-end">
        <div className="tooltip" data-tip={t("Profile")}>
          <button type="button" className="btn btn-ghost btn-circle">
            <UserRound />
          </button>
        </div>
        <div className="tooltip" data-tip={t("Settings")}>
          <button type="button" className="btn btn-ghost btn-circle">
            <Settings />
          </button>
        </div>
      </div>
    </div>
  );
});
