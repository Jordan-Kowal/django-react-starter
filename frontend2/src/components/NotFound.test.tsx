import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { NotFound } from "./NotFound";

describe("NotFound", () => {
  test("should render the page", async ({ expect }) => {
    const { container } = render(<NotFound />);

    await waitFor(() => {
      const notFound = getByTestId<HTMLDivElement>(container, "not-found");
      expect(notFound).toBeVisible();
      expect(notFound).toHaveTextContent("Page not found");
    });
  });
});
