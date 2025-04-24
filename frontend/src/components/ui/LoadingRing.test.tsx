import { render } from "@/tests/utils";
import { getByTestId } from "@testing-library/react";
import { describe, test } from "vitest";
import { LoadingRing } from "./LoadingRing";

describe.concurrent("LoadingRing", () => {
  test("should render the component", ({ expect }) => {
    const { container } = render(<LoadingRing />);
    const loadingRing = getByTestId<HTMLDivElement>(container, "loading-ring");

    expect(loadingRing).toBeVisible();
  });
});
