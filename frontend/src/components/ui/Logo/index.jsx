import React, { memo } from 'react';
import { Image } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { jkdevLogoUrl } from '@/assets';
import { useNav } from '@/hooks';
import styles from './styles.module.less';

const Logo = ({ className, height }) => {
  const { navigateToHome } = useNav();
  return (
    <Image
      className={classNames(styles.logo, className)}
      preview={false}
      src={jkdevLogoUrl}
      alt="Logo"
      height={height}
      onClick={navigateToHome}
    />
  );
};

Logo.propTypes = {
  height: PropTypes.number,
  className: PropTypes.string,
};

export default memo(Logo);
