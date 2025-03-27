import type React from "react";
import { memo, useEffect, useState } from "react";

export type FadeInProps = {
  children: React.ReactNode;
};

export const FadeIn: React.FC<FadeInProps> = memo(({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const opacityClass = isVisible ? "opacity-100" : "opacity-0";

  return (
    <div
      data-testid="fade-in"
      className={`transition-opacity duration-1500 ${opacityClass} flex`}
    >
      {children}
    </div>
  );
});
