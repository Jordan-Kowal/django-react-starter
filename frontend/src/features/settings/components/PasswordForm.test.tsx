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
  passwordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
} => ({
  form: getByTestId<HTMLFormElement>(container, "password-form"),
  currentPasswordInput: getByTestId<HTMLInputElement>(
    container,
    "current-password-input",
  ),
  passwordInput: getByTestId<HTMLInputElement>(container, "password-input"),
  confirmPasswordInput: getByTestId<HTMLInputElement>(
    container,
    "confirm-password-input",
  ),
  submitButton: getByTestId<HTMLButtonElement>(container, "submit-button"),
});

const fillAndSubmitForm = ({
  currentPasswordInput,
  passwordInput,
  confirmPasswordInput,
  submitButton,
}: {
  currentPasswordInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
}) => {
  act(() => {
    fireEvent.input(currentPasswordInput, {
      target: { value: "currentPassword" },
    });
    fireEvent.input(passwordInput, { target: { value: "password" } });
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

    expect(form).toHaveTextContent("Password");
    expect(submitButton).toBeDisabled();
  });

  test("should show success message on update", async ({ expect }) => {
    const { container } = render(<PasswordForm />);
    const {
      form,
      currentPasswordInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      currentPasswordInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastSuccessMock).toHaveBeenCalledWith("Password updated");
    });

    expect(performRequest).toHaveBeenCalledWith(
      "/api/v1/self/update_password/",
      {
        data: {
          current_password: "currentPassword",
          password: "password",
          confirm_password: "password",
        },
        method: "POST",
      },
    );
  });

  test("should show invalid current password on 400", async ({ expect }) => {
    server.use(updatePasswordCurrentError);
    const { container } = render(<PasswordForm />);
    const {
      form,
      currentPasswordInput,
      passwordInput,
      submitButton,
      confirmPasswordInput,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      currentPasswordInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Invalid current password");
    });

    expect(performRequest).toHaveBeenCalledWith(
      "/api/v1/self/update_password/",
      {
        data: {
          current_password: "currentPassword",
          password: "password",
          confirm_password: "password",
        },
        method: "POST",
      },
    );
  });

  test("should show weak password on 400", async ({ expect }) => {
    server.use(updatePasswordStrengthError);
    const { container } = render(<PasswordForm />);
    const {
      form,
      currentPasswordInput,
      passwordInput,
      submitButton,
      confirmPasswordInput,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      currentPasswordInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Password is too weak");
    });

    expect(performRequest).toHaveBeenCalledWith(
      "/api/v1/self/update_password/",
      {
        data: {
          current_password: "currentPassword",
          password: "password",
          confirm_password: "password",
        },
        method: "POST",
      },
    );
  });

  test("should show generic error on 500", async ({ expect }) => {
    server.use(updatePasswordCrash);
    const { container } = render(<PasswordForm />);
    const {
      form,
      currentPasswordInput,
      passwordInput,
      submitButton,
      confirmPasswordInput,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      currentPasswordInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Something went wrong");
    });

    expect(performRequest).toHaveBeenCalledWith(
      "/api/v1/self/update_password/",
      {
        data: {
          current_password: "currentPassword",
          password: "password",
          confirm_password: "password",
        },
        method: "POST",
      },
    );
  });
});
