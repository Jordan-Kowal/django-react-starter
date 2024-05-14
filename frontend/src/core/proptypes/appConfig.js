import PropTypes from 'prop-types';

export const AppConfigPropShape = PropTypes.shape({
  debug: PropTypes.bool,
  mediaUrl: PropTypes.string,
  staticUrl: PropTypes.string,
  appVersion: PropTypes.string,
});
