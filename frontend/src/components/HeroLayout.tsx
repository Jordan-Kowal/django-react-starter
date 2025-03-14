import type React from "react";
import { memo } from "react";

export type HeroLayoutProps = {
  children: React.ReactNode;
  dataTestId?: string;
};

export const HeroLayout: React.FC<HeroLayoutProps> = memo(
  ({ children, dataTestId }) => {
    return (
      <div className="hero bg-base-100 min-h-screen" data-testid={dataTestId}>
        <div className="hero-content">
          <div className="max-w-7xl">{children}</div>
        </div>
      </div>
    );
  },
);
