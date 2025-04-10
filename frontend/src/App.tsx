import { queryClient } from "@/api/config";
import { Toaster } from "@/components/ui";
import "@/config/dayjs";
import "@/config/i18n";
import { ThemeProvider } from "@/contexts";
import { Routes } from "@/router";
import "@/styles/base.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { memo, useEffect } from "react";
import { Router } from "wouter";
import { useLocale } from "./hooks";

export const App: React.FC = memo(() => {
  const { initLocale } = useLocale();

  useEffect(initLocale, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
});
