import * as Sentry from "@sentry/react";

// @ts-ignore
const DSN = import.meta.env.VITE_SENTRY_DSN;
// @ts-ignore
const RELEASE = import.meta.env.VITE_APP_VERSION;
// @ts-ignore
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

Sentry.init({
  dsn: DSN,
  release: `django_react_starter@${RELEASE}`,
  sendDefaultPii: false, // GDPR
  environment: ENVIRONMENT,
  sampleRate: 0.2,
  tracesSampleRate: 0.2,
  profilesSampleRate: 0.2,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.browserApiErrorsIntegration(),
  ],
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/django_react_starter\.jkdev\.app\/api/,
    /^https:\/\/django_react_starter.fly.dev\.jkdev\.app\/api/,
  ],
});
