import { createContext, memo, type ReactNode, useContext } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, type Theme } from "@/config/daisyui";
import { useLocalStorage } from "../hooks";

export type ThemeContextProps = {
  theme: Theme;
  isDarkMode: boolean;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = memo(
  ({ children }) => {
    const [theme, changeTheme] = useLocalStorage<Theme>(
      THEME_STORAGE_KEY,
      DEFAULT_THEME,
    );
    const isDarkMode = theme === "coffee";

    return (
      <ThemeContext.Provider
        value={{ theme: theme, setTheme: changeTheme, isDarkMode }}
      >
        <div
          data-theme={theme}
          data-testid="theme-provider"
          className="min-w-full prose prose-sm md:prose-base bg-base-100"
        >
          {children}
        </div>
      </ThemeContext.Provider>
    );
  },
);
