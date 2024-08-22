import { routeBuilder } from "@/api/auth/routes";
import { http, HttpResponse } from "msw";

export const checkAuthSuccess = http.get(routeBuilder.checkAuth(), () => {
  return HttpResponse.json(null, { status: 204 });
});

export const checkAuthError = http.get(routeBuilder.checkAuth(), () => {
  return HttpResponse.json(null, { status: 401 });
});

export const loginSuccess = http.post(routeBuilder.login(), () => {
  return HttpResponse.json(null, { status: 200 });
});

export const loginError = http.post(routeBuilder.login(), () => {
  return HttpResponse.json(
    { non_field_errors: ["Identifiants de connexion invalides"] },
    { status: 400 },
  );
});
export const logout = http.post(routeBuilder.logout(), () => {
  return HttpResponse.json(null, { status: 204 });
});
