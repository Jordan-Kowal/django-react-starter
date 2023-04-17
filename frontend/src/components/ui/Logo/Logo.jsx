import React, { memo } from 'react';
import { Image } from 'antd';
import PropTypes from 'prop-types';
import { jkdevLogoUrl } from '@/assets';
import { useNav } from '@/hooks';
import styles from './Logo.module.less';

const Logo = ({ height }) => {
  const { navigateToHome } = useNav();
  return (
    <Image
      className={styles.logo}
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
};

export default memo(Logo);
