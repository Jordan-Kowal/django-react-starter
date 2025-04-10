import { API_ROOT_URL } from "@/api/config";
import { http, HttpResponse } from "msw";

export const loginSuccess = http.post(`${API_ROOT_URL}/auth/login/`, () => {
  return HttpResponse.json(null, { status: 201 });
});

export const loginError = http.post(`${API_ROOT_URL}/auth/login/`, () => {
  return HttpResponse.json(null, { status: 400 });
});

export const loginCrash = http.post(`${API_ROOT_URL}/auth/login/`, () => {
  return HttpResponse.json(null, { status: 500 });
});

export const registerSuccess = http.post(
  `${API_ROOT_URL}/auth/register/`,
  () => {
    return HttpResponse.json(
      { id: 1, email: "test@email.com" },
      { status: 201 },
    );
  },
);

export const registerEmailError = http.post(
  `${API_ROOT_URL}/auth/register/`,
  () => {
    return HttpResponse.json(
      { email: ["This email is already used"] },
      { status: 400 },
    );
  },
);

export const registerPasswordError = http.post(
  `${API_ROOT_URL}/auth/register/`,
  () => {
    return HttpResponse.json(
      { password: ["Password is too weak"] },
      { status: 400 },
    );
  },
);

export const registerCrash = http.post(`${API_ROOT_URL}/auth/register/`, () => {
  return HttpResponse.json(null, { status: 500 });
});

export const passwordResetSuccess = http.post(
  `${API_ROOT_URL}/auth/password_reset/`,
  () => {
    return HttpResponse.json(null, { status: 200 });
  },
);

export const passwordResetError = http.post(
  `${API_ROOT_URL}/auth/password_reset/`,
  () => {
    return HttpResponse.json(null, { status: 400 });
  },
);
