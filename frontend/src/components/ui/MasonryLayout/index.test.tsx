import { mockUseBreakpoint } from "@/tests/mocks";
import { getByTestId, render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { MasonryLayout } from "./index";

const DATA_TEST_ID = "masonry-layout";

describe.concurrent("components/ui/MasonryLayout", () => {
  const getElements = (
    container: HTMLElement,
  ): { ul: HTMLUListElement; li: NodeListOf<HTMLLIElement> } => {
    const ul = getByTestId<HTMLUListElement>(container, DATA_TEST_ID);
    return {
      ul,
      li: ul.querySelectorAll("li"),
    };
  };

  test("should correctly render items in a masonry layout", async ({
    expect,
  }) => {
    const { container } = render(
      <MasonryLayout
        gap={12}
        span={4}
        className="custom-class"
        dataTestId={DATA_TEST_ID}
      >
        <div id="test1">Test1</div>
        <div id="test2">Test2</div>
      </MasonryLayout>,
    );
    const elements = getElements(container);
    const firstLi = elements.li[0];
    const div1 = container.querySelector("#test1");
    const div2 = container.querySelector("#test2");

    await waitFor(() => {
      expect(elements.ul).toBeVisible();
      expect(elements.ul).toHaveStyle({
        columnCount: "4",
        columnGap: "12px",
        padding: "12px",
      });
      expect(firstLi).toBeVisible();
      expect(firstLi).toHaveClass("block w-full break-inside-avoid");
      expect(firstLi).toHaveStyle({ marginBottom: "12px" });
      expect(div1).toHaveTextContent("Test1");
      expect(div2).toHaveTextContent("Test2");
    });
  });

  test("should automatically change the number of columns on resize", async ({
    expect,
  }) => {
    const component = (
      <MasonryLayout
        gap={12}
        xs={1}
        sm={2}
        md={3}
        lg={4}
        xl={5}
        xxl={6}
        dataTestId={DATA_TEST_ID}
      >
        <div id="xs">xs</div>
        <div id="sm">sm</div>
        <div id="md">md</div>
        <div id="lg">lg</div>
        <div id="xl">xl</div>
        <div id="xxl">xxl</div>
      </MasonryLayout>
    );

    for (const [name, value] of [
      ["xs", 1],
      ["sm", 2],
      ["md", 3],
      ["lg", 4],
      ["xl", 5],
      ["xxl", 6],
    ]) {
      mockUseBreakpoint.mockImplementationOnce(() => ({ [name]: true }));
      const { container } = render(component);

      await waitFor(() => {
        const { ul } = getElements(container);
        expect(ul).toHaveStyle({ "column-count": value });
      });
    }
  });
});
