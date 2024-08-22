import { getCookie } from "jkscript";
import { CSRF_TOKEN_COOKIE_NAME, CSRF_TOKEN_HEADER_NAME } from "../constants";

type FetchOptions = {
  data?: Record<string, any>;
  formData?: FormData;
  method: string;
};

export const performRequest = async (
  url: string,
  { data, formData, method }: FetchOptions,
): Promise<any> => {
  const request = {
    method: method.toUpperCase(),
    headers: {
      [CSRF_TOKEN_HEADER_NAME]: getCookie(CSRF_TOKEN_COOKIE_NAME),
      Accept:
        "application/json, text/plain, multipart/form-data, application/xhtml+xml, application/xml;q=0.9, image/avif, image/webp, */*;q=0.8",
    },
    redirect: "follow",
    body: formData || (data && JSON.stringify(data)) || undefined,
  };

  // 'Content-Type' must not be specified for multipart/form-data due to issues with boundary
  // See https://stackoverflow.com/a/39281156/11845532
  // So we only specify it for application/json use cases
  if (data) {
    request.headers = {
      ...request.headers,
      // @ts-ignore
      "Content-Type": "application/json",
    };
  }

  // @ts-ignore
  const response = await fetch(url, request);

  if (response?.ok) {
    const isJson = response.headers.get("content-type") === "application/json";
    return isJson ? response.json() : Promise.resolve({});
  }

  const errorPayload = {
    status: response.status,
    text: response.statusText,
    errors: await response.json(),
  };
  return Promise.reject(errorPayload);
};
