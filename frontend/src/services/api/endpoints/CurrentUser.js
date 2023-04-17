import { keysToSnake } from 'jkscript';
import Endpoint from '../Endpoint';

class CurrentUser extends Endpoint {
  constructor() {
    super();
    this.mainRoute = `${this.root}/self`;
  }

  getCurrentUser = async () => {
    const response = await this.fetch(`${this.mainRoute}/`, { method: 'get' });
    return this.serializer.deserializeUser(response);
  };

  updateCurrentUser = async ({ email, firstName, lastName, profile }) => {
    const { subscribedToNotifications } = profile;
    return this.fetch(`${this.mainRoute}/`, {
      method: 'post',
      data: keysToSnake({
        email,
        firstName,
        lastName,
        profile: { subscribedToNotifications },
      }),
    });
  };

  updatePassword = async ({ currentPassword, password, confirmPassword }) =>
    this.fetch(`${this.mainRoute}/update_password/`, {
      method: 'post',
      data: keysToSnake({
        currentPassword,
        password,
        confirmPassword,
      }),
    });
}
export default CurrentUser;
