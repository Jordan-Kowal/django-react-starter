import { IconButton, Logo } from "@/components/ui";
import { useLayoutStore } from "@/stores";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Grid, Layout } from "antd";
import classNames from "classnames";
import type React from "react";
import { memo } from "react";
import { useShallow } from "zustand/react/shallow";
import { HeaderNavigation } from "../HeaderNavigation";

const { useBreakpoint } = Grid;

const menuIconStyle = {
  zIndex: 2001,
};

export const Header: React.FC = memo(() => {
  const { lg } = useBreakpoint();
  const { siderCollapsed, toggleSider } = useLayoutStore(
    useShallow((state) => ({
      siderCollapsed: state.siderCollapsed,
      toggleSider: state.toggleSider,
    })),
  );

  return (
    <Layout.Header
      className="relative !bg-bg text-center !h-header py-0 px-default"
      data-testid="header"
    >
      {!lg && (
        <IconButton
          className={classNames("!absolute !top-0.5", {
            "!left-default": siderCollapsed,
            "!left-36": !siderCollapsed,
          })}
          icon={siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleSider}
          tooltip="Menu"
          style={menuIconStyle}
        />
      )}
      {!lg && (
        <Logo
          height={20}
          className={"relative -top-1.5"}
          dataTestId="header-logo"
        />
      )}
      <div className={"absolute -top-2 right-default"}>
        <HeaderNavigation />
      </div>
    </Layout.Header>
  );
});
