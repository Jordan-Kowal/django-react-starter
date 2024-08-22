import { API_ROOT_URL } from "../constants";

export const routeBuilder = Object.freeze({
  self: () => `${API_ROOT_URL}/self/`,
  updatePassword: () => `${API_ROOT_URL}/self/update_password/`,
});
