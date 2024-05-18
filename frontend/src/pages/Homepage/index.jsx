import { PageBanner, Space } from "@/components/ui";
import { HomeOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import React, { memo } from "react";

const { Text } = Typography;

const Homepage = () => (
  <Space block vertical size={20}>
    <PageBanner label="Accueil" icon={<HomeOutlined />} />
    <Row>
      <Col span={24}>
        <Text>Homepage</Text>
      </Col>
    </Row>
  </Space>
);

Homepage.propTypes = {};

export default memo(Homepage);
