import { routeConfigMap } from "@/router";
import { ArrowLeftToLine } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";

export const GoBackButton: React.FC = memo(() => {
  const { t } = useTranslation();

  return (
    <div
      className="tooltip tooltip-bottom mb-4"
      data-tip={t("Back to homepage")}
    >
      <Link
        type="button"
        className="btn btn-outline btn-sm"
        href={routeConfigMap.homepage.path}
      >
        <ArrowLeftToLine size={16} />
        Go back
      </Link>
    </div>
  );
});
