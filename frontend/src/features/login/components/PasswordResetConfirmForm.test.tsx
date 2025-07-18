import { act, fireEvent, getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { performRequest } from "@/api/utils";
import {
  navigateMock,
  toastErrorMock,
  toastSuccessMock,
} from "@/tests/mocks/globals";
import {
  passwordResetConfirmCrash,
  passwordResetConfirmGenericError,
  passwordResetConfirmPasswordError,
} from "@/tests/mocks/handlers/login";
import { server } from "@/tests/server";
import { render } from "@/tests/utils";
import { PasswordResetConfirmForm } from "./PasswordResetConfirmForm";

const getElements = (
  container: HTMLElement,
): {
  form: HTMLFormElement;
  passwordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;
  goBackButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
} => ({
  form: getByTestId<HTMLFormElement>(container, "password-reset-confirm-form"),
  passwordInput: getByTestId<HTMLInputElement>(container, "password-input"),
  confirmPasswordInput: getByTestId<HTMLInputElement>(
    container,
    "confirm-password-input",
  ),
  goBackButton: getByTestId<HTMLButtonElement>(container, "go-back-button"),
  submitButton: getByTestId<HTMLButtonElement>(container, "submit-button"),
});

const fillAndSubmitForm = ({
  passwordInput,
  confirmPasswordInput,
  submitButton,
}: {
  passwordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
}) => {
  act(() => {
    fireEvent.input(passwordInput, { target: { value: "testPassword" } });
    fireEvent.input(confirmPasswordInput, {
      target: { value: "testPassword" },
    });
    fireEvent.submit(submitButton);
  });
};

describe("PasswordResetConfirmForm", () => {
  test("should render the component", ({ expect }) => {
    const { container } = render(<PasswordResetConfirmForm />);
    const { form, submitButton } = getElements(container);
    expect(form).toBeVisible();
    expect(form).toHaveTextContent("Save");
    expect(submitButton).toBeDisabled();
  });

  test("should redirect on successful reset", async ({ expect }) => {
    const { container } = render(<PasswordResetConfirmForm />);
    const { form, passwordInput, confirmPasswordInput, submitButton } =
      getElements(container);

    expect(form).toBeVisible();

    fillAndSubmitForm({ passwordInput, confirmPasswordInput, submitButton });

    await waitFor(() => {
      expect(toastSuccessMock).toHaveBeenCalledWith(
        "Password updated. You can now log in.",
      );
    });

    expect(navigateMock).toHaveBeenCalledWith("/login");
    expect(performRequest).toHaveBeenCalledWith(
      "/api/v1/auth/password_reset_confirm/",
      {
        data: {
          password: "testPassword",
          uid: undefined,
          token: undefined,
        },
        method: "POST",
      },
    );
  });

  test("should show an error message on 400 password error", async ({
    expect,
  }) => {
    server.use(passwordResetConfirmPasswordError);
    const { container } = render(<PasswordResetConfirmForm />);
    const { form, passwordInput, confirmPasswordInput, submitButton } =
      getElements(container);

    expect(form).toBeVisible();

    fillAndSubmitForm({ passwordInput, confirmPasswordInput, submitButton });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith(
        "/api/v1/auth/password_reset_confirm/",
        {
          data: {
            password: "testPassword",
            uid: undefined,
            token: undefined,
          },
          method: "POST",
        },
      );
    });

    expect(toastErrorMock).toHaveBeenCalledWith("Password is too weak");
  });

  test("should show an error message on 400 generic error", async ({
    expect,
  }) => {
    server.use(passwordResetConfirmGenericError);
    const { container } = render(<PasswordResetConfirmForm />);
    const { form, passwordInput, confirmPasswordInput, submitButton } =
      getElements(container);

    expect(form).toBeVisible();

    fillAndSubmitForm({ passwordInput, confirmPasswordInput, submitButton });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith(
        "/api/v1/auth/password_reset_confirm/",
        {
          data: {
            password: "testPassword",
            uid: undefined,
            token: undefined,
          },
          method: "POST",
        },
      );
    });

    expect(toastErrorMock).toHaveBeenCalledWith("Invalid token");
  });

  test("should show an error message on crash", async ({ expect }) => {
    server.use(passwordResetConfirmCrash);
    const { container } = render(<PasswordResetConfirmForm />);
    const { form, passwordInput, confirmPasswordInput, submitButton } =
      getElements(container);

    expect(form).toBeVisible();

    fillAndSubmitForm({ passwordInput, confirmPasswordInput, submitButton });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith(
        "/api/v1/auth/password_reset_confirm/",
        {
          data: {
            password: "testPassword",
            uid: undefined,
            token: undefined,
          },
          method: "POST",
        },
      );
    });

    expect(toastErrorMock).toHaveBeenCalledWith("Something went wrong");
  });

  test("should redirect to login page on go back button click", ({
    expect,
  }) => {
    const { container } = render(<PasswordResetConfirmForm />);
    const { goBackButton } = getElements(container);

    expect(goBackButton).toBeVisible();
    expect(goBackButton).toHaveAttribute("href", "/login");
  });
});
