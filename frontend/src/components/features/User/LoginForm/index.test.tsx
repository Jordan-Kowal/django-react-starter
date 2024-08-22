import { loginError } from "@/tests/mocks/handlers/auth";
import { server } from "@/tests/server";
import {
  expectApiCall,
  expectApiCallCount,
  getByTestId,
  render,
} from "@/tests/utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { LoginForm } from "./index";

describe.concurrent("components/features/User/LoginForm", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    form: HTMLFormElement;
    card: HTMLElement;
    genericErrors: HTMLElement;
    emailInput: HTMLInputElement;
    emailErrors: HTMLElement | null;
    passwordInput: HTMLInputElement;
    passwordErrors: HTMLElement | null;
    submitButton: HTMLButtonElement;
  } => {
    const form = getByTestId<HTMLFormElement>(container, "login-form");
    return {
      form,
      card: form.querySelector(".ant-card") as HTMLElement,
      genericErrors: form.querySelector(
        ".custom-ant-non-field-errors",
      ) as HTMLElement,
      emailInput: form.querySelector("#email") as HTMLInputElement,
      emailErrors: form.querySelector("#email_help"),
      passwordInput: form.querySelector("#password") as HTMLInputElement,
      passwordErrors: form.querySelector("#password_help"),
      submitButton: form.querySelector(
        "button[type='submit']",
      ) as HTMLButtonElement,
    };
  };

  test("should correctly render the form", async ({ expect }) => {
    const { container } = render(<LoginForm />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.form).toBeVisible();
      expect(elements.card).toBeVisible();
      expect(elements.genericErrors).toBeVisible();
      expect(elements.emailInput).toBeVisible();
      expect(elements.emailErrors).toBeNull();
      expect(elements.passwordInput).toBeVisible();
      expect(elements.passwordErrors).toBeNull();
      expect(elements.submitButton).toBeVisible();
    });
  });

  test("should show form errors on submit", async ({ expect }) => {
    const { container } = render(<LoginForm />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.form).toBeVisible();
    });

    act(() => {
      const elements = getElements(container);
      fireEvent.click(elements.submitButton);
    });

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.emailErrors).toBeVisible();
      expect(elements.emailErrors).toHaveTextContent(
        "Ce champ est obligatoire",
      );
      expect(elements.passwordErrors).toBeVisible();
      expect(elements.passwordErrors).toHaveTextContent(
        "Ce champ est obligatoire",
      );
    });
  });

  test.sequential("should show API errors on submit", async ({ expect }) => {
    server.use(loginError);

    const { container } = render(<LoginForm />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.form).toBeVisible();
    });

    act(() => {
      const elements = getElements(container);
      fireEvent.change(elements.emailInput, {
        target: { value: "test@test.test" },
      });
      fireEvent.change(elements.passwordInput, { target: { value: "test" } });
      fireEvent.click(elements.submitButton);
    });

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.genericErrors).toHaveTextContent(
        "Identifiants de connexion invalides",
      );
    });

    expectApiCallCount(expect, 1);
    expectApiCall(expect, {
      url: "/api/v1/auth/login/",
      method: "POST",
      data: {
        email: "test@test.test",
        password: "test",
      },
      status: 400,
      response: { non_field_errors: ["Identifiants de connexion invalides"] },
    });
  });

  test.sequential(
    "should successfully login on valid form",
    async ({ expect }) => {
      const { container } = render(<LoginForm />);

      await waitFor(() => {
        const elements = getElements(container);
        expect(elements.form).toBeVisible();
      });

      act(() => {
        const elements = getElements(container);
        fireEvent.change(elements.emailInput, {
          target: { value: "test@test" },
        });
        fireEvent.change(elements.passwordInput, { target: { value: "test" } });
        fireEvent.click(elements.submitButton);
      });

      await waitFor(() => {
        const elements = getElements(container);
        expect(elements.genericErrors).not.toHaveTextContent(
          "Identifiants de connexion invalides",
        );
      });

      expectApiCallCount(expect, 1);
      expectApiCall(expect, {
        url: "/api/v1/auth/login/",
        method: "POST",
        data: {
          email: "test@test",
          password: "test",
        },
        status: 200,
        response: null,
      });
    },
  );
});
