import { QueryClient } from "@tanstack/react-query";

export const API_ROOT_URL = "/api/v1";
export const CSRF_TOKEN_HEADER_NAME = "X-CSRFToken";
export const CSRF_TOKEN_COOKIE_NAME = "django_react_starter-csrftoken";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      retry: false,
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
});
