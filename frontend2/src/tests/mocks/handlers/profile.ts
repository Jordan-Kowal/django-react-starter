import { SELF_MOCK } from "@/api/__mocks__/useSelf";
import { API_ROOT_URL } from "@/config/api";
import { http, HttpResponse } from "msw";

export const updateSelfSuccess = http.post(`${API_ROOT_URL}/self/`, () => {
  return HttpResponse.json(SELF_MOCK, { status: 200 });
});

export const updateSelfError = http.post(`${API_ROOT_URL}/self/`, () => {
  return HttpResponse.json({ status: 400 });
});

export const updatePasswordSuccess = http.post(
  `${API_ROOT_URL}/self/update_password/`,
  () => {
    return HttpResponse.json(null, { status: 204 });
  },
);

export const updatePasswordError = http.post(
  `${API_ROOT_URL}/self/update_password/`,
  () => {
    return HttpResponse.json({ status: 400 });
  },
);
