import { ArrowLeftToLine } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { routeConfigMap } from "@/router";

export const GoBackButton: React.FC = memo(() => {
  const { t } = useTranslation();

  return (
    <div
      className="tooltip tooltip-bottom mb-4"
      data-tip={t("Back to homepage")}
      data-testid="go-back-button"
    >
      <Link
        type="button"
        className="btn btn-outline btn-sm"
        data-testid="go-back-link"
        href={routeConfigMap.homepage.path}
      >
        <ArrowLeftToLine size={16} />
        {t("Go back")}
      </Link>
    </div>
  );
});
