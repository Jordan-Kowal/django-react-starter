import { updatePasswordError } from "@/tests/mocks/handlers/self";
import { server } from "@/tests/server";
import {
  expectApiCall,
  expectApiCallCount,
  getByTestId,
  render,
} from "@/tests/utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { PasswordForm } from "./index";

describe.concurrent("components/features/User/PasswordForm", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    form: HTMLFormElement;
    card: HTMLElement;
    genericErrors: HTMLElement;
    currentPasswordInput: HTMLInputElement;
    currentPasswordErrors: HTMLElement | null;
    passwordInput: HTMLInputElement;
    passwordErrors: HTMLElement | null;
    confirmPasswordInput: HTMLInputElement;
    confirmPasswordErrors: HTMLElement | null;
    submitButton: HTMLButtonElement;
  } => {
    const form = getByTestId<HTMLFormElement>(container, "password-form");
    return {
      form,
      card: form.querySelector(".ant-card") as HTMLElement,
      genericErrors: form.querySelector(
        ".custom-ant-non-field-errors",
      ) as HTMLElement,
      currentPasswordInput: form.querySelector(
        "#currentPassword",
      ) as HTMLInputElement,
      currentPasswordErrors: form.querySelector("#currentPassword_help"),
      passwordInput: form.querySelector("#password") as HTMLInputElement,
      passwordErrors: form.querySelector("#password_help"),
      confirmPasswordInput: form.querySelector(
        "#confirmPassword",
      ) as HTMLInputElement,
      confirmPasswordErrors: form.querySelector("#confirmPassword_help"),
      submitButton: form.querySelector(
        "button[type='submit']",
      ) as HTMLButtonElement,
    };
  };

  test("should correctly render the form", async ({ expect }) => {
    const { container } = render(<PasswordForm />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.form).toBeVisible();
      expect(elements.card).toBeVisible();
      expect(elements.genericErrors).toBeVisible();
      expect(elements.currentPasswordInput).toBeVisible();
      expect(elements.currentPasswordErrors).toBeNull();
      expect(elements.passwordInput).toBeVisible();
      expect(elements.passwordErrors).toBeNull();
      expect(elements.confirmPasswordInput).toBeVisible();
      expect(elements.confirmPasswordErrors).toBeNull();
      expect(elements.submitButton).toBeVisible();
    });
  });

  test("should show form errors on submit", async ({ expect }) => {
    const { container } = render(<PasswordForm />);

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
      expect(elements.currentPasswordErrors).toBeVisible();
      expect(elements.currentPasswordErrors).toHaveTextContent(
        "Ce champ est obligatoire",
      );
      expect(elements.passwordErrors).toBeVisible();
      expect(elements.passwordErrors).toHaveTextContent(
        "Ce champ est obligatoire",
      );
      expect(elements.confirmPasswordErrors).toBeVisible();
      expect(elements.confirmPasswordErrors).toHaveTextContent(
        "Ce champ est obligatoire",
      );
    });
  });

  test.sequential("should show API errors on submit", async ({ expect }) => {
    server.use(updatePasswordError);

    const { container } = render(<PasswordForm />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.form).toBeVisible();
    });

    act(() => {
      const elements = getElements(container);
      fireEvent.change(elements.currentPasswordInput, {
        target: { value: "test" },
      });
      fireEvent.change(elements.passwordInput, { target: { value: "test" } });
      fireEvent.change(elements.confirmPasswordInput, {
        target: { value: "test" },
      });
      fireEvent.click(elements.submitButton);
    });

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.currentPasswordErrors).toBeVisible();
      expect(elements.currentPasswordErrors).toHaveTextContent(
        "Mot de passe actuel incorrect",
      );
      expect(elements.passwordErrors).toBeVisible();
      expect(elements.passwordErrors).toHaveTextContent(
        "Ce mot de passe est trop courant",
      );
    });

    expectApiCallCount(expect, 1);
    expectApiCall(expect, {
      url: "/api/v1/self/update_password/",
      method: "POST",
      data: {
        current_password: "test",
        password: "test",
        confirm_password: "test",
      },
      status: 400,
      response: {
        current_password: ["Mot de passe actuel incorrect"],
        password: ["Ce mot de passe est trop courant"],
      },
    });
  });

  test.sequential(
    "should update password on valid form",
    async ({ expect }) => {
      const { container } = render(<PasswordForm />);

      await waitFor(() => {
        const elements = getElements(container);
        expect(elements.form).toBeVisible();
      });

      act(() => {
        const elements = getElements(container);
        fireEvent.change(elements.currentPasswordInput, {
          target: { value: "test" },
        });
        fireEvent.change(elements.passwordInput, { target: { value: "test" } });
        fireEvent.change(elements.confirmPasswordInput, {
          target: { value: "test" },
        });
        fireEvent.click(elements.submitButton);
      });

      await waitFor(() => {
        const elements = getElements(container);
        expect(elements.currentPasswordErrors).toBeNull();
        expect(elements.passwordErrors).toBeNull();
        expect(elements.confirmPasswordErrors).toBeNull();
      });

      expectApiCallCount(expect, 1);
      expectApiCall(expect, {
        url: "/api/v1/self/update_password/",
        method: "POST",
        data: {
          current_password: "test",
          password: "test",
          confirm_password: "test",
        },
        status: 204,
        response: null,
      });
    },
  );
});
