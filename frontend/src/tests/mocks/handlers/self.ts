import { SELF_MOCK } from "@/api/self/__mocks__/self";
import { routeBuilder } from "@/api/self/routes";
import { http, HttpResponse } from "msw";

export const self = http.get(routeBuilder.self(), () => {
  return HttpResponse.json(SELF_MOCK, { status: 200 });
});

export const updateSelfSuccess = http.post(routeBuilder.self(), () => {
  return HttpResponse.json(SELF_MOCK, { status: 200 });
});

export const updateSelfError = http.post(routeBuilder.self(), () => {
  return HttpResponse.json(
    { email: ["Cet email existe déjà"] },
    { status: 400 },
  );
});

export const updatePasswordSuccess = http.post(
  routeBuilder.updatePassword(),
  () => {
    return HttpResponse.json(null, { status: 204 });
  },
);

export const updatePasswordError = http.post(
  routeBuilder.updatePassword(),
  () => {
    return HttpResponse.json(
      {
        current_password: ["Mot de passe actuel incorrect"],
        password: ["Ce mot de passe est trop courant"],
      },
      { status: 400 },
    );
  },
);
