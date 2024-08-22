import { API_ROOT_URL } from "@/api/constants";

export const routeBuilder = Object.freeze({
  login: () => `${API_ROOT_URL}/auth/login/`,
  logout: () => `${API_ROOT_URL}/auth/logout/`,
  checkAuth: () => `${API_ROOT_URL}/auth/check/`,
});
