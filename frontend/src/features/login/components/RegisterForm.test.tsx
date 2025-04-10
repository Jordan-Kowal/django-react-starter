import { performRequest } from "@/api/utils";
import {
  navigateMock,
  toastErrorMock,
  toastSuccessMock,
} from "@/tests/mocks/globals";
import {
  registerCrash,
  registerEmailError,
  registerPasswordError,
} from "@/tests/mocks/handlers/login";
import { server } from "@/tests/server";
import { render } from "@/tests/utils";
import { act, fireEvent, getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { RegisterForm } from "./RegisterForm";

const getElements = (
  container: HTMLElement,
): {
  form: HTMLFormElement;
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
} => ({
  form: getByTestId<HTMLFormElement>(container, "register-form"),
  emailInput: getByTestId<HTMLInputElement>(container, "email-input"),
  passwordInput: getByTestId<HTMLInputElement>(container, "password-input"),
  confirmPasswordInput: getByTestId<HTMLInputElement>(
    container,
    "confirm-password-input",
  ),
  submitButton: getByTestId<HTMLButtonElement>(container, "submit-button"),
});

const fillAndSubmitForm = ({
  emailInput,
  passwordInput,
  confirmPasswordInput,
  submitButton,
}: {
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  confirmPasswordInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
}) => {
  act(() => {
    fireEvent.input(emailInput, { target: { value: "test@email.com" } });
    fireEvent.input(passwordInput, { target: { value: "password" } });
    fireEvent.input(confirmPasswordInput, { target: { value: "password" } });
    fireEvent.submit(submitButton);
  });
};

describe("RegisterForm", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(<RegisterForm />);
    const { form, submitButton } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    expect(form).toHaveTextContent("Register");
    expect(submitButton).toBeDisabled();
  });

  test("should redirect on successful registration", async ({ expect }) => {
    const { container } = render(<RegisterForm />);
    const {
      form,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastSuccessMock).toHaveBeenCalledWith(
        "Account created successfully",
      );
    });

    expect(navigateMock).toHaveBeenCalledWith("/");
    expect(performRequest).toHaveBeenCalledWith("/api/v1/auth/register/", {
      data: { email: "test@email.com", password: "password" },
      method: "POST",
    });
  });

  test("should show email error message on 400", async ({ expect }) => {
    server.use(registerEmailError);
    const { container } = render(<RegisterForm />);
    const {
      form,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith("/api/v1/auth/register/", {
        data: { email: "test@email.com", password: "password" },
        method: "POST",
      });
    });

    expect(toastErrorMock).toHaveBeenCalledWith("Email already taken");
  });

  test("should show password error message on 400", async ({ expect }) => {
    server.use(registerPasswordError);
    const { container } = render(<RegisterForm />);
    const {
      form,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith("/api/v1/auth/register/", {
        data: { email: "test@email.com", password: "password" },
        method: "POST",
      });
    });

    expect(toastErrorMock).toHaveBeenCalledWith("Password is too weak");
  });

  test("should show generic error message on 500", async ({ expect }) => {
    server.use(registerCrash);
    const { container } = render(<RegisterForm />);
    const {
      form,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      emailInput,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith("/api/v1/auth/register/", {
        data: { email: "test@email.com", password: "password" },
        method: "POST",
      });
    });

    expect(toastErrorMock).toHaveBeenCalledWith("Something went wrong");
  });
});
