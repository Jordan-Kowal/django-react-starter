import { useLogout } from "@/api/auth";
import { Logo } from "@/components/ui";
import { useCurrentRoute, useGoTo } from "@/hooks";
import { routeConfig } from "@/routes";
import { useLayoutStore } from "@/stores";
import {
  LogoutOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type React from "react";
import { memo, useMemo } from "react";

export const Sider: React.FC = memo(() => {
  const siderCollapsed = useLayoutStore((state) => state.siderCollapsed);

  const goToHome = useGoTo(routeConfig.home);
  const goToProfile = useGoTo(routeConfig.profile);

  const logout = useLogout();
  const currentRoute = useCurrentRoute();

  const menuItems = useMemo(
    () => [
      {
        label: "Homepage",
        key: "home",
        icon: <ProductOutlined />,
        onClick: goToHome,
      },
      {
        label: "Profil",
        key: "profile",
        icon: <UserOutlined />,
        onClick: goToProfile,
      },
      {
        label: "Déconnexion",
        key: "logout",
        icon: <LogoutOutlined />,
        onClick: logout.mutate,
      },
    ],
    [goToHome, goToProfile, logout],
  );

  const selectedKeys = useMemo(() => {
    return currentRoute?.key ? [currentRoute.key] : [];
  }, [currentRoute?.key]);

  return (
    <Layout.Sider
      collapsedWidth="0"
      collapsed={siderCollapsed}
      className="fixed overflow-auto h-screen border-r border-r-solid border-r-primary z-10 w-sider shadow-secondary"
      theme="light"
      data-testid="sider"
    >
      <div className="pt-5 pb-4 pl-7">
        <Logo height={28} />
      </div>
      <Menu
        theme="light"
        mode="inline"
        items={menuItems}
        selectedKeys={selectedKeys}
      />
    </Layout.Sider>
  );
});
