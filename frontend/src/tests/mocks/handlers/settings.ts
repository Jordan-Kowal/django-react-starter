import { API_ROOT_URL } from "@/api/config";
import { SELF_MOCK } from "@/api/queries/__mocks__/useSelf";
import { http, HttpResponse } from "msw";

export const updateSelfSuccess = http.put(
  `${API_ROOT_URL}/self/account/`,
  () => {
    return HttpResponse.json(SELF_MOCK, { status: 200 });
  },
);

export const updateSelfError = http.put(`${API_ROOT_URL}/self/account/`, () => {
  return HttpResponse.json({}, { status: 400 });
});

export const updateSelfCrash = http.put(`${API_ROOT_URL}/self/account/`, () => {
  return HttpResponse.json({}, { status: 500 });
});

export const updatePasswordSuccess = http.put(
  `${API_ROOT_URL}/self/password/`,
  () => {
    return HttpResponse.json(null, { status: 204 });
  },
);

export const updatePasswordCurrentError = http.put(
  `${API_ROOT_URL}/self/password/`,
  () => {
    return HttpResponse.json({ current_password: "error" }, { status: 400 });
  },
);

export const updatePasswordStrengthError = http.put(
  `${API_ROOT_URL}/self/password/`,
  () => {
    return HttpResponse.json({ new_password: "error" }, { status: 400 });
  },
);

export const updatePasswordCrash = http.put(
  `${API_ROOT_URL}/self/password/`,
  () => {
    return HttpResponse.json({}, { status: 500 });
  },
);

export const deleteAccountSuccess = http.delete(
  `${API_ROOT_URL}/self/account/`,
  () => {
    return HttpResponse.json(null, { status: 204 });
  },
);

export const deleteAccountCrash = http.delete(
  `${API_ROOT_URL}/self/account/`,
  () => {
    return HttpResponse.json({}, { status: 500 });
  },
);
