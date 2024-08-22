import { jkdevLogoUrl } from "@/assets";
import { LoginForm } from "@/components/features/User";
import { Col, Image, Row, Typography } from "antd";
import type React from "react";
import { memo } from "react";

const { Text } = Typography;

const LoginPage: React.FC = memo(() => {
  return (
    <Row
      className={"max-w-xl text-center w-full mx-auto my-10"}
      gutter={[20, 40]}
      data-testid="login-page"
    >
      <Col span={24}>
        <Image
          preview={false}
          src={jkdevLogoUrl}
          alt="Logo"
          className="w-full max-w-72"
        />
      </Col>
      <Col span={24}>
        <Text italic>
          Bienvenue sur le site de Django React Starter. Veuillez-vous connecter
          pour continuer. Pour créer un compte, merci de contacter un
          administrateur.
        </Text>
      </Col>
      <Col span={24}>
        <LoginForm />
      </Col>
    </Row>
  );
});

export default LoginPage;
