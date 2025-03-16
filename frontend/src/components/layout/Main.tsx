import type React from "react";
import { memo } from "react";

export type MainProps = {
  children: React.ReactNode;
  dataTestId?: string;
};

export const Main: React.FC<MainProps> = memo(({ children, dataTestId }) => {
  return (
    <main className="hero bg-base-100 min-h-screen" data-testid={dataTestId}>
      <div className="hero-content">
        <div className="max-w-7xl">{children}</div>
      </div>
    </main>
  );
});
