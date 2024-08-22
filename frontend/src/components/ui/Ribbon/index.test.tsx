import { render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { Ribbon } from "./index";

describe.concurrent("components/ui/Ribbon", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    ribbon: HTMLDivElement;
    div: HTMLDivElement;
  } => ({
    ribbon: container.querySelector(".ant-ribbon") as HTMLDivElement,
    div: container.querySelector("#test") as HTMLDivElement,
  });

  test("should only render the children if show=false", async ({ expect }) => {
    const { container } = render(
      <Ribbon show={false} text="ok">
        <div id="test">Test</div>
      </Ribbon>,
    );

    await waitFor(() => {
      const { ribbon, div } = getElements(container);
      expect(ribbon).toBeNull();
      expect(div).toHaveTextContent("Test");
    });
  });

  test("should only render the children if no text", async ({ expect }) => {
    const { container } = render(
      <Ribbon show text="">
        <div id="test">Test</div>
      </Ribbon>,
    );

    await waitFor(() => {
      const { ribbon, div } = getElements(container);
      expect(ribbon).toBeNull();
      expect(div).toHaveTextContent("Test");
    });
  });

  test("should render with right text/color/placement", async ({ expect }) => {
    const { container } = render(
      <Ribbon show text="ok" color="cyan" placement="end">
        <div id="test">Test</div>
      </Ribbon>,
    );

    await waitFor(() => {
      const { ribbon, div } = getElements(container);
      expect(ribbon).toBeVisible();
      expect(ribbon).toHaveClass(
        "ant-ribbon-placement-end ant-ribbon-color-cyan",
      );
      expect(ribbon).toHaveTextContent("ok");
      expect(div).toHaveTextContent("Test");
    });
  });
});
