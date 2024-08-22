import { Space } from "@/components/ui/Space";
import {
  Switch as AntSwitch,
  type SwitchProps as AntdSwitchProps,
  Typography,
} from "antd";
import type React from "react";
import { memo } from "react";

const { Text } = Typography;

type SwitchProps = AntdSwitchProps & {
  dataTestId?: string;
  text: string;
};

export const Switch: React.FC<SwitchProps> = memo(
  ({ dataTestId, text, ...rest }) => (
    <Space block dataTestId={dataTestId}>
      <AntSwitch {...rest} />
      <Text>{text}</Text>
    </Space>
  ),
);
