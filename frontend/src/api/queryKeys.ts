export const QUERY_KEYS = Object.freeze({
  APP: "app",
  APP_CONFIG: "appConfig",
  CHECK_AUTH: "checkAuth",
  SELF: "self",
});

type QueryKeysBuilder = {
  // App
  appConfig: () => string[];
  checkAuth: () => string[];
  // Self
  self: () => string[];
};

export const queryKeysBuilder: QueryKeysBuilder = {
  // App
  appConfig: () => [QUERY_KEYS.APP, QUERY_KEYS.APP_CONFIG],
  checkAuth: () => [QUERY_KEYS.APP, QUERY_KEYS.CHECK_AUTH],
  // Self
  self: () => [QUERY_KEYS.SELF],
};
