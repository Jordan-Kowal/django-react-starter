import { AppLayout } from "@/components/layout";
import { HelmetMetaData, Routes } from "@/routes";
import { antdTheme } from "@/styles";
import "@/styles/antd.less";
import "@/styles/global.less";
import "@/styles/tailwind.css";
import "@/utils/dates/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";
import frFR from "antd/locale/fr_FR";
import { memo } from "react";
import { BrowserRouter } from "react-router-dom";

const antdThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: antdTheme,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      retry: false,
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
});

export const App = memo(() => (
  // @ts-ignore
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <ConfigProvider locale={frFR} theme={antdThemeConfig}>
      <QueryClientProvider client={queryClient}>
        <HelmetMetaData />
        <AppLayout>
          <Routes />
        </AppLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  </BrowserRouter>
));
