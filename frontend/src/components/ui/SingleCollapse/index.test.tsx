import { getByTestId, render } from "@/tests/utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { SingleCollapse } from "./index";

describe.concurrent("components/ui/SingleCollapse", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    wrapper: HTMLDivElement;
    header: HTMLDivElement;
    content: HTMLDivElement;
  } => {
    const wrapper = getByTestId<HTMLDivElement>(container, "single-collapse");
    return {
      wrapper,
      header: wrapper.querySelector(".ant-collapse-header") as HTMLDivElement,
      content: wrapper.querySelector(".ant-collapse-content") as HTMLDivElement,
    };
  };

  test("should render the collapse correctly", async ({ expect }) => {
    const { container } = render(
      <SingleCollapse label="Title" dataTestId="single-collapse">
        Content
      </SingleCollapse>,
    );

    await waitFor(() => {
      const { wrapper, header, content } = getElements(container);
      expect(wrapper).toBeVisible();
      expect(header).toBeVisible();
      expect(header).toHaveTextContent("Title");
      expect(content).toBeNull();
    });

    act(() => {
      const { header } = getElements(container);
      fireEvent.click(header);
    });

    await waitFor(() => {
      const newContent = container.querySelector(
        ".ant-collapse-content",
      ) as HTMLDivElement;
      expect(newContent).toBeVisible();
      expect(newContent).toHaveTextContent("Content");
    });

    act(() => {
      const { header } = getElements(container);
      fireEvent.click(header);
    });

    await waitFor(() => {
      const newContent = container.querySelector(
        ".ant-collapse-content",
      ) as HTMLDivElement;
      expect(newContent).not.toBeNull();
      expect(newContent).not.toBeVisible();
    });
  });

  test("should render open the collapse automatically with activeByDefault", async ({
    expect,
  }) => {
    const { container } = render(
      <SingleCollapse
        label="Title"
        activeByDefault
        dataTestId="single-collapse"
      >
        Content
      </SingleCollapse>,
    );

    await waitFor(() => {
      const { header, wrapper, content } = getElements(container);
      expect(wrapper).toBeVisible();
      expect(header).toBeVisible();
      expect(content).toBeVisible();
      expect(content).toHaveTextContent("Content");
    });
  });

  test("should customize design with className and noPadding", async ({
    expect,
  }) => {
    const { container } = render(
      <SingleCollapse
        label="Title"
        className="custom-class"
        noPadding
        dataTestId="single-collapse"
      >
        Content
      </SingleCollapse>,
    );

    await waitFor(() => {
      const { wrapper } = getElements(container);
      expect(wrapper).toHaveClass("custom-class");
      expect(wrapper).toHaveClass("no-padding");
    });
  });
});
