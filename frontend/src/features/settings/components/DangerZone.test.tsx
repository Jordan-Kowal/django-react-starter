import { performRequest } from "@/api/utils";
import {
  navigateMock,
  toastErrorMock,
  toastSuccessMock,
} from "@/tests/mocks/globals";
import { deleteAccountCrash } from "@/tests/mocks/handlers/settings";
import { server } from "@/tests/server";
import { render } from "@/tests/utils";
import { act, fireEvent, getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { DangerZone } from "./DangerZone";

describe("DangerZone", () => {
  test("should render the component correctly", async ({ expect }) => {
    const { container } = render(<DangerZone />);
    const dangerZone = getByTestId(container, "danger-zone");

    await waitFor(() => {
      expect(dangerZone).toBeVisible();
    });

    expect(dangerZone).toHaveTextContent("Delete your account");
  });

  test("should delete account on confirm button click", async ({ expect }) => {
    const { container } = render(<DangerZone />);
    const deleteButton = getByTestId(container, "delete-account-button");
    const modal = getByTestId(container, "modal");
    const confirmButton = getByTestId(container, "modal-confirm-button");

    await waitFor(() => {
      expect(deleteButton).toBeVisible();
    });

    act(() => {
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(modal).toHaveAttribute("open");
    });

    expect(confirmButton).toBeVisible();

    act(() => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith("/api/v1/self/account/", {
        method: "DELETE",
      });
    });

    expect(navigateMock).toHaveBeenCalledWith("/login");
    expect(toastSuccessMock).toHaveBeenCalledWith(
      "Your account has been deleted",
    );
  });

  test("should keep modal open and show toast on delete failure", async ({
    expect,
  }) => {
    server.use(deleteAccountCrash);
    const { container } = render(<DangerZone />);
    const deleteButton = getByTestId(container, "delete-account-button");
    const modal = getByTestId(container, "modal");
    const confirmButton = getByTestId(container, "modal-confirm-button");

    await waitFor(() => {
      expect(deleteButton).toBeVisible();
    });

    act(() => {
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(modal).toHaveAttribute("open");
    });

    expect(confirmButton).toBeVisible();

    act(() => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith("/api/v1/self/account/", {
        method: "DELETE",
      });
    });

    expect(modal).toHaveAttribute("open");
    expect(toastErrorMock).toHaveBeenCalledWith("Something went wrong");
  });
});
