import { useLogout } from "@/api/auth";
import { IconButton, Space } from "@/components/ui";
import { useCurrentRoute, useGoTo } from "@/hooks";
import { routeConfig } from "@/routes";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Grid } from "antd";
import type React from "react";
import { memo } from "react";

const { useBreakpoint } = Grid;

export const HeaderNavigation: React.FC = memo(() => {
  const logout = useLogout();
  const { xs } = useBreakpoint();
  const currentRoute = useCurrentRoute();
  const goToProfile = useGoTo(routeConfig.profile);

  if (xs) return null;

  return (
    <Space
      size={0}
      className={"relative -top-0.5"}
      dataTestId="header-navigation"
    >
      <IconButton
        tooltip="Profil"
        icon={<UserOutlined />}
        onClick={goToProfile}
        isActive={routeConfig.profile.path === currentRoute?.path}
      />
      <IconButton
        tooltip="Déconnexion"
        icon={<LogoutOutlined />}
        onClick={logout.mutate}
      />
    </Space>
  );
});
