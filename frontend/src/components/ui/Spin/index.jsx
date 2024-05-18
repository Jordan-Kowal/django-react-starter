import { Spin as AntdSpin } from "antd";
import PropTypes from "prop-types";
import React, { memo } from "react";
import styles from "./styles.module.less";

const Spin = ({ text = "Loading...", children, spinning = true }) => (
  <div className={styles.spinContainer}>
    <AntdSpin className={styles.antdSpin} tip={text} spinning={spinning}>
      {children}
    </AntdSpin>
  </div>
);

Spin.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  spinning: PropTypes.bool,
};

export default memo(Spin);
