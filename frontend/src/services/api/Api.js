import { Auth, CurrentUser } from './endpoints';

class Api {
  auth = new Auth();

  currentUser = new CurrentUser();
}

const api = new Api();

const apiCall = async (endpoint, method, data = {}) => {
  const call = api[endpoint][method];
  try {
    return await call(data);
  } catch (error) {
    if (import.meta.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    return Promise.reject(error);
  }
};

export default apiCall;
