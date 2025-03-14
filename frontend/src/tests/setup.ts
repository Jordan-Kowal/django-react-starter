import * as apiUtils from "@/api/utils";
import i18n, { DEFAULT_LOCALE } from "@/config/i18n";
import "@testing-library/jest-dom/vitest";
import { HttpResponse } from "msw";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import type { StoreApi, UseBoundStore } from "zustand";
import { registerGlobalMocks } from "./mocks";
import { server } from "./server";
import { testQueryClient } from "./utils";

const STORES: UseBoundStore<StoreApi<unknown>>[] = [];

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

beforeEach(() => {
  registerGlobalMocks();
  vi.spyOn(HttpResponse, "json");
  vi.spyOn(apiUtils, "performRequest");
});

afterEach(() => {
  vi.restoreAllMocks();
  testQueryClient.clear();
  localStorage.clear();
  i18n.changeLanguage(DEFAULT_LOCALE);
  STORES.forEach((store) => store.setState(store.getInitialState()));
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
