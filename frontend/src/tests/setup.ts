import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { registerGlobalMocks } from "./mocks";
import { testQueryClient } from "./utils";
import "@testing-library/jest-dom/vitest";
import * as apiUtils from "@/api/utils";
import { useLayoutStore } from "@/stores";
import { HttpResponse } from "msw";
import { server } from "./server";

const STORES = [useLayoutStore];

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
  STORES.forEach((store) => store.setState(store.getInitialState()));
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
