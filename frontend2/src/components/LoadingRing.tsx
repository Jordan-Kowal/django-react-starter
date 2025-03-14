import type React from "react";
import { memo } from "react";

export const LoadingRing: React.FC = memo(() => {
  return (
    <span
      data-testid="loading-ring"
      className="loading loading-ring loading-xl"
    />
  );
});
