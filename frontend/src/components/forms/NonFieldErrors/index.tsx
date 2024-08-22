import { Form as AntdForm } from "antd";
import classNames from "classnames";
import type React from "react";
import { memo } from "react";

type NonFieldErrorsProps = {
  className?: string;
  dataTestId?: string;
};

export const NonFieldErrors: React.FC<NonFieldErrorsProps> = memo(
  ({ className, dataTestId }) => (
    <AntdForm.Item
      className={classNames(className, "custom-ant-non-field-errors")}
      data-testid={dataTestId}
      name="nonFieldErrors"
    />
  ),
);
