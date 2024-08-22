import { API_ROOT_URL } from "@/api/constants";

export const routeBuilder = Object.freeze({
  appConfig: () => `${API_ROOT_URL}/app/config/`,
});
