import { getByTestId, render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { Space } from "./index";

describe.concurrent("components/ui/Space", () => {
  test("should render with default props", async ({ expect }) => {
    const { container } = render(
      <Space dataTestId="space">
        <div>div 1</div>
        <div>div 2</div>
      </Space>,
    );
    const space = getByTestId<HTMLDivElement>(container, "space");

    await waitFor(() => {
      expect(space).toBeVisible();
      expect(space).toHaveClass(
        "ant-space-horizontal justify-start box-border",
      );
      expect(space).toHaveStyle({ columnGap: "8px", rowGap: "8px" });
      // Missing Props
      expect(space).not.toHaveClass("ant-space-vertical");
      expect(space).not.toHaveClass("w-full");
      expect(space).not.toHaveClass("justify-center");
      expect(space).not.toHaveClass("test");
      // Content
      expect(space).toHaveTextContent("div 1");
      expect(space).toHaveTextContent("div 2");
    });
  });

  test("should render with provided props", async ({ expect }) => {
    const { container } = render(
      <Space
        block
        centered
        className="test"
        vertical
        size={20}
        dataTestId="space"
      >
        <div>div 1</div>
        <div>div 2</div>
      </Space>,
    );
    const space = getByTestId<HTMLDivElement>(container, "space");

    await waitFor(() => {
      expect(space).toBeVisible();
      expect(space).not.toHaveClass("ant-space-horizontal");
      expect(space).toHaveClass(
        "box-border justify-start ant-space-vertical w-full justify-center test",
      );
      expect(space).toHaveStyle({ columnGap: "20px", rowGap: "20px" });
      // Content
      expect(space).toHaveTextContent("div 1");
      expect(space).toHaveTextContent("div 2");
    });
  });
});
