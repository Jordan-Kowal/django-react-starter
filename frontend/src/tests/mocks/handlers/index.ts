import { appConfig } from "./app";
import { checkAuthSuccess, loginSuccess, logout } from "./auth";
import { self, updatePasswordSuccess, updateSelfSuccess } from "./self";

export const handlers = [
  // App
  appConfig,
  // Auth
  checkAuthSuccess,
  loginSuccess,
  logout,
  // Self
  self,
  updateSelfSuccess,
  updatePasswordSuccess,
];
