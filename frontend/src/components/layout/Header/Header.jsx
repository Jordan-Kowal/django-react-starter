import React, { memo } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Grid, Layout } from 'antd';
import classNames from 'classnames';
import { shallow } from 'zustand/shallow';
import { IconButton, Logo } from '@/components/ui';
import { useLayoutStore } from '@/stores';
import HeaderNavigation from '../HeaderNavigation';
import styles from './Header.module.less';

const { useBreakpoint } = Grid;

const Header = () => {
  const { lg } = useBreakpoint();
  const [siderCollapsed, toggleSider] = useLayoutStore(
    (state) => [state.siderCollapsed, state.toggleSider],
    shallow
  );

  return (
    <Layout.Header className={styles.header}>
      {!lg && (
        <IconButton
          className={classNames(styles.menuIcon, {
            [styles.siderVisible]: !siderCollapsed,
          })}
          icon={siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          isTextButton
          onClick={toggleSider}
          tooltip="Menu"
        />
      )}
      {!lg && <Logo height={28} />}
      <div className={styles.icons}>
        <HeaderNavigation />
      </div>
    </Layout.Header>
  );
};

Header.propTypes = {};

export default memo(Header);
