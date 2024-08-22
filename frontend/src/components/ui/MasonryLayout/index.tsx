import { Grid } from "antd";
import type React from "react";
import { memo, useEffect, useMemo, useState } from "react";

const { useBreakpoint } = Grid;

type MasonryLayoutProps = {
  children: React.ReactNode[];
  className?: string;
  dataTestId?: string;
  gap: number;
  span?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};

export const MasonryLayout: React.FC<MasonryLayoutProps> = memo(
  ({ children, className, dataTestId, gap, span, xs, sm, md, lg, xl, xxl }) => {
    const [cols, setCols] = useState(
      [span, xxl, xl, lg, md, sm, xs].find((v) => v),
    );
    const screens = useBreakpoint();

    const ulStyle = useMemo(
      () => ({
        columnCount: cols,
        columnGap: gap,
        padding: gap,
      }),
      [cols, gap],
    );

    const liStyle = useMemo(
      () => ({
        marginBottom: gap,
      }),
      [gap],
    );

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
      <ul className={className} style={ulStyle} data-testid={dataTestId}>
        {children.map((child, index) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: no choice
            key={index}
            className="block w-full break-inside-avoid"
            style={liStyle}
          >
            {child}
          </li>
        ))}
      </ul>
    );
  },
);
