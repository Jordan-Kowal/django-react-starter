import type React from "react";
import { memo } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { useTheme } from "@/contexts";

export const Toaster: React.FC = memo(() => {
  const { isDarkMode } = useTheme();

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
