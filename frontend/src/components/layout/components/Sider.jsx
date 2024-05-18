import { Logo } from "@/components/ui";
import { SortedProjectValues } from "@/core/enums";
import { useCurrentRoute, useNav } from "@/hooks";
import { useAuthStore, useLayoutStore } from "@/stores";
import {
  LogoutOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { memo } from "react";
import styles from "./Sider.module.less";

const Sider = () => {
  const logout = useAuthStore((state) => state.logout);
  const siderCollapsed = useLayoutStore((state) => state.siderCollapsed);

  const { navigateToHome, navigateToProfile, navigateToProject } = useNav();
  const currentRoute = useCurrentRoute();

  const menuItems = [
    {
      label: "Hub",
      key: "home",
      icon: <ProductOutlined />,
      onClick: navigateToHome,
    },
    ...SortedProjectValues.map((project) => ({
      label: project.label,
      key: project.routeKey,
      icon: project.icon,
      onClick: () => navigateToProject(project.routeKey),
      disabled: !project.isAvailable,
    })),
    {
      label: "Profil",
      key: "profile",
      icon: <UserOutlined />,
      onClick: navigateToProfile,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <Layout.Sider
      collapsedWidth="0"
      collapsed={siderCollapsed}
      className={styles.sider}
      theme="light"
    >
      <div className={styles.logoContainer}>
        <Logo height={28} />
      </div>
      <Menu
        theme="light"
        mode="inline"
        items={menuItems}
        selectedKeys={[currentRoute?.key]}
      />
    </Layout.Sider>
  );
};

Sider.propTypes = {};

export default memo(Sider);
