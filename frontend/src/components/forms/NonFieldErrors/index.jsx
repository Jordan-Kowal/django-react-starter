import { Form as AntdForm } from "antd";
import React, { memo } from "react";
import styles from "./styles.module.less";

const NonFieldErrors = () => (
  <AntdForm.Item className={styles.nonFieldErrors} name="nonFieldErrors" />
);

NonFieldErrors.propTypes = {};

export default memo(NonFieldErrors);
