import { APP_CONFIG_MOCK } from "@/api/app/__mocks__/appConfig";
import { routeBuilder } from "@/api/app/routes";
import { http, HttpResponse } from "msw";

export const appConfig = http.get(routeBuilder.appConfig(), () => {
  return HttpResponse.json(APP_CONFIG_MOCK, { status: 200 });
});
