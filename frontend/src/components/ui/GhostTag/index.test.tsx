import { getByTestId, render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { GhostTag } from "./index";

describe.concurrent("components/ui/GhostTag", () => {
  test("should render a tag with color for border/text and no color for background", async ({
    expect,
  }) => {
    const { container } = render(
      <GhostTag color="red" dataTestId="tag">
        Test
      </GhostTag>,
    );
    const tag = getByTestId<HTMLElement>(container, "tag");

    await waitFor(() => {
      expect(tag).toBeVisible();
      expect(tag).toHaveStyle({
        "border-color": "red",
        color: "rgb(255, 0, 0)",
        "background-color": "rgba(0, 0, 0, 0)",
      });
      expect(tag).toHaveTextContent("Test");
    });
  });
});
