import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(<Logo />);
    const logo = getByTestId<HTMLImageElement>(container, "logo");

    await waitFor(() => {
      expect(logo).toBeVisible();
    });
  });
});
