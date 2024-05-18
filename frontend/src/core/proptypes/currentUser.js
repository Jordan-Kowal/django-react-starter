import PropTypes from "prop-types";

export const CurrentUserPropShape = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  isActive: PropTypes.bool,
  isStaff: PropTypes.bool,
  isSuperuser: PropTypes.bool,
  profile: PropTypes.shape({
    user: PropTypes.number,
  }),
});
