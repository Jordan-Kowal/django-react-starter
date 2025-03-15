import { HeroLayout } from "@/components";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const Homepage: React.FC = memo(() => {
  const { t } = useTranslation();

  return (
    <HeroLayout dataTestId="homepage">
      <h1 className="text-5xl font-bold">{t("Django React Starter")}</h1>
      <p className="py-6">
        {t("Browser-based multiplayer collaborative puzzle games")}
      </p>
      <div className="flex gap-4 justify-center">
        <button type="button" className="btn btn-primary w-50">
          {t("Create room")}
        </button>
        <button type="button" className="btn btn-secondary w-50">
          {t("Join room")}
        </button>
      </div>
    </HeroLayout>
  );
});

export default Homepage;
