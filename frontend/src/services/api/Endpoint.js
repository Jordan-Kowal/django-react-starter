import { getAuthCookie } from "@/core/users";
import Serializer from "./Serializer";

class Endpoint {
  constructor() {
    this.root = "/api/v1";
    this.serializer = new Serializer();
  }

  fetch = async (url, { data, formData, method }) => {
    const request = {
      method: method?.toUpperCase() || "GET",
      headers: {
        "X-CSRFToken": getAuthCookie(),
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
        "Content-Type": "application/json",
      };
    }

    const response = await fetch(url, request);

    if (response?.ok) {
      const isJson =
        response.headers.get("content-type") === "application/json";
      return isJson ? response.json() : Promise.resolve({});
    }

    const errorPayload = {
      status: response.status,
      text: response.statusText,
      errors: await response.json(),
    };
    return Promise.reject(errorPayload);
  };
}
export default Endpoint;
