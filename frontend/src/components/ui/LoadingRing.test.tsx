import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { LoadingRing } from "./LoadingRing";

describe("LoadingRing", () => {
  test("should render the page", async ({ expect }) => {
    const { container } = render(<LoadingRing />);

    await waitFor(() => {
      const loadingRing = getByTestId<HTMLDivElement>(
        container,
        "loading-ring",
      );
      expect(loadingRing).toBeVisible();
    });
  });
});
