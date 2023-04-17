import PropTypes from 'prop-types';
import { DayjsPropType } from './custom';

export const CurrentUserPropShape = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  isActive: PropTypes.bool,
  cannotRefreshUntil: DayjsPropType,
  profile: PropTypes.shape({
    user: PropTypes.number,
    resourceId: PropTypes.string,
    lastScheduleUpdate: DayjsPropType,
    subscribedToNotifications: PropTypes.bool,
  }),
});
