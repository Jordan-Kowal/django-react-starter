import React, { memo } from 'react';
import { Button, Tooltip } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './IconButton.module.less';

const IconButton = ({
  icon,
  isActive,
  isTextButton,
  onClick,
  size = 'large',
  tooltip,
  ...props
}) => (
  <Tooltip title={tooltip}>
    <Button
      className={classNames(styles.iconButton, {
        [styles.isActiveIcon]: isActive,
      })}
      shape="circle"
      type={isTextButton ? 'text' : 'default'}
      icon={icon}
      size={size}
      onClick={onClick}
      {...props}
    />
  </Tooltip>
);

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  isTextButton: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string,
  tooltip: PropTypes.string.isRequired,
};

export default memo(IconButton);
