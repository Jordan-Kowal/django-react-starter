import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/config/daisyui";
import { act, getByTestId, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, test } from "vitest";
import { DaisyUIProvider, useDaisyUITheme } from "./DaisyUIProvider";

const TestComponent: React.FC = () => {
  const { theme, setTheme } = useDaisyUITheme();
  return (
    <button
      data-testid="button"
      type="button"
      onClick={() => setTheme("coffee")}
    >
      {theme}
    </button>
  );
};

describe("DaisyUIProvider", () => {
  beforeEach(() => {
    localStorage.removeItem(THEME_STORAGE_KEY);
  });

  test("renders children with default theme", async ({ expect }) => {
    const { container } = render(
      <DaisyUIProvider>
        <div data-testid="child">Test Child</div>
      </DaisyUIProvider>,
    );

    const provider = getByTestId(container, "daisyui-provider");
    const child = getByTestId(container, "child");

    await waitFor(() => {
      expect(provider).toBeInTheDocument();
      expect(provider).toHaveAttribute("data-theme", DEFAULT_THEME);
      expect(child).toBeInTheDocument();
    });
  });

  test("should allow theme switching", async ({ expect }) => {
    const { container } = render(
      <DaisyUIProvider>
        <TestComponent />
      </DaisyUIProvider>,
    );

    const button = getByTestId(container, "button");
    const provider = getByTestId(container, "daisyui-provider");

    await waitFor(() => {
      expect(button).toHaveTextContent(DEFAULT_THEME);
      expect(provider).toHaveAttribute("data-theme", DEFAULT_THEME);
    });

    act(() => {
      button.click();
    });

    await waitFor(() => {
      expect(button).toHaveTextContent("coffee");
      expect(provider).toHaveAttribute("data-theme", "coffee");
    });
  });

  test("persists theme in localStorage", async ({ expect }) => {
    const TestComponent = () => {
      const { setTheme } = useDaisyUITheme();
      return (
        <button
          type="button"
          data-testid="button"
          onClick={() => setTheme("coffee")}
        >
          Switch Theme
        </button>
      );
    };

    const { container } = render(
      <DaisyUIProvider>
        <TestComponent />
      </DaisyUIProvider>,
    );

    const button = getByTestId(container, "button");

    await waitFor(() => {
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    });

    act(() => {
      button.click();
    });

    await waitFor(() => {
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("coffee");
    });
  });
});
