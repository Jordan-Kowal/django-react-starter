import { performRequest } from "@/api/utils";
import { HttpResponse } from "msw";
import type { ExpectStatic } from "vitest";

type ExpectApiCallOptions = {
  url: string;
  method: string;
  data?: Record<string, unknown>;
  status: number;
  response: Record<string, unknown> | null;
};

export const expectApiCall = (
  expect: ExpectStatic,
  { url, method, data, status, response }: ExpectApiCallOptions,
) => {
  expect(performRequest).toHaveBeenCalledWith(url, { method, data });
  expect(HttpResponse.json).toHaveBeenCalledWith(response, { status });
};

export const expectApiCallCount = (expect: ExpectStatic, count: number) => {
  expect(performRequest).toHaveBeenCalledTimes(count);
  expect(HttpResponse.json).toHaveBeenCalledTimes(count);
};
