import React, { memo } from 'react';
import { Space as AntdSpace } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Space.module.less';

/** Extend the <Space/> component from Ant Design with the 'block' property */
const Space = ({
  align,
  block,
  centered,
  className,
  size = 8,
  split,
  vertical,
  wrap,
  ...restProps
}) => (
  <AntdSpace
    align={align}
    className={classNames(className, styles.space, {
      [styles.fullWidth]: block,
      [styles.centered]: centered,
    })}
    direction={vertical ? 'vertical' : 'horizontal'}
    size={size}
    split={split}
    wrap={wrap}
    {...restProps}
  />
);

Space.propTypes = {
  align: PropTypes.oneOf(['start', 'end', 'center', 'baseline']),
  block: PropTypes.bool,
  centered: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  split: PropTypes.node,
  vertical: PropTypes.bool,
  wrap: PropTypes.bool,
};

export default memo(Space);
