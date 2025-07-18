import type React from "react";
import { memo } from "react";
import { jkdevLogoUrl } from "@/assets";

export const Logo: React.FC = memo(() => {
  return <img data-testid="logo" src={jkdevLogoUrl} alt="JKDev Logo" />;
});
