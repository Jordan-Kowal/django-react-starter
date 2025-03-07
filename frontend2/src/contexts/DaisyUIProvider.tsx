import { DEFAULT_THEME, THEME_STORAGE_KEY, type Theme } from "@/config/daisyui";
import { type ReactNode, createContext, memo, useContext } from "react";
import { useLocalStorage } from "../hooks";

export type DaisyUIContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const DaisyUIContext = createContext<DaisyUIContextProps | undefined>(
  undefined,
);

export const useDaisyUITheme = (): DaisyUIContextProps => {
  const context = useContext(DaisyUIContext);
  if (!context) {
    throw new Error("useDaisyUITheme must be used within a DaisyUIProvider");
  }
  return context;
};

export type DaisyUIProviderProps = {
  children: ReactNode;
};

export const DaisyUIProvider: React.FC<DaisyUIProviderProps> = memo(
  ({ children }) => {
    const [theme, changeTheme] = useLocalStorage<Theme>(
      THEME_STORAGE_KEY,
      DEFAULT_THEME,
    );

    return (
      <DaisyUIContext.Provider value={{ theme: theme, setTheme: changeTheme }}>
        <div data-theme={theme} data-testid="daisyui-provider">
          {children}
        </div>
      </DaisyUIContext.Provider>
    );
  },
);
