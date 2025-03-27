import { loginSuccess } from "./login";
import { updatePasswordSuccess, updateSelfSuccess } from "./settings";
import { appConfig, checkAuthSuccess, logout, notSelf, self } from "./shared";

export const handlers = [
  // Shared
  appConfig,
  checkAuthSuccess,
  self,
  notSelf,
  // Auth
  loginSuccess,
  logout,
  // Profile
  updateSelfSuccess,
  updatePasswordSuccess,
];
