import { jkdevLogoUrl } from "@/assets";
import { useGoTo } from "@/hooks";
import { routeConfig } from "@/routes";
import { Image } from "antd";
import classNames from "classnames";
import type React from "react";
import { memo } from "react";

type LogoProps = {
  className?: string;
  dataTestId?: string;
  height?: number;
};

export const Logo: React.FC<LogoProps> = memo(
  ({ className, dataTestId, height }) => {
    const goToHome = useGoTo(routeConfig.home);

    return (
      <Image
        className={classNames("cursor-pointer", className)}
        data-testid={dataTestId}
        preview={false}
        src={jkdevLogoUrl}
        alt="Logo"
        height={height}
        onClick={goToHome}
      />
    );
  },
);
