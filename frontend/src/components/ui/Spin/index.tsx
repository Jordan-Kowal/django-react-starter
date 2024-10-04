import { Spin as AntdSpin, type SpinProps as AntdSpinProps } from "antd";
import classNames from "classnames";
import type React from "react";
import { memo } from "react";

type SpinProps = AntdSpinProps & {
  dataTestId?: string;
  verticallyCentered?: boolean;
};

export const Spin: React.FC<SpinProps> = memo(
  ({
    children,
    spinning = true,
    tip,
    dataTestId,
    verticallyCentered = true,
    ...restProps
  }) => (
    <div
      className={classNames("flex w-full h-full justify-center", {
        "items-center": verticallyCentered,
      })}
      data-testid={dataTestId}
    >
      <AntdSpin
        className="w-full max-h-full"
        tip={tip}
        spinning={spinning}
        {...restProps}
      >
        {children}
      </AntdSpin>
    </div>
  ),
);
