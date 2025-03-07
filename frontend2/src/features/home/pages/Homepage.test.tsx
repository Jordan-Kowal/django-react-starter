import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import Homepage from "./Homepage";

describe("Homepage", () => {
  test("should render the banner and the page content", async ({ expect }) => {
    const { container } = render(<Homepage />);

    await waitFor(() => {
      const homepage = getByTestId<HTMLDivElement>(container, "homepage");
      expect(homepage).toBeVisible();
      expect(homepage).toBeVisible();
      expect(homepage).toHaveTextContent("Django React Starter");
    });
  });
});
