import React, { memo, useEffect } from 'react';
import { Grid, Layout } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { shallow } from 'zustand/shallow';
import { useLayoutStore } from '@/stores';
import styles from './AppLayout.module.less';
import Footer from './Footer';
import Header from './Header';
import Sider from './Sider';

const { useBreakpoint } = Grid;

const AppLayout = ({ children }) => {
  const { lg } = useBreakpoint();
  const [showLayout, setSiderCollapsed] = useLayoutStore(
    (state) => [state.showLayout, state.setSiderCollapsed],
    shallow
  );

  useEffect(() => {
    if (showLayout) {
      setSiderCollapsed(!lg);
    }
  }, [lg, setSiderCollapsed, showLayout]);

  if (!showLayout) return <div className={styles.content}>{children}</div>;

  return (
    <Layout className={styles.appLayout}>
      <Sider />
      <Layout className={classNames({ [styles.withSider]: lg })}>
        <Header />
        <div className={styles.content}>{children}</div>
        <Footer />
      </Layout>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(AppLayout);
