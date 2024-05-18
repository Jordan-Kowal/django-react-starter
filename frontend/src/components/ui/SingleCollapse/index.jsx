import { Collapse } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { memo, useMemo } from "react";
import styles from "./styles.module.less";

const KEY = "1";

const SingleCollapse = ({
  activeByDefault,
  children,
  className,
  ghost,
  label,
  noPadding,
  size,
}) => {
  const defaultActiveKey = useMemo(
    () => (activeByDefault ? [KEY] : []),
    [activeByDefault],
  );

  const items = useMemo(
    () => [
      {
        key: KEY,
        label,
        children,
      },
    ],
    [label, children],
  );

  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      ghost={ghost}
      size={size}
      className={classNames(className, styles.singleCollapse, {
        [styles.noPadding]: noPadding,
      })}
      items={items}
    />
  );
};

SingleCollapse.propTypes = {
  activeByDefault: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  ghost: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  noPadding: PropTypes.bool,
  size: PropTypes.oneOf(["small", "middle", "large"]),
};

export default memo(SingleCollapse);
