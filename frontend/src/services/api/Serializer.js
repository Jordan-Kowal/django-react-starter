import { keysToCamel } from "jkscript";

class Serializer {
  deserializeUser = (user) => keysToCamel(user);
}

export default Serializer;
