import React, { memo, useCallback, useState } from 'react';
import { Col, Image, Row, Typography } from 'antd';
import { jkdevLogoUrl } from '@/assets';
import { LoginForm } from '@/components/features/User';
import { Spin } from '@/components/ui';
import { useAuthStore } from '@/stores';
import styles from './styles.module.less';

const { Text } = Typography;

const LoginPage = () => {
  const [redirecting, setRedirecting] = useState(false);

  const login = useAuthStore((state) => state.login);

  const onFinish = useCallback(
    async (values) => {
      await login(values);
      setRedirecting(true);
    },
    [login]
  );

  if (redirecting)
    return (
      <Spin spinning text="Login successful. Redirecting to homepage..." />
    );

  return (
    <Row className={styles.loginPage} gutter={[20, 40]}>
      <Col span={24}>
        <Image
          preview={false}
          src={jkdevLogoUrl}
          alt="Logo"
          className={styles.logo}
        />
      </Col>
      <Col span={24}>
        <Text italic>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Bienvenue sur le site de Hubby. Veuillez-vous connecter pour
          continuer. Pour créer un compte, merci de contacter un administrateur.
        </Text>
      </Col>
      <Col span={24}>
        <LoginForm onFinish={onFinish} />
      </Col>
    </Row>
  );
};

LoginPage.propTypes = {};

export default memo(LoginPage);
