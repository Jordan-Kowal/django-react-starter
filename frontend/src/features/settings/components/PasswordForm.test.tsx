import { performRequest } from "@/api/utils";
import { toastErrorMock, toastSuccessMock } from "@/tests/mocks/globals";
import {
  updatePasswordCrash,
  updatePasswordCurrentError,
  updatePasswordStrengthError,
} from "@/tests/mocks/handlers/settings";
import { server } from "@/tests/server";
import { render } from "@/tests/utils";
import { act, fireEvent, getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { PasswordForm } from "./PasswordForm";

const getElements = (
  container: HTMLElement,
): {
  form: HTMLFormElement;
  currentPasswordInput: HTMLInputElement;
  newPasswordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
} => ({
  form: getByTestId<HTMLFormElement>(container, "password-form"),
  currentPasswordInput: getByTestId<HTMLInputElement>(
    container,
    "current-password-input",
  ),
  newPasswordInput: getByTestId<HTMLInputElement>(
    container,
    "new-password-input",
  ),
  confirmPasswordInput: getByTestId<HTMLInputElement>(
    container,
    "confirm-password-input",
  ),
  submitButton: getByTestId<HTMLButtonElement>(container, "submit-button"),
});

const fillAndSubmitForm = ({
  currentPasswordInput,
  newPasswordInput,
  confirmPasswordInput,
  submitButton,
}: {
  currentPasswordInput: HTMLInputElement;
  newPasswordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
}) => {
  act(() => {
    fireEvent.input(currentPasswordInput, {
      target: { value: "currentPassword" },
    });
    fireEvent.input(newPasswordInput, { target: { value: "password" } });
    fireEvent.input(confirmPasswordInput, { target: { value: "password" } });
    fireEvent.submit(submitButton);
  });
};

describe("PasswordForm", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(<PasswordForm />);
    const { form, submitButton } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    expect(form).toHaveTextContent("New password");
    expect(submitButton).toBeDisabled();
  });

  test("should show success message on update", async ({ expect }) => {
    const { container } = render(<PasswordForm />);
    const {
      form,
      currentPasswordInput,
      newPasswordInput,
      confirmPasswordInput,
      submitButton,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      currentPasswordInput,
      newPasswordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastSuccessMock).toHaveBeenCalledWith("Password updated");
    });

    expect(performRequest).toHaveBeenCalledWith("/api/v1/self/password/", {
      data: {
        current_password: "currentPassword",
        new_password: "password",
      },
      method: "PUT",
    });
  });

  test("should show invalid current password on 400", async ({ expect }) => {
    server.use(updatePasswordCurrentError);
    const { container } = render(<PasswordForm />);
    const {
      form,
      currentPasswordInput,
      newPasswordInput,
      submitButton,
      confirmPasswordInput,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      currentPasswordInput,
      newPasswordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Invalid current password");
    });

    expect(performRequest).toHaveBeenCalledWith("/api/v1/self/password/", {
      data: {
        current_password: "currentPassword",
        new_password: "password",
      },
      method: "PUT",
    });
  });

  test("should show weak password on 400", async ({ expect }) => {
    server.use(updatePasswordStrengthError);
    const { container } = render(<PasswordForm />);
    const {
      form,
      currentPasswordInput,
      newPasswordInput,
      submitButton,
      confirmPasswordInput,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      currentPasswordInput,
      newPasswordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Password is too weak");
    });

    expect(performRequest).toHaveBeenCalledWith("/api/v1/self/password/", {
      data: {
        current_password: "currentPassword",
        new_password: "password",
      },
      method: "PUT",
    });
  });

  test("should show generic error on 500", async ({ expect }) => {
    server.use(updatePasswordCrash);
    const { container } = render(<PasswordForm />);
    const {
      form,
      currentPasswordInput,
      newPasswordInput,
      submitButton,
      confirmPasswordInput,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      currentPasswordInput,
      newPasswordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Something went wrong");
    });

    expect(performRequest).toHaveBeenCalledWith("/api/v1/self/password/", {
      data: {
        current_password: "currentPassword",
        new_password: "password",
      },
      method: "PUT",
    });
  });
});
