import { Space } from "@/components/ui";
import PropTypes from "prop-types";
import React, { memo } from "react";
import styles from "./styles.module.less";

const Section = ({ children }) => (
  <Space block className={styles.section} size={20} vertical>
    <div className={styles.sectionContent}>{children}</div>
  </Space>
);

Section.propTypes = {
  children: PropTypes.node,
};

export default memo(Section);
