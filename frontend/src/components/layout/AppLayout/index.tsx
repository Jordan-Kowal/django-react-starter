import { useCurrentRoute } from "@/hooks";
import { routeConfig } from "@/routes";
import { useLayoutStore } from "@/stores";
import { theme } from "@/styles";
import { Grid, Layout } from "antd";
import classNames from "classnames";
import type React from "react";
import { memo, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { Footer, Header, Sider } from "./components";

const { useBreakpoint } = Grid;

const contentClasses = "pr-default pb-default pl-default";
const contentStyle = {
  minHeight: theme.layout.mainHeight,
};

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = memo(({ children }) => {
  const { lg } = useBreakpoint();

  const { showLayout, setSiderCollapsed, setShowLayout } = useLayoutStore(
    useShallow((state) => ({
      showLayout: state.showLayout,
      setShowLayout: state.setShowLayout,
      setSiderCollapsed: state.setSiderCollapsed,
    })),
  );

  const currentRoute = useCurrentRoute();

  /** Show layout if the current route is not the login page */
  useEffect(() => {
    const showLayout = currentRoute?.path !== routeConfig.login.path;
    setShowLayout(showLayout);
  }, [currentRoute, setShowLayout]);

  /** On route change and resize, collapse the sider if the screen is small */
  // biome-ignore lint/correctness/useExhaustiveDependencies: on purpose
  useEffect(() => {
    if (showLayout && lg !== undefined) {
      setSiderCollapsed(!lg);
    }
  }, [lg, setSiderCollapsed, showLayout, currentRoute]);

  if (!showLayout)
    return (
      <div className={contentClasses} style={contentStyle}>
        {children}
      </div>
    );

  return (
    <Layout data-testid="app-layout">
      <Sider />
      <Layout className={classNames({ "ml-sider": lg })}>
        <Header />
        <div
          className={contentClasses}
          style={contentStyle}
          data-testid="content"
        >
          {children}
        </div>
        <Footer />
      </Layout>
    </Layout>
  );
});
