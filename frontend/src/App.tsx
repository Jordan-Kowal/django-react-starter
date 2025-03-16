import { queryClient } from "@/api/config";
import { Toaster } from "@/components/ui";
import "@/config/dayjs";
import "@/config/i18n";
import { DaisyUIProvider } from "@/contexts";
import { useLocale } from "@/hooks";
import { Routes } from "@/router";
import "@/styles/daisyui.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { memo, useEffect } from "react";

export const App: React.FC = memo(() => {
  const { setLocaleFromStorage } = useLocale();

  useEffect(setLocaleFromStorage, []);

  return (
    <DaisyUIProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <Toaster />
      </QueryClientProvider>
    </DaisyUIProvider>
  );
});
