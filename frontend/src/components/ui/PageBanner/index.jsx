import { Col, Row, Typography } from "antd";
import PropTypes from "prop-types";
import React, { memo } from "react";
import styles from "./styles.module.less";

const { Title } = Typography;

const PageBanner = ({ icon, label }) => (
  <Row className={styles.pageBanner}>
    <Col span={24}>
      <Title level={2} className={styles.titleText}>
        {icon && icon} {label}
      </Title>
    </Col>
  </Row>
);

PageBanner.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
};

export default memo(PageBanner);
