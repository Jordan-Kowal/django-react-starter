import React, { memo, useMemo } from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const GhostTag = ({ color, children }) => {
  const style = useMemo(
    () => ({ color, borderColor: color, backgroundColor: 'transparent' }),
    [color]
  );

  return (
    <Tag style={style} bordered>
      {children}
    </Tag>
  );
};

GhostTag.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default memo(GhostTag);
