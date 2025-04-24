import { performRequest } from "@/api/utils";
import {
  navigateMock,
  toastErrorMock,
  toastSuccessMock,
} from "@/tests/mocks/globals";
import { passwordResetError } from "@/tests/mocks/handlers/login";
import { server } from "@/tests/server";
import { render } from "@/tests/utils";
import { act, fireEvent, getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { PasswordResetForm } from "./PasswordResetForm";

const getElements = (
  container: HTMLElement,
): {
  form: HTMLFormElement;
  emailInput: HTMLInputElement;
  goBackButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
} => ({
  form: getByTestId<HTMLFormElement>(container, "password-reset-form"),
  emailInput: getByTestId<HTMLInputElement>(container, "email-input"),
  goBackButton: getByTestId<HTMLButtonElement>(container, "go-back-button"),
  submitButton: getByTestId<HTMLButtonElement>(container, "submit-button"),
});

const fillAndSubmitForm = ({
  emailInput,
  submitButton,
}: {
  emailInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
}) => {
  act(() => {
    fireEvent.input(emailInput, { target: { value: "test@email.com" } });
    fireEvent.submit(submitButton);
  });
};

describe("PasswordResetForm", () => {
  test("should render the component", ({ expect }) => {
    const { container } = render(<PasswordResetForm />);
    const { form, submitButton } = getElements(container);

    expect(form).toBeVisible();
    expect(form).toHaveTextContent("Reset");
    expect(submitButton).toBeDisabled();
  });

  test("should redirect on successful reset", async ({ expect }) => {
    const { container } = render(<PasswordResetForm />);
    const { form, emailInput, submitButton } = getElements(container);
    expect(form).toBeVisible();

    fillAndSubmitForm({ emailInput, submitButton });

    await waitFor(() => {
      expect(toastSuccessMock).toHaveBeenCalledWith(
        "An email has been sent to reset your password",
      );
    });

    expect(navigateMock).toHaveBeenCalledWith("/login");
    expect(performRequest).toHaveBeenCalledWith(
      "/api/v1/auth/password_reset/",
      {
        data: { email: "test@email.com" },
        method: "POST",
      },
    );
  });

  test("should show an error message on api error", async ({ expect }) => {
    server.use(passwordResetError);
    const { container } = render(<PasswordResetForm />);
    const { form, emailInput, submitButton } = getElements(container);

    expect(form).toBeVisible();

    fillAndSubmitForm({ emailInput, submitButton });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith(
        "/api/v1/auth/password_reset/",
        {
          data: { email: "test@email.com" },
          method: "POST",
        },
      );
    });

    expect(toastErrorMock).toHaveBeenCalledWith("Something went wrong");
  });

  test("should redirect to login page on go back button click", ({
    expect,
  }) => {
    const { container } = render(<PasswordResetForm />);
    const { goBackButton } = getElements(container);

    expect(goBackButton).toBeVisible();
    expect(goBackButton).toHaveAttribute("href", "/login");
  });
});
