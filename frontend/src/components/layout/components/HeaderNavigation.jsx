import { IconButton, Space } from "@/components/ui";
import { useCurrentRoute, useNav } from "@/hooks";
import { routeConfig } from "@/routes";
import { useAuthStore } from "@/stores";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Grid } from "antd";
import React, { memo } from "react";

const { useBreakpoint } = Grid;

const HeaderNavigation = () => {
  const logout = useAuthStore((state) => state.logout);
  const { xs } = useBreakpoint();
  const currentRoute = useCurrentRoute();
  const { navigateToProfile } = useNav();

  if (xs) return null;

  return (
    <Space size={0}>
      <IconButton
        tooltip="Profil"
        icon={<UserOutlined />}
        isText
        onClick={navigateToProfile}
        isActive={routeConfig.profile.path === currentRoute?.path}
      />
      <IconButton
        tooltip="Déconnexion"
        icon={<LogoutOutlined />}
        isText
        onClick={logout}
      />
    </Space>
  );
};

HeaderNavigation.propTypes = {};

export default memo(HeaderNavigation);
