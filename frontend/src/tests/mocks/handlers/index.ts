import {
  loginSuccess,
  passwordResetConfirmSuccess,
  passwordResetSuccess,
  registerSuccess,
} from "./login";
import {
  deleteAccountSuccess,
  updatePasswordSuccess,
  updateSelfSuccess,
} from "./settings";
import { appConfig, checkAuthSuccess, logout, self } from "./shared";

export const defaultHandlers = [
  // Shared
  appConfig,
  checkAuthSuccess,
  self,
  // Auth
  loginSuccess,
  registerSuccess,
  logout,
  passwordResetSuccess,
  passwordResetConfirmSuccess,
  // Settings
  updateSelfSuccess,
  deleteAccountSuccess,
  updatePasswordSuccess,
];
