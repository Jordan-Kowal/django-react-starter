import { theme } from "@/styles";
import { Typography } from "antd";
import type React from "react";
import { memo } from "react";

const { Title } = Typography;

const { layoutPadding } = theme.layout;

const style = {
  width: `calc(100% + ${layoutPadding} + ${layoutPadding})`,
};

type PageBannerProps = {
  icon?: React.ReactNode;
  label: string;
};

export const PageBanner: React.FC<PageBannerProps> = memo(({ icon, label }) => {
  return (
    <div
      className="relative bg-primary -left-default py-0 px-default h-header"
      style={style}
      data-testid="page-banner"
    >
      <div>
        <Title level={2} className="text-bg">
          {icon && icon} {label}
        </Title>
      </div>
    </div>
  );
});
