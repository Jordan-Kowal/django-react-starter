import * as apiUtils from "@/api/utils";
import i18n, { DEFAULT_LOCALE } from "@/config/i18n";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { HttpResponse } from "msw";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { registerGlobalMocks } from "./mocks";
import { server } from "./server";
import { testQueryClient } from "./utils";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

beforeEach(() => {
  registerGlobalMocks();
  vi.spyOn(HttpResponse, "json");
  vi.spyOn(apiUtils, "performRequest");
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  testQueryClient.clear();
  localStorage.clear();
  i18n.changeLanguage(DEFAULT_LOCALE);
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
