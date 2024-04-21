import React, { memo } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Grid, Layout } from 'antd';
import classNames from 'classnames';
import { useShallow } from 'zustand/react/shallow';
import { IconButton, Logo } from '@/components/ui';
import { useLayoutStore } from '@/stores';
import styles from './Header.module.less';
import HeaderNavigation from './HeaderNavigation';

const { useBreakpoint } = Grid;

const Header = () => {
  const { lg } = useBreakpoint();
  const { siderCollapsed, toggleSider } = useLayoutStore(
    useShallow((state) => ({
      siderCollapsed: state.siderCollapsed,
      toggleSider: state.toggleSider,
    }))
  );

  return (
    <Layout.Header className={styles.header}>
      {!lg && (
        <IconButton
          className={classNames(styles.menuIcon, {
            [styles.siderVisible]: !siderCollapsed,
          })}
          icon={siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          isText
          onClick={toggleSider}
          tooltip="Menu"
        />
      )}
      {!lg && <Logo height={20} className={styles.logo} />}
      <div className={styles.icons}>
        <HeaderNavigation />
      </div>
    </Layout.Header>
  );
};

Header.propTypes = {};

export default memo(Header);
