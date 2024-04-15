import React, { memo } from 'react';
import { Col, Row, Typography } from 'antd';
import PropTypes from 'prop-types';
import styles from './PageBanner.module.less';

const { Text, Title } = Typography;

const PageContent = ({ description, label }) => (
  <Row className={styles.pageBanner}>
    <Col className={styles.pageBannerContent} span={24}>
      <Row align="middle">
        <Col xs={24} sm={12}>
          <Title className={styles.titleText}>{label}</Title>
        </Col>
        <Col xs={24} sm={12}>
          <Text className={styles.titleText} italic>
            {description}
          </Text>
        </Col>
      </Row>
    </Col>
  </Row>
);

PageContent.propTypes = {
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default memo(PageContent);
