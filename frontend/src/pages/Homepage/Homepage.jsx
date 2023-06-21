import React, { memo } from 'react';
import { Col, Row, Typography } from 'antd';
import { PageBanner, Space } from '@/components';

const { Text } = Typography;

const Homepage = () => (
  <Space block vertical size={20}>
    <PageBanner
      label="Accueil"
      description="La page d'accueil de l'application."
    />
    <Row>
      <Col span={24}>
        <Text>Homepage</Text>
      </Col>
    </Row>
  </Space>
);

Homepage.propTypes = {};

export default memo(Homepage);
