import type React from "react";
import { memo, useMemo } from "react";
import { NavBar } from "./NavBar";

export type MainProps = {
  children: React.ReactNode;
  dataTestId?: string;
  showNavBar?: boolean;
};

const NAVBAR_HEIGHT = 64;

export const Main: React.FC<MainProps> = memo(
  ({ children, dataTestId, showNavBar }) => {
    const style = useMemo(() => {
      return showNavBar
        ? {
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            marginTop: `${NAVBAR_HEIGHT}px`,
          }
        : { minHeight: "100vh" };
    }, [showNavBar]);

    return (
      <main className="hero bg-base-100" data-testid={dataTestId} style={style}>
        <NavBar />
        <div className="hero-content">
          <div className="max-w-7xl">{children}</div>
        </div>
      </main>
    );
  },
);
