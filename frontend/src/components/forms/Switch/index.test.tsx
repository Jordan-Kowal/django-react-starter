import { getByTestId, render } from "@/tests/utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { Switch } from "./index";

describe.concurrent("components/forms/Switch", () => {
  test("should render a Switch with some text", async ({ expect }) => {
    const { container } = render(<Switch text="Test" dataTestId="space" />);
    const space = getByTestId<HTMLDivElement>(container, "space");
    const switchElement = space.querySelector(
      "button[role='switch']",
    ) as HTMLButtonElement;

    await waitFor(() => {
      expect(space).toBeVisible();
      expect(space).toHaveTextContent("Test");
      expect(space).toHaveClass("w-full");
      expect(switchElement).toBeVisible();
      expect(switchElement).toHaveAttribute("aria-checked", "false");
    });

    act(() => {
      fireEvent.click(switchElement);
    });

    await waitFor(() => {
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });
  });
});
