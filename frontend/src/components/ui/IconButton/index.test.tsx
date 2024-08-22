import { getByTestId, render } from "@/tests/utils";
import { UserOutlined } from "@ant-design/icons";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { IconButton } from "./index";

describe.concurrent("components/ui/IconButton", () => {
  const getElements = (container: HTMLElement) => ({
    button: getByTestId<HTMLButtonElement>(container, "icon-button"),
    icon: container.querySelector(".anticon") as HTMLElement,
  });

  test("should render the icon button", async ({ expect }) => {
    const { container } = render(
      <IconButton
        icon={<UserOutlined />}
        tooltip="tooltip"
        dataTestId="icon-button"
      />,
    );

    await waitFor(() => {
      const { button, icon } = getElements(container);
      expect(button).toBeVisible();
      expect(icon).toBeVisible();
    });
  });

  test("should trigger the provided onClick function", async ({ expect }) => {
    const onClick = vi.fn();
    const { container } = render(
      <IconButton
        icon={<UserOutlined />}
        tooltip="tooltip"
        onClick={onClick}
        dataTestId="icon-button"
      />,
    );

    await waitFor(() => {
      const { button, icon } = getElements(container);
      expect(button).toBeVisible();
      expect(icon).toBeVisible();
    });

    act(() => {
      const { button } = getElements(container);
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  test("should change color if active", async ({ expect }) => {
    const { container } = render(
      <IconButton
        icon={<UserOutlined />}
        tooltip="tooltip"
        isActive
        dataTestId="icon-button"
      />,
    );

    await waitFor(() => {
      const { button, icon } = getElements(container);
      expect(button).toBeVisible();
      expect(icon).toBeVisible();
      expect(button).toHaveClass("text-primary");
    });
  });
});
