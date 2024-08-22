import { getByTestId, render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import Homepage from "./index";

describe.concurrent("pages/Homepage", () => {
  test("should render the banner and the page content", async ({ expect }) => {
    const { container } = render(<Homepage />);

    await waitFor(() => {
      const homepage = getByTestId<HTMLDivElement>(container, "homepage");
      const banner = getByTestId<HTMLDivElement>(homepage, "page-banner");
      const content = getByTestId<HTMLDivElement>(homepage, "homepage-content");
      expect(homepage).toBeVisible();
      expect(banner).toBeVisible();
      expect(banner).toHaveTextContent("Homepage");
      expect(content).toBeVisible();
      expect(content).toHaveTextContent("Homepage");
    });
  });
});
