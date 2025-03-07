import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { Logo } from "./Logo";

const getElements = (
  container: HTMLElement,
): {
  logo: HTMLDivElement;
  wheel: HTMLImageElement;
  lightbulb: HTMLImageElement;
} => {
  const logo = getByTestId<HTMLDivElement>(container, "logo");
  const [wheel, lightbulb] = logo.getElementsByTagName("img");
  return { logo, wheel, lightbulb };
};

describe("Logo", () => {
  test("should render logo component with default props", async ({
    expect,
  }) => {
    const { container } = render(<Logo />);
    const { logo, wheel, lightbulb } = getElements(container);

    await waitFor(() => {
      expect(logo).toBeVisible();
      expect(wheel).toBeVisible();
      expect(lightbulb).toBeVisible();
      expect(wheel.alt).toBe("logo-wheel");
      expect(lightbulb.alt).toBe("lightbulb");
      expect(wheel?.className).toContain("animate-[spin_15s_linear_infinite]");
    });
  });

  test("should apply correct sizes based on size prop", async ({ expect }) => {
    const size = 200;
    const { container } = render(<Logo size={size} />);
    const { logo, wheel, lightbulb } = getElements(container);
    await waitFor(() => {
      expect(logo.style.width).toBe(`${size}px`);
      expect(logo.style.height).toBe(`${size}px`);
      expect(wheel.width).toBe(size);
      expect(lightbulb.width).toBe(size * 0.4);
    });
  });

  test("should handle animation class correctly", async ({ expect }) => {
    const { container } = render(<Logo animated={false} />);
    const { wheel } = getElements(container);

    await waitFor(() => {
      expect(wheel?.className).not.toContain(
        "animate-[spin_15s_linear_infinite]",
      );
    });
  });
});
