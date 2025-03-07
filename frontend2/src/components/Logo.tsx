import { logoCyclePath, logoLightbulbPath } from "@/assets";
import clsx from "clsx";
import { memo, useMemo } from "react";

export type LogoProps = {
  size?: number;
  animated?: boolean;
};

const cycleStyle = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const Logo: React.FC<LogoProps> = memo(
  ({ animated = true, size = 100 }) => {
    const divStyle = useMemo(() => ({ width: size, height: size }), [size]);

    return (
      <div data-testid="logo" style={divStyle} className="relative mx-auto">
        <img
          src={logoCyclePath}
          alt="logo-wheel"
          width={size}
          className={clsx(
            "absolute",
            animated && "animate-[spin_15s_linear_infinite]",
          )}
        />
        <img
          src={logoLightbulbPath}
          alt="lightbulb"
          width={size * 0.4}
          className="absolute"
          style={cycleStyle}
        />
      </div>
    );
  },
);
