import { useCurrentRoute } from "@/hooks";
import type React from "react";
import { memo, useMemo } from "react";
import { Helmet, HelmetData } from "react-helmet-async";

const defaultTitle = "Django React Starter";
const defaultDescription = "Django React Starter";
const helmetData = new HelmetData({});

export const HelmetMetaData: React.FC = memo(() => {
  const currentRoute = useCurrentRoute();

  const { title, description } = useMemo(() => {
    const title = currentRoute?.name || defaultTitle;
    const description = currentRoute?.description || defaultDescription;
    return { title, description };
  }, [currentRoute?.name, currentRoute?.description]);

  return (
    <Helmet helmetData={helmetData} defaultTitle={defaultTitle}>
      <html lang="fr" />
      <title lang="fr">{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
});
