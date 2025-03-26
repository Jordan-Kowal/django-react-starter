import { render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { Toaster } from "./Toaster";

describe("Toaster", () => {
  test("should render the component", async ({ expect }) => {
    render(<Toaster />);

    const { container } = render(<Toaster />);
    const item = container.querySelector(".Toastify");

    await waitFor(() => {
      expect(item).toBeVisible();
    });
  });
});
