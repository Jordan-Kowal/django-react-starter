import { Space } from "@/components/ui";
import { Card, Typography } from "antd";
import classNames from "classnames";
import { memo } from "react";

const { Text } = Typography;

type FormTabButtonProps = {
  dataTestId?: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  title: string;
};

export const FormTabButton: React.FC<FormTabButtonProps> = memo(
  ({ dataTestId, icon, isActive, onClick, title }) => (
    <Card
      className={classNames("h-36 w-36 text-center", {
        "border-primary text-primary": isActive,
      })}
      hoverable
      onClick={onClick}
      size="small"
      data-testid={dataTestId}
    >
      <Space block vertical>
        {icon}
        <Text className={classNames({ "text-primary": isActive })}>
          {title}
        </Text>
      </Space>
    </Card>
  ),
);
