import { Toaster } from "@/components/ui";
import "@/config/dayjs";
import "@/config/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type RenderHookResult,
  render,
  renderHook,
} from "@testing-library/react";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/contexts";

const resetAllStores = () => {};

const testQueryClient = new QueryClient({
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

const wrapComponent = (children: ReactNode) => (
  <ThemeProvider>
    <QueryClientProvider client={testQueryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  </ThemeProvider>
);

type ImprovedRender = (
  node: Parameters<typeof render>[0],
) => ReturnType<typeof render>;

const improvedRender: ImprovedRender = (node) =>
  render(node, { wrapper: ({ children }) => wrapComponent(children) });

type ImprovedRenderHook = <TProps, TResult>(
  hook: (props: TProps) => TResult,
) => RenderHookResult<TResult, TProps>;

const improvedRenderHook: ImprovedRenderHook = (hook) =>
  renderHook(hook, {
    wrapper: ({ children }) => wrapComponent(children),
  });

export {
  improvedRender as render,
  improvedRenderHook as renderHook,
  resetAllStores,
  testQueryClient,
};
