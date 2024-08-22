import { useAppConfig } from "@/api/app";
import { jkdevLogoUrl } from "@/assets";
import { Space } from "@/components/ui";
import { now } from "@/utils/dates";
import { Image, Layout, Typography } from "antd";
import type React from "react";
import { memo } from "react";

const { Text } = Typography;

export const Footer: React.FC = memo(() => {
  const { data: appConfig } = useAppConfig();

  let text = `Copyright © 2022-${now().year()} JKDev - All Rights Reserved`;
  if (appConfig?.appVersion) {
    text += ` - ${appConfig.appVersion}`;
  }

  return (
    <Layout.Footer
      className="flex justify-center p-0 pt-2 text-center h-footer"
      data-testid="footer"
    >
      <Space block centered>
        <Image
          preview={false}
          src={jkdevLogoUrl}
          alt="JKDev logo"
          width={20}
          className="mt-1"
        />
        <Text type="secondary" italic className="text-xs">
          {text}
        </Text>
      </Space>
    </Layout.Footer>
  );
});
