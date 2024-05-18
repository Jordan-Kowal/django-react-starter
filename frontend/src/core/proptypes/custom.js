import { Dayjs } from "dayjs";
import PropTypes from "prop-types";

export const DayjsPropType = PropTypes.instanceOf(Dayjs);

export const RoutePropShape = PropTypes.shape({
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
});

export const RouteConfigPropShape = PropTypes.objectOf(RoutePropShape);
