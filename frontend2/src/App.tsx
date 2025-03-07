import { queryClient } from "@/config/api";
import "@/config/dayjs";
import "@/config/i18n";
import { DaisyUIProvider } from "@/contexts";
import { useLocale } from "@/hooks";
import { router } from "@/router";
import "@/styles/daisyui.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { memo, useEffect } from "react";

export const App: React.FC = memo(() => {
  const { setLocaleFromStorage } = useLocale();

  useEffect(setLocaleFromStorage, []);

  return (
    <DaisyUIProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </DaisyUIProvider>
  );
});
