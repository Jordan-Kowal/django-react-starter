import { Button, Tooltip } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { memo } from "react";
import styles from "./styles.module.less";

const IconButton = ({
  icon,
  isActive,
  isText,
  onClick,
  size = "large",
  tooltip,
  ...props
}) => (
  <Tooltip title={tooltip}>
    <Button
      className={classNames(styles.iconButton, {
        [styles.isActiveIcon]: isActive,
      })}
      shape="circle"
      type={isText ? "text" : "default"}
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
  isText: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string,
  tooltip: PropTypes.string.isRequired,
};

export default memo(IconButton);
