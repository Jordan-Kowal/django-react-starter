import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { render } from "@/tests/utils";
import { FadeIn } from "./FadeIn";

describe.concurrent("FadeIn", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(
      <FadeIn>
        <div data-testid="child">Test Content</div>
      </FadeIn>,
    );

    const fadeInContainer = getByTestId<HTMLDivElement>(container, "fade-in");
    const childElement = getByTestId<HTMLDivElement>(container, "child");

    await waitFor(() => {
      expect(fadeInContainer).toBeInTheDocument();
    });

    expect(fadeInContainer).toHaveClass("opacity-0");
    expect(fadeInContainer).not.toHaveClass("opacity-100");
    expect(childElement).toBeVisible();
    expect(childElement).toHaveTextContent("Test Content");

    await waitFor(() => {
      expect(fadeInContainer).toHaveClass("opacity-100");
    });

    expect(fadeInContainer).not.toHaveClass("opacity-0");
  });
});
