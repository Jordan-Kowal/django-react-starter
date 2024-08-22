import { Badge, type BadgeProps } from "antd";
import type React from "react";
import { memo } from "react";

type RibbonProps = BadgeProps & {
  children: React.ReactNode;
  color?: BadgeProps["color"];
  placement?: "start" | "end";
  show?: boolean;
  text?: string;
};

export const Ribbon: React.FC<RibbonProps> = memo(
  ({ children, color, placement = "end", show, text }) => {
    if (!text || !show) return children;

    return (
      // ! data-testid is not supported by Badge.Ribbon
      <Badge.Ribbon color={color} placement={placement} text={text}>
        {children}
      </Badge.Ribbon>
    );
  },
);
