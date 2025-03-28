import { loginSuccess } from "./login";
import { updatePasswordSuccess, updateSelfSuccess } from "./settings";
import { appConfig, checkAuthSuccess, logout, self } from "./shared";

export const defaultHandlers = [
  // Shared
  appConfig,
  checkAuthSuccess,
  self,
  // Auth
  loginSuccess,
  logout,
  // Profile
  updateSelfSuccess,
  updatePasswordSuccess,
];
