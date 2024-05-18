import { message } from "antd";
import { App, Auth, CurrentUser } from "./endpoints";

class Api {
  app = new App();

  auth = new Auth();

  currentUser = new CurrentUser();
}

const api = new Api();

const apiCall = async (
  endpoint,
  method,
  data,
  successMessage,
  errorMessage,
) => {
  const call = api[endpoint][method];
  try {
    const response = await call(data);
    if (successMessage) message.success(successMessage);
    return response;
  } catch (error) {
    if (import.meta.env.NODE_ENV === "development") {
      console.error(error);
    }
    if (error.status !== 400 && errorMessage) {
      message.error(errorMessage);
      return {};
    }
    return Promise.reject(error);
  }
};

export default apiCall;
