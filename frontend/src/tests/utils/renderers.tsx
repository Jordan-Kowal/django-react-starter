import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type RenderHookResult,
  render,
  renderHook,
} from "@testing-library/react";
import { ConfigProvider } from "antd";
import frFR from "antd/locale/fr_FR";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

export const resetAllStores = () => {};

export const testQueryClient = new QueryClient({
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
  // @ts-ignore
  <BrowserRouter basename={import.meta.env.BASE_URL || ""}>
    <ConfigProvider locale={frFR}>
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    </ConfigProvider>
  </BrowserRouter>
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

export { improvedRenderHook as renderHook, improvedRender as render };
