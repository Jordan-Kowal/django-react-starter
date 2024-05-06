import React, { memo, useCallback } from 'react';
import { InputNumber as AntInputNumber } from 'antd';

const InputNumber = (props) => {
  const parser = useCallback((valueString) => {
    let newValue = valueString;
    if (newValue) {
      newValue = newValue.replace(',', '.');
    }
    return parseFloat(newValue);
  }, []);

  return <AntInputNumber {...props} parser={parser} />;
};

InputNumber.propTypes = {};

export default memo(InputNumber);
