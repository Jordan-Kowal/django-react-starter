import { CheckOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import classNames from "classnames";
import type React from "react";
import { memo } from "react";

type FormCardProps = {
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
  isLoading: boolean;
  title: string;
  submitText: string;
};

export const FormCard: React.FC<FormCardProps> = memo(
  ({ children, className, dataTestId, isLoading, title, submitText }) => (
    <Card
      actions={[
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={isLoading}
          icon={<CheckOutlined />}
        >
          {submitText}
        </Button>,
      ]}
      className={classNames(className, "w-full m-auto max-w-2xl")}
      data-testid={dataTestId}
      title={title}
    >
      {children}
    </Card>
  ),
);
