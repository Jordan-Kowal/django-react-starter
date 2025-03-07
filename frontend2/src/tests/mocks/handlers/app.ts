import { APP_CONFIG_MOCK } from "@/api/__mocks__/useAppConfig";
import { API_ROOT_URL } from "@/config/api";
import { http, HttpResponse } from "msw";

export const appConfig = http.get(`${API_ROOT_URL}/app/config/`, () => {
  return HttpResponse.json(APP_CONFIG_MOCK, { status: 200 });
});
