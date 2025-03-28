import { API_ROOT_URL } from "@/api/config";
import { SELF_MOCK } from "@/api/queries/__mocks__/useSelf";
import { http, HttpResponse } from "msw";

export const updateSelfSuccess = http.post(`${API_ROOT_URL}/self/`, () => {
  return HttpResponse.json(SELF_MOCK, { status: 200 });
});

export const updateSelfError = http.post(`${API_ROOT_URL}/self/`, () => {
  return HttpResponse.json({}, { status: 400 });
});

export const updateSelfCrash = http.post(`${API_ROOT_URL}/self/`, () => {
  return HttpResponse.json({}, { status: 500 });
});

export const updatePasswordSuccess = http.post(
  `${API_ROOT_URL}/self/update_password/`,
  () => {
    return HttpResponse.json(null, { status: 204 });
  },
);

export const updatePasswordCurrentError = http.post(
  `${API_ROOT_URL}/self/update_password/`,
  () => {
    return HttpResponse.json({ current_password: "error" }, { status: 400 });
  },
);

export const updatePasswordStrengthError = http.post(
  `${API_ROOT_URL}/self/update_password/`,
  () => {
    return HttpResponse.json({ password: "error" }, { status: 400 });
  },
);

export const updatePasswordCrash = http.post(
  `${API_ROOT_URL}/self/update_password/`,
  () => {
    return HttpResponse.json({}, { status: 500 });
  },
);
