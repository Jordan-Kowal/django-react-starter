import { Space as AntdSpace, type SpaceProps as AntdSpaceProps } from "antd";
import classNames from "classnames";
import type React from "react";
import { memo } from "react";

type SpaceProps = AntdSpaceProps & {
  block?: boolean;
  centered?: boolean;
  className?: string;
  dataTestId?: string;
  size?: number | string;
  vertical?: boolean;
};

export const Space: React.FC<SpaceProps> = memo(
  ({
    block,
    centered,
    className,
    dataTestId,
    size = 8,
    vertical,
    ...restProps
  }) => (
    <AntdSpace
      data-testid={dataTestId}
      className={classNames(className, "justify-start box-border", {
        "w-full": block,
        "justify-center": centered,
      })}
      size={size}
      direction={vertical ? "vertical" : "horizontal"}
      {...restProps}
    />
  ),
);
