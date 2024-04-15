import React, { memo, useEffect } from 'react';
import { Grid, Layout } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useShallow } from 'zustand/react/shallow';
import { useLayoutStore } from '@/stores';
import styles from './AppLayout.module.less';
import { Footer, Header, Sider } from './components';

const { useBreakpoint } = Grid;

const AppLayout = ({ children }) => {
  const { lg } = useBreakpoint();
  const { showLayout, setSiderCollapsed } = useLayoutStore(
    useShallow((state) => ({
      showLayout: state.showLayout,
      setSiderCollapsed: state.setSiderCollapsed,
    }))
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
