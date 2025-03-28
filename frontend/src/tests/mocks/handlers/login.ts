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
