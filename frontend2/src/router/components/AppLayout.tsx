import type React from "react";
import { memo } from "react";

export type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = memo(({ children }) => {
  return (
    <div className="hero bg-base-100 min-h-screen" data-testid="app-layout">
      <div className="hero-content">
        <div className="max-w-7xl">{children}</div>
      </div>
    </div>
  );
});
