import { describe, test } from "vitest";
import { render } from "@/tests/utils";
import { Toaster } from "./Toaster";

describe.concurrent("Toaster", () => {
  test("should render the component", ({ expect }) => {
    render(<Toaster />);

    const { container } = render(<Toaster />);
    const item = container.querySelector(".Toastify");
    expect(item).toBeVisible();
  });
});
