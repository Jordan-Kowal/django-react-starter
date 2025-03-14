import { APP_CONFIG_MOCK } from "@/api/__mocks__/useAppConfig";
import { SELF_MOCK } from "@/api/__mocks__/useSelf";
import { API_ROOT_URL } from "@/config/api";
import { http, HttpResponse } from "msw";

export const appConfig = http.get(`${API_ROOT_URL}/app/config/`, () => {
  return HttpResponse.json(APP_CONFIG_MOCK, { status: 200 });
});

export const checkAuthSuccess = http.get(`${API_ROOT_URL}/auth/check/`, () => {
  return HttpResponse.json(null, { status: 204 });
});

export const checkAuthError = http.get(`${API_ROOT_URL}/auth/check/`, () => {
  return HttpResponse.json(null, { status: 401 });
});

export const self = http.get(`${API_ROOT_URL}/self/`, () => {
  return HttpResponse.json(SELF_MOCK, { status: 200 });
});
