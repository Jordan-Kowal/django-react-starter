import { InputNumber as AntInputNumber } from "antd";
import React, { memo, useCallback } from "react";

const InputNumber = (props) => {
  const parser = useCallback((valueString) => {
    let newValue = valueString;
    if (newValue) {
      newValue = newValue.replace(",", ".");
    }
    return Number.parseFloat(newValue);
  }, []);

  return <AntInputNumber {...props} parser={parser} />;
};

InputNumber.propTypes = {};

export default memo(InputNumber);
