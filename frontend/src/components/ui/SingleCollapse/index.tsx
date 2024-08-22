import { Collapse, type CollapseProps } from "antd";
import classNames from "classnames";
import type React from "react";
import { memo, useMemo } from "react";

type SingleCollapseProps = CollapseProps & {
  activeByDefault?: boolean;
  children: React.ReactNode;
  dataTestId?: string;
  label: string | React.ReactNode;
  noPadding?: boolean;
};

const KEY = "1";

export const SingleCollapse: React.FC<SingleCollapseProps> = memo(
  ({
    activeByDefault,
    children,
    className,
    dataTestId,
    label,
    noPadding,
    ...restProps
  }) => {
    const defaultActiveKey = useMemo(
      () => (activeByDefault ? [KEY] : []),
      [activeByDefault],
    );

    const items = useMemo(
      () => [
        {
          key: KEY,
          label,
          children,
        },
      ],
      [label, children],
    );

    return (
      <Collapse
        defaultActiveKey={defaultActiveKey}
        // Css in antd.less
        className={classNames(className, "custom-ant-collapse", {
          "no-padding": noPadding,
        })}
        data-testid={dataTestId}
        items={items}
        {...restProps}
      />
    );
  },
);
