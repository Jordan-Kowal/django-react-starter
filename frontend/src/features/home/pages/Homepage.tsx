import { Main } from "@/components/layout";
import { Logo } from "@/components/ui";
import { Settings, UserRound } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const Homepage: React.FC = memo(() => {
  const { t } = useTranslation();

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
          <button type="button" className="btn btn-primary w-50">
            <UserRound /> {t("Go to profile")}
          </button>
          <button type="button" className="btn btn-secondary w-50">
            <Settings /> {t("Go to settings")}
          </button>
        </div>
      </div>
    </Main>
  );
});

export default Homepage;
