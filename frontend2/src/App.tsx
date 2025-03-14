import { queryClient } from "@/config/api";
import "@/config/dayjs";
import "@/config/i18n";
import { DaisyUIProvider } from "@/contexts";
import { useLocale } from "@/hooks";
import { RouterProvider } from "@/router";
import "@/styles/daisyui.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { memo, useEffect } from "react";
import { Toaster } from "./components";

export const App: React.FC = memo(() => {
  const { setLocaleFromStorage } = useLocale();

  useEffect(setLocaleFromStorage, []);

  return (
    <DaisyUIProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider />
        <Toaster />
      </QueryClientProvider>
    </DaisyUIProvider>
  );
});
