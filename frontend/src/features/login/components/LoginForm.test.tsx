import { performRequest } from "@/api/utils";
import { navigateMock, toastErrorMock } from "@/tests/mocks/globals";
import { loginError } from "@/tests/mocks/handlers/login";
import { server } from "@/tests/server";
import { render } from "@/tests/utils";
import { act, fireEvent, getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { LoginForm } from "./LoginForm";

const getElements = (
  container: HTMLElement,
): {
  form: HTMLFormElement;
  emailInput: HTMLInputElement;
  emailError: HTMLDivElement;
  passwordInput: HTMLInputElement;
  passwordError: HTMLDivElement;
  submitButton: HTMLButtonElement;
} => ({
  form: getByTestId<HTMLFormElement>(container, "login-form"),
  emailInput: getByTestId<HTMLInputElement>(container, "email-input"),
  emailError: getByTestId<HTMLDivElement>(container, "email-input"),
  passwordInput: getByTestId<HTMLInputElement>(container, "password-input"),
  passwordError: getByTestId<HTMLDivElement>(container, "password-input"),
  submitButton: getByTestId<HTMLButtonElement>(container, "submit-button"),
});

describe("LoginForm", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(<LoginForm />);
    const { form, submitButton } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    expect(form).toHaveTextContent("Login");
    expect(submitButton).toBeDisabled();
  });

  test("should redirect on successful login", async ({ expect }) => {
    const { container } = render(<LoginForm />);
    const { form, emailInput, passwordInput, submitButton } =
      getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    act(() => {
      fireEvent.input(emailInput, { target: { value: "test@email.com" } });
      fireEvent.input(passwordInput, { target: { value: "password" } });
      fireEvent.submit(submitButton);
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/");
    });

    expect(performRequest).toHaveBeenCalledWith("/api/v1/auth/login/", {
      data: { email: "test@email.com", password: "password" },
      method: "POST",
    });
  });

  test("should show error on empty fields", async ({ expect }) => {
    const { container } = render(<LoginForm />);
    const {
      form,
      submitButton,
      emailInput,
      emailError,
      passwordError,
      passwordInput,
    } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    expect(emailError).toBeEmptyDOMElement();
    expect(passwordError).toBeEmptyDOMElement();

    act(() => {
      fireEvent.input(emailInput, { target: { value: "invalid" } });
      fireEvent.input(passwordInput, { target: { value: "invalid" } });
      fireEvent.input(emailInput, { target: { value: "" } });
      fireEvent.input(passwordInput, { target: { value: "" } });
    });

    await waitFor(() => {
      expect(emailError).toHaveTextContent("Email is required");
    });

    expect(passwordError).toHaveTextContent("Password is required");
    expect(submitButton).toBeDisabled();
  });

  test("should show error on invalid email", async ({ expect }) => {
    const { container } = render(<LoginForm />);
    const { form, submitButton, emailInput, emailError } =
      getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    expect(emailError).toBeEmptyDOMElement();

    act(() => {
      fireEvent.change(emailInput, "invalid");
    });

    await waitFor(() => {
      expect(emailError).toHaveTextContent("Email is required");
    });

    expect(submitButton).toBeDisabled();
  });

  test.only("should show toast error on invalid login", async ({ expect }) => {
    server.use(loginError);
    const { container } = render(<LoginForm />);
    const { form, emailInput, passwordInput, submitButton } =
      getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    act(() => {
      fireEvent.input(emailInput, { target: { value: "test@email.com" } });
      fireEvent.input(passwordInput, { target: { value: "password" } });
      fireEvent.submit(submitButton);
    });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith("/api/v1/auth/login/", {
        data: { email: "test@email.com", password: "password" },
        method: "POST",
      });
    });

    expect(navigateMock).toHaveBeenCalledWith("/");
    expect(toastErrorMock).toHaveBeenCalledWith("Invalid credentials");
  });
});
