import type React from "react";
import { memo } from "react";

export type HeroLayoutProps = {
  children: React.ReactNode;
};

export const HeroLayout: React.FC<HeroLayoutProps> = memo(({ children }) => {
  return (
    <div className="hero bg-base-100 min-h-screen" data-testid="hero-layout">
      <div className="hero-content">
        <div className="max-w-7xl">{children}</div>
      </div>
    </div>
  );
});
