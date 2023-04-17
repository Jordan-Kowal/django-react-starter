/* eslint-disable class-methods-use-this */
import { keysToCamel } from 'jkscript';
import { date } from '@/services/dates';

class Serializer {
  deserializeUser = (user) => {
    const data = keysToCamel(user);
    data.cannotRefreshUntil =
      data.cannotRefreshUntil && date(data.cannotRefreshUntil);
    data.profile.lastScheduleUpdate =
      data.profile.lastScheduleUpdate && date(data.profile.lastScheduleUpdate);
    return data;
  };
}

export default Serializer;
