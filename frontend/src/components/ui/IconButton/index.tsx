import { Button, type ButtonProps, Tooltip } from "antd";
import classNames from "classnames";
import type React from "react";
import { memo } from "react";

export type IconButtonProps = ButtonProps & {
  dataTestId?: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: CallableFunction;
  tooltip: string;
};

export const IconButton: React.FC<IconButtonProps> = memo(
  ({ dataTestId, icon, isActive, onClick, tooltip, ...props }) => (
    <Tooltip title={tooltip}>
      <Button
        className={classNames({
          "text-primary": isActive,
        })}
        data-testid={dataTestId}
        shape="circle"
        type="text"
        icon={icon}
        onClick={onClick}
        {...props}
      />
    </Tooltip>
  ),
);
