import { render } from "@/tests/utils";
import {
  act,
  fireEvent,
  getByTestId,
  queryByTestId,
  waitFor,
} from "@testing-library/react";
import { useRef } from "react";
import { describe, test, vi } from "vitest";
import { Modal } from "./Modal";

const onConfirmMock = vi.fn();

const TestModalWrapper = ({ onConfirm = onConfirmMock, closable = false }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <button
        type="button"
        onClick={() => modalRef?.current?.showModal()}
        data-testid="modal-trigger"
      >
        Open Modal
      </button>
      <Modal ref={modalRef} onConfirm={onConfirm} closable={closable}>
        <h3>Test Modal Title</h3>
        <p>Test Modal Content</p>
      </Modal>
    </div>
  );
};

describe.concurrent("Modal", () => {
  test("should render the component with children", async ({ expect }) => {
    const { container } = render(<TestModalWrapper />);
    const openButton = getByTestId(container, "modal-trigger");
    const modal = getByTestId(container, "modal");

    await waitFor(() => {
      expect(openButton).toBeVisible();
    });

    act(() => {
      fireEvent.click(openButton);
    });

    await waitFor(() => {
      expect(modal).toHaveAttribute("open");
    });

    expect(modal).toHaveTextContent("Test Modal Title");
    expect(modal).toHaveTextContent("Test Modal Content");
  });

  test("should show close button when closable is true", async ({ expect }) => {
    const { container } = render(<TestModalWrapper closable={true} />);
    const openButton = getByTestId(container, "modal-trigger");
    const modal = getByTestId(container, "modal");
    const closeButton = getByTestId(container, "modal-close-button");

    await waitFor(() => {
      expect(openButton).toBeVisible();
    });

    act(() => {
      fireEvent.click(openButton);
    });

    await waitFor(() => {
      expect(modal).toHaveAttribute("open");
    });

    expect(closeButton).toBeVisible();

    act(() => {
      fireEvent.click(closeButton as Element);
    });

    await waitFor(() => {
      expect(modal).not.toHaveAttribute("open");
    });
  });

  test("should not show close button when closable is false", async ({
    expect,
  }) => {
    const { container } = render(<TestModalWrapper />);
    const openButton = getByTestId(container, "modal-trigger");
    const modal = getByTestId(container, "modal");
    const closeButton = queryByTestId(container, "modal-close-button");

    await waitFor(() => {
      expect(openButton).toBeVisible();
    });

    act(() => {
      fireEvent.click(openButton);
    });

    await waitFor(() => {
      expect(modal).toHaveAttribute("open");
    });

    expect(closeButton).toBeNull();
  });

  test("should call onConfirm and close modal when confirm button is clicked", async ({
    expect,
  }) => {
    const { container } = render(
      <TestModalWrapper onConfirm={onConfirmMock} />,
    );
    const openButton = getByTestId(container, "modal-trigger");
    const modal = getByTestId(container, "modal");
    const confirmButton = getByTestId(container, "modal-confirm-button");

    await waitFor(() => {
      expect(openButton).toBeVisible();
    });

    act(() => {
      fireEvent.click(openButton);
    });

    await waitFor(() => {
      expect(modal).toHaveAttribute("open");
    });

    expect(confirmButton).toBeVisible();

    act(() => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(modal).not.toHaveAttribute("open");
    });

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  test("should not close modal when onConfirm throws an error", async ({
    expect,
  }) => {
    const crashMock = vi.fn(() => {
      throw new Error("Test error");
    });
    const { container } = render(<TestModalWrapper onConfirm={crashMock} />);
    const openButton = getByTestId(container, "modal-trigger");
    const modal = getByTestId(container, "modal");
    const confirmButton = getByTestId(container, "modal-confirm-button");

    await waitFor(() => {
      expect(openButton).toBeVisible();
    });

    act(() => {
      fireEvent.click(openButton);
    });

    await waitFor(() => {
      expect(modal).toHaveAttribute("open");
    });

    expect(confirmButton).toBeVisible();

    act(() => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(crashMock).toHaveBeenCalled();
    });

    expect(modal).toHaveAttribute("open");
  });

  test("should close modal when cancel button is clicked", async ({
    expect,
  }) => {
    const { container } = render(<TestModalWrapper />);
    const openButton = getByTestId(container, "modal-trigger");
    const modal = getByTestId(container, "modal");
    const cancelButton = getByTestId(container, "modal-cancel-button");

    await waitFor(() => {
      expect(openButton).toBeVisible();
    });

    act(() => {
      fireEvent.click(openButton);
    });

    await waitFor(() => {
      expect(modal).toHaveAttribute("open");
    });

    expect(cancelButton).toBeVisible();

    act(() => {
      fireEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(modal).not.toHaveAttribute("open");
    });

    expect(onConfirmMock).not.toHaveBeenCalled();
  });
});
