import { getByTestId, render } from "@/tests/utils";
import { UserOutlined } from "@ant-design/icons";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { FormTabButton } from "./index";

describe.concurrent("components/features/User/FormTabButton", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    card: HTMLDivElement;
    icon: HTMLDivElement;
  } => ({
    card: getByTestId<HTMLDivElement>(container, "form-tab-button"),
    icon: container.querySelector(".anticon.anticon-user") as HTMLDivElement,
  });

  test("should correctly render the form tab button", async ({ expect }) => {
    const func = vi.fn();

    const { container, rerender } = render(
      <FormTabButton
        icon={<UserOutlined />}
        isActive={false}
        onClick={func}
        title="test"
        dataTestId="form-tab-button"
      />,
    );

    await waitFor(() => {
      const { card, icon } = getElements(container);
      expect(card).toBeVisible();
      expect(card).not.toHaveClass("!border-primary !text-primary");
      expect(card).toHaveTextContent("test");
      expect(icon).toBeVisible();
    });

    // Change the active state
    rerender(
      <FormTabButton
        icon={<UserOutlined />}
        isActive
        onClick={func}
        title="test"
        dataTestId="form-tab-button"
      />,
    );

    await waitFor(() => {
      const { card } = getElements(container);
      expect(card).toBeVisible();
      expect(card).toHaveClass("!border-primary !text-primary");
    });

    // Test clicking
    act(() => {
      const { card } = getElements(container);
      fireEvent.click(card);
    });

    expect(func).toHaveBeenCalledTimes(1);
  });
});
