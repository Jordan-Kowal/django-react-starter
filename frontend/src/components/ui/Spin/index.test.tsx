import { getByTestId, render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { Spin } from "./index";

describe.concurrent("components/ui/Spin", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    wrapper: HTMLDivElement;
    antdSpin: HTMLDivElement;
    antdSpinContainer: HTMLDivElement;
  } => {
    const wrapper = getByTestId<HTMLDivElement>(container, "spin");
    return {
      wrapper,
      antdSpin: wrapper.querySelector(".ant-spin") as HTMLDivElement,
      antdSpinContainer: wrapper.querySelector(
        ".ant-spin-container",
      ) as HTMLDivElement,
    };
  };

  test("should render with default props", async ({ expect }) => {
    const { container } = render(<Spin dataTestId="spin">Content</Spin>);

    await waitFor(() => {
      const { wrapper, antdSpin, antdSpinContainer } = getElements(container);
      expect(wrapper).toBeVisible();
      expect(wrapper.className).toBe(
        "flex w-full h-full justify-center items-center",
      );
      expect(antdSpin).toBeVisible();
      expect(antdSpinContainer).toBeVisible();
      expect(antdSpinContainer).toHaveTextContent("Content");
    });
  });

  test("should be hidden if not spinning", async ({ expect }) => {
    const { container } = render(
      <Spin spinning={false} dataTestId="spin">
        Content
      </Spin>,
    );

    await waitFor(() => {
      const { wrapper, antdSpin, antdSpinContainer } = getElements(container);
      expect(wrapper).toBeVisible();
      expect(antdSpin).toBeNull();
      expect(antdSpinContainer).toHaveTextContent("Content");
    });
  });

  test("should show the custom tip if spinning", async ({ expect }) => {
    const { container } = render(
      <Spin spinning tip="Hello world" dataTestId="spin">
        Content
      </Spin>,
    );

    await waitFor(() => {
      const { wrapper, antdSpin, antdSpinContainer } = getElements(container);
      expect(wrapper).toBeVisible();
      expect(antdSpin).toBeVisible();
      expect(antdSpin).toHaveTextContent("Hello world");
      expect(antdSpinContainer).toBeVisible();
      expect(antdSpinContainer).toHaveTextContent("Content");
    });
  });

  test("should not bed centered vertically if specified", async ({
    expect,
  }) => {
    const { container } = render(
      <Spin verticallyCentered={false} dataTestId="spin">
        Content
      </Spin>,
    );

    await waitFor(() => {
      const { wrapper } = getElements(container);
      expect(wrapper).toBeVisible();
      expect(wrapper.className).toBe("flex w-full h-full justify-center");
    });
  });
});
