import {
  InputNumber as AntInputNumber,
  type InputNumberProps as AntdInputNumberProps,
} from "antd";
import type React from "react";
import { memo, useCallback } from "react";

type InputNumberProps = Omit<AntdInputNumberProps<number>, "parser"> & {
  dataTestId?: string;
};

export const InputNumber: React.FC<InputNumberProps> = memo(
  ({ dataTestId, ...restProps }) => {
    const parser = useCallback((valueString: string | undefined) => {
      if (!valueString) return 0;
      const newValue = valueString.replace(",", ".");
      return Number.parseFloat(newValue);
    }, []);

    return (
      <AntInputNumber {...restProps} parser={parser} data-testid={dataTestId} />
    );
  },
);
