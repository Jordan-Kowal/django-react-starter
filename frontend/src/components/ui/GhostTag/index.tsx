import { Tag, type TagProps } from "antd";
import type React from "react";
import { memo, useMemo } from "react";

type GhostTagProps = TagProps & {
  color?: string;
  dataTestId?: string;
};

export const GhostTag: React.FC<GhostTagProps> = memo(
  ({ color, children, dataTestId }) => {
    const style = useMemo(
      () => ({ color, borderColor: color, backgroundColor: "transparent" }),
      [color],
    );

    return (
      <Tag style={style} bordered data-testid={dataTestId}>
        {children}
      </Tag>
    );
  },
);
