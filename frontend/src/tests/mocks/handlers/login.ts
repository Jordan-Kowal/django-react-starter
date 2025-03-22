import { API_ROOT_URL } from "@/api/config";
import { http, HttpResponse } from "msw";

export const loginSuccess = http.post(`${API_ROOT_URL}/auth/login/`, () => {
  return HttpResponse.json(null, { status: 200 });
});

export const loginError = http.post(`${API_ROOT_URL}/auth/login/`, () => {
  return HttpResponse.json({ status: 400 });
});
