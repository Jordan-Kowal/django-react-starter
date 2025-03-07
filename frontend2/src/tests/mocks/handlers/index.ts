import { loginSuccess, logout } from "./login";
import { updatePasswordSuccess, updateSelfSuccess } from "./profile";
import { appConfig, checkAuthSuccess, self } from "./shared";

export const handlers = [
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
