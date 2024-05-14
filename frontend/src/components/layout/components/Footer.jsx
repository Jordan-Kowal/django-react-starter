import React, { memo } from 'react';
import { Image, Layout, Typography } from 'antd';
import { jkdevLogoUrl } from '@/assets';
import { Space } from '@/components/ui';
import { now } from '@/services/dates';
import { useAppConfig } from '@/stores';
import styles from './Footer.module.less';

const { Text } = Typography;

const Footer = () => {
  const appConfig = useAppConfig((state) => state.appConfig);

  let text = `Copyright © 2022-${now().year()} JKDev - All Rights Reserved`;
  if (appConfig?.appVersion) {
    text += ` - ${appConfig.appVersion}`;
  }

  return (
    <Layout.Footer className={styles.footer}>
      <Space className={styles.footerContent} block centered>
        <Image preview={false} src={jkdevLogoUrl} alt="JKDev logo" width={20} />
        <Text type="secondary" italic className={styles.footerText}>
          {text}
        </Text>
      </Space>
    </Layout.Footer>
  );
};

Footer.propTypes = {};

export default memo(Footer);
