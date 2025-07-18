import { act, fireEvent, getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { performRequest } from "@/api/utils";
import { navigateMock, toastErrorMock } from "@/tests/mocks/globals";
import { loginCrash, loginError } from "@/tests/mocks/handlers/login";
import { server } from "@/tests/server";
import { render } from "@/tests/utils";
import { LoginForm } from "./LoginForm";

const getElements = (
  container: HTMLElement,
): {
  form: HTMLFormElement;
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
} => ({
  form: getByTestId<HTMLFormElement>(container, "login-form"),
  emailInput: getByTestId<HTMLInputElement>(container, "email-input"),
  passwordInput: getByTestId<HTMLInputElement>(container, "password-input"),
  submitButton: getByTestId<HTMLButtonElement>(container, "submit-button"),
});

const fillAndSubmitForm = ({
  emailInput,
  passwordInput,
  submitButton,
}: {
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
}) => {
  act(() => {
    fireEvent.input(emailInput, { target: { value: "test@email.com" } });
    fireEvent.input(passwordInput, { target: { value: "password" } });
    fireEvent.submit(submitButton);
  });
};

describe("LoginForm", () => {
  test("should render the component", ({ expect }) => {
    const { container } = render(<LoginForm />);
    const { form, submitButton } = getElements(container);

    expect(form).toBeVisible();
    expect(form).toHaveTextContent("Login");
    expect(submitButton).toBeDisabled();
  });

  test("should redirect on successful login", async ({ expect }) => {
    const { container } = render(<LoginForm />);
    const { form, emailInput, passwordInput, submitButton } =
      getElements(container);

    expect(form).toBeVisible();

    fillAndSubmitForm({ emailInput, passwordInput, submitButton });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/");
    });

    expect(performRequest).toHaveBeenCalledWith("/api/v1/auth/login/", {
      data: { email: "test@email.com", password: "password" },
      method: "POST",
    });
  });

  test("should show invalid credentials error on 400", async ({ expect }) => {
    server.use(loginError);
    const { container } = render(<LoginForm />);
    const { form, emailInput, passwordInput, submitButton } =
      getElements(container);

    expect(form).toBeVisible();

    fillAndSubmitForm({ emailInput, passwordInput, submitButton });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith("/api/v1/auth/login/", {
        data: { email: "test@email.com", password: "password" },
        method: "POST",
      });
    });

    expect(toastErrorMock).toHaveBeenCalledWith("Invalid credentials");
  });

  test("should generic error message on 500", async ({ expect }) => {
    server.use(loginCrash);
    const { container } = render(<LoginForm />);
    const { form, emailInput, passwordInput, submitButton } =
      getElements(container);

    expect(form).toBeVisible();

    fillAndSubmitForm({ emailInput, passwordInput, submitButton });

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith("/api/v1/auth/login/", {
        data: { email: "test@email.com", password: "password" },
        method: "POST",
      });
    });

    expect(toastErrorMock).toHaveBeenCalledWith("Something went wrong");
  });
});
