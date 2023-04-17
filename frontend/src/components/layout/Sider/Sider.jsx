import React, { memo } from 'react';
import {
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Logo } from '@/components/ui';
import { useCurrentRoute, useNav } from '@/hooks';
import { useAuthStore, useLayoutStore } from '@/stores';
import styles from './Sider.module.less';

const Sider = () => {
  const logout = useAuthStore((state) => state.logout);
  const siderCollapsed = useLayoutStore((state) => state.siderCollapsed);

  const { navigateToHome, navigateToProfile } = useNav();
  const currentRoute = useCurrentRoute();

  const menuItems = [
    {
      label: 'Accueil',
      key: 'home',
      icon: <HomeOutlined />,
      onClick: navigateToHome,
    },
    {
      label: 'Profil',
      key: 'profile',
      icon: <UserOutlined />,
      onClick: navigateToProfile,
    },
    {
      label: 'Logout',
      key: 'logout',
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
