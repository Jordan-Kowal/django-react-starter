import { getByTestId, render, waitFor } from "@testing-library/react";
import { beforeEach, describe, test } from "vitest";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/config/daisyui";
import { ThemeProvider, useTheme } from "./ThemeProvider";

const TestComponent: React.FC = () => {
  const { theme, setTheme } = useTheme();
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

describe.concurrent("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.removeItem(THEME_STORAGE_KEY);
  });

  test("renders children with default theme", ({ expect }) => {
    const { container } = render(
      <ThemeProvider>
        <div data-testid="child">Test Child</div>
      </ThemeProvider>,
    );

    const provider = getByTestId(container, "theme-provider");
    const child = getByTestId(container, "child");

    expect(provider).toBeInTheDocument();
    expect(provider).toHaveAttribute("data-theme", DEFAULT_THEME);
    expect(child).toBeInTheDocument();
  });

  test("should allow theme switching", async ({ expect }) => {
    const { container } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const button = getByTestId(container, "button");
    const provider = getByTestId(container, "theme-provider");

    expect(provider).toHaveAttribute("data-theme", DEFAULT_THEME);
    expect(button).toHaveTextContent(DEFAULT_THEME);

    button.click();

    await waitFor(() => {
      expect(button).toHaveTextContent("coffee");
    });

    expect(provider).toHaveAttribute("data-theme", "coffee");
  });

  test("persists theme in localStorage", ({ expect }) => {
    const { container } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const button = getByTestId(container, "button");

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();

    button.click();

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("coffee");
  });
});
