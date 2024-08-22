import { PageBanner } from "@/components/layout";
import { Space } from "@/components/ui";
import { ProductOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import type React from "react";
import { memo } from "react";

const Homepage: React.FC = memo(() => (
  <Space block vertical size={20} data-testid="homepage">
    <PageBanner label="Homepage" icon={<ProductOutlined />} />
    <div className={"max-w-screen-2xl m-auto p-5"}>
      <Row gutter={[20, 20]} data-testid="homepage-content">
        <Col span={24}>Homepage</Col>
      </Row>
    </div>
  </Space>
));

export default Homepage;
