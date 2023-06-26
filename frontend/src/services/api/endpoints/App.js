import { keysToCamel } from 'jkscript';
import Endpoint from '../Endpoint';

class App extends Endpoint {
  constructor() {
    super();
    this.mainRoute = `${this.root}/app`;
  }

  getConfig = async () => {
    const response = await this.fetch(`${this.mainRoute}/config/`, {
      method: 'get',
    });
    return keysToCamel(response);
  };
}
export default App;
