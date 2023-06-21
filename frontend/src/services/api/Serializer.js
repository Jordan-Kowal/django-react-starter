/* eslint-disable class-methods-use-this */
import { keysToCamel } from 'jkscript';

class Serializer {
  deserializeUser = (user) => keysToCamel(user);
}

export default Serializer;
