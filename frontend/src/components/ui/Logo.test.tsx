import { render } from "@/tests/utils";
import { getByTestId } from "@testing-library/react";
import { describe, test } from "vitest";
import { Logo } from "./Logo";

describe.concurrent("Logo", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(<Logo />);
    const logo = getByTestId<HTMLImageElement>(container, "logo");
    expect(logo).toBeVisible();
  });
});
