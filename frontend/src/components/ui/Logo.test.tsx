import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  test("should render the page", async ({ expect }) => {
    const { container } = render(<Logo />);

    await waitFor(() => {
      const logo = getByTestId<HTMLDivElement>(container, "logo");
      expect(logo).toBeVisible();
    });
  });
});
