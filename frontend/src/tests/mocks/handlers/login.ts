import { HttpResponse, http } from "msw";
import { API_ROOT_URL } from "@/api/config";

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
    return HttpResponse.json(null, { status: 204 });
  },
);

export const passwordResetError = http.post(
  `${API_ROOT_URL}/auth/password_reset/`,
  () => {
    return HttpResponse.json(null, { status: 400 });
  },
);

export const passwordResetConfirmSuccess = http.post(
  `${API_ROOT_URL}/auth/password_reset_confirm/`,
  () => {
    return HttpResponse.json(null, { status: 204 });
  },
);

export const passwordResetConfirmPasswordError = http.post(
  `${API_ROOT_URL}/auth/password_reset_confirm/`,
  () => {
    return HttpResponse.json({ password: "error" }, { status: 400 });
  },
);

export const passwordResetConfirmGenericError = http.post(
  `${API_ROOT_URL}/auth/password_reset_confirm/`,
  () => {
    return HttpResponse.json({}, { status: 400 });
  },
);

export const passwordResetConfirmCrash = http.post(
  `${API_ROOT_URL}/auth/password_reset_confirm/`,
  () => {
    return HttpResponse.json(null, { status: 500 });
  },
);
