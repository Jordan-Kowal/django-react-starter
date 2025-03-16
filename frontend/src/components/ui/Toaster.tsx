import { useDaisyUITheme } from "@/contexts";
import type React from "react";
import { memo } from "react";
import { Bounce, ToastContainer } from "react-toastify";

export const Toaster: React.FC = memo(() => {
  const { isDarkMode } = useDaisyUITheme();

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDarkMode ? "dark" : "light"}
      transition={Bounce}
    />
  );
});
