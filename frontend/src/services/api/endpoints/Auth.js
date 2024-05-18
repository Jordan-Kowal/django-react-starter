import Endpoint from "../Endpoint";

class Auth extends Endpoint {
  constructor() {
    super();
    this.mainRoute = `${this.root}/auth`;
  }

  check = async () => this.fetch(`${this.mainRoute}/check/`, { method: "get" });

  login = async ({ email, password }) =>
    this.fetch(`${this.mainRoute}/login/`, {
      method: "post",
      data: { email, password },
    });

  logout = async () =>
    this.fetch(`${this.mainRoute}/logout/`, { method: "post" });
}
export default Auth;
