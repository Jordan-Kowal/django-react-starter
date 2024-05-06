/* eslint-disable consistent-return */
import React, { memo, useEffect, useState } from 'react';
import { Grid } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.less';

const { useBreakpoint } = Grid;

const MasonryLayout = ({
  children,
  className,
  gap,
  span,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}) => {
  const [cols, setCols] = useState(
    [span, xxl, xl, lg, md, sm, xs].find((v) => v)
  );
  const screens = useBreakpoint();

  useEffect(() => {
    if (span) return;
    if (screens.xxl && xxl) return setCols(xxl);
    if (screens.xl && xl) return setCols(xl);
    if (screens.lg && lg) return setCols(lg);
    if (screens.md && md) return setCols(md);
    if (screens.sm && sm) return setCols(sm);
    if (screens.xs && xs) return setCols(xs);
  }, [lg, md, screens, sm, span, xl, xs, xxl]);

  return (
    <ul
      className={classNames(styles.masonryLayout, className)}
      style={{
        columnCount: cols,
        columnGap: gap,
        padding: gap,
      }}
    >
      {children.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} className={styles.item} style={{ marginBottom: gap }}>
          {child}
        </li>
      ))}
    </ul>
  );
};

MasonryLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  gap: PropTypes.number,
  span: PropTypes.number,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xxl: PropTypes.number,
};

export default memo(MasonryLayout);
