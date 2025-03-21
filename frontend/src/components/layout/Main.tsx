import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { memo, useMemo } from "react";
import { NavBar } from "./NavBar";

export type MainProps = {
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
  showNavBar?: boolean;
};

const NAVBAR_HEIGHT = 64;

export const Main: React.FC<MainProps> = memo(
  ({ children, className, dataTestId, showNavBar }) => {
    const style = useMemo(() => {
      return showNavBar
        ? {
            minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            marginTop: `${NAVBAR_HEIGHT}px`,
          }
        : { minHeight: "100vh" };
    }, [showNavBar]);

    return (
      <main
        className={`hero bg-base-100 w-full ${className || ""}`}
        data-testid={dataTestId}
        style={style}
      >
        {showNavBar && <NavBar />}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="hero-content w-full"
          >
            <div className="max-w-6xl w-full">{children}</div>
          </motion.div>
        </AnimatePresence>
      </main>
    );
  },
);
