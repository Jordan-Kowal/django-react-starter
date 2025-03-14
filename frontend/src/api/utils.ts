import { CSRF_TOKEN_COOKIE_NAME, CSRF_TOKEN_HEADER_NAME } from "@/config/api";
import { getCookie } from "jkscript";

type FetchOptions = {
  data?: Record<string, any>;
  formData?: FormData;
  method: string;
};

export const performRequest = async (
  url: string,
  { data, method }: FetchOptions,
): Promise<any> => {
  const request = {
    method: method.toUpperCase(),
    headers: {
      [CSRF_TOKEN_HEADER_NAME]: getCookie(CSRF_TOKEN_COOKIE_NAME),
      Accept: "application/json",
    },
    redirect: "follow",
    body: (data && JSON.stringify(data)) || undefined,
  };

  // @ts-ignore
  const response = await fetch(url, request);
  const isJson = response.headers.get("content-type") === "application/json";

  // Exit if OK
  if (response?.ok) {
    return isJson ? response.json() : Promise.resolve({});
  }

  // Handle errors
  const errorResponse = isJson ? await response.json() : {};
  const errorPayload = {
    status: response.status,
    text: response.statusText,
    errors: errorResponse,
  };
  return Promise.reject(errorPayload);
};
