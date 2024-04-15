import React, { memo } from 'react';
import { Badge } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Ribbon.module.less';

const Ribbon = ({ children, color, placement = 'end', show, text }) => (
  <Badge.Ribbon color={color} placement={placement} text={text}>
    <div className={classNames(styles.ribbon, { [styles.hidden]: !show })}>
      {children}
    </div>
  </Badge.Ribbon>
);

Ribbon.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  placement: PropTypes.oneOf(['start', 'end']),
  show: PropTypes.bool,
  text: PropTypes.string,
};

export default memo(Ribbon);
