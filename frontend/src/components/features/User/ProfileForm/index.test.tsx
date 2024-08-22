import { useSelf } from "@/api/self";
import { SELF_MOCK } from "@/api/self/__mocks__/self";
import { updateSelfError } from "@/tests/mocks/handlers/self";
import { server } from "@/tests/server";
import {
  expectApiCall,
  expectApiCallCount,
  getByTestId,
  render,
  renderHook,
} from "@/tests/utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { sleep } from "jkscript";
import { describe, test } from "vitest";
import { ProfileForm } from "./index";

describe.concurrent("components/features/User/ProfileForm", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    form: HTMLFormElement;
    card: HTMLElement;
    genericErrors: HTMLElement;
    emailInput: HTMLInputElement;
    emailErrors: HTMLElement | null;
    firstNameInput: HTMLInputElement;
    firstNameErrors: HTMLElement | null;
    lastNameInput: HTMLInputElement;
    lastNameErrors: HTMLElement | null;
    submitButton: HTMLButtonElement;
  } => {
    const form = getByTestId<HTMLFormElement>(container, "profile-form");
    return {
      form,
      card: form.querySelector(".ant-card") as HTMLElement,
      genericErrors: form.querySelector(
        ".custom-ant-non-field-errors",
      ) as HTMLElement,
      emailInput: form.querySelector("#email") as HTMLInputElement,
      emailErrors: form.querySelector("#email_help"),
      firstNameInput: form.querySelector("#firstName") as HTMLInputElement,
      firstNameErrors: form.querySelector("#firstName_help"),
      lastNameInput: form.querySelector("#lastName") as HTMLInputElement,
      lastNameErrors: form.querySelector("#lastName_help"),
      submitButton: form.querySelector(
        "button[type='submit']",
      ) as HTMLButtonElement,
    };
  };

  test("should correctly render the form", async ({ expect }) => {
    const { container } = render(<ProfileForm />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.form).toBeVisible();
      expect(elements.card).toBeVisible();
      expect(elements.genericErrors).toBeVisible();
      expect(elements.emailInput).toBeVisible();
      expect(elements.emailErrors).toBeNull();
      expect(elements.firstNameInput).toBeVisible();
      expect(elements.firstNameErrors).toBeNull();
      expect(elements.lastNameInput).toBeVisible();
      expect(elements.lastNameErrors).toBeNull();
      expect(elements.submitButton).toBeVisible();
    });
  });

  test.sequential(
    "should prefill the user data if it was already fetched",
    async ({ expect }) => {
      const { result } = renderHook(() => useSelf());
      await waitFor(() => expect(result.current.data).toEqual(SELF_MOCK));

      const { container } = render(<ProfileForm />);
      await sleep(100);

      await waitFor(() => {
        const elements = getElements(container);
        expect(elements.emailInput).toHaveValue(SELF_MOCK.email);
        expect(elements.firstNameInput).toHaveValue(SELF_MOCK.firstName);
        expect(elements.lastNameInput).toHaveValue(SELF_MOCK.lastName);
      });
    },
  );

  test("should show form errors on submit", async ({ expect }) => {
    const { container } = render(<ProfileForm />);

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
        "Veuillez saisir une adresse email valide",
      );
      expect(elements.firstNameErrors).toBeVisible();
      expect(elements.firstNameErrors).toHaveTextContent(
        "Ce champ est obligatoire",
      );
      expect(elements.lastNameErrors).toBeVisible();
      expect(elements.lastNameErrors).toHaveTextContent(
        "Ce champ est obligatoire",
      );
    });
  });

  test.sequential("should show API errors on submit", async ({ expect }) => {
    server.use(updateSelfError);

    const { container } = render(<ProfileForm />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.form).toBeVisible();
    });

    act(() => {
      const elements = getElements(container);
      fireEvent.change(elements.emailInput, {
        target: { value: "test@test.test" },
      });
      fireEvent.change(elements.firstNameInput, { target: { value: "test" } });
      fireEvent.change(elements.lastNameInput, {
        target: { value: "test" },
      });
      fireEvent.click(elements.submitButton);
    });

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.emailErrors).toBeVisible();
      expect(elements.emailErrors).toHaveTextContent("Cet email existe déjà");
    });

    expectApiCallCount(expect, 2);
    expectApiCall(expect, {
      url: "/api/v1/self/",
      method: "POST",
      data: { email: "test@test.test", first_name: "test", last_name: "test" },
      status: 400,
      response: { email: ["Cet email existe déjà"] },
    });
  });

  test.sequential(
    "should update user data on valid form",
    async ({ expect }) => {
      const { container } = render(<ProfileForm />);

      await waitFor(() => {
        const elements = getElements(container);
        expect(elements.form).toBeVisible();
      });

      act(() => {
        const elements = getElements(container);
        fireEvent.change(elements.emailInput, {
          target: { value: "test@test.test" },
        });
        fireEvent.change(elements.firstNameInput, {
          target: { value: "test" },
        });
        fireEvent.change(elements.lastNameInput, {
          target: { value: "test" },
        });
        fireEvent.click(elements.submitButton);
      });

      await waitFor(() => {
        const elements = getElements(container);
        expect(elements.emailErrors).toBeNull();
        expect(elements.firstNameErrors).toBeNull();
        expect(elements.lastNameErrors).toBeNull();
      });

      expectApiCallCount(expect, 2);
      expectApiCall(expect, {
        url: "/api/v1/self/",
        method: "POST",
        data: {
          email: "test@test.test",
          first_name: "test",
          last_name: "test",
        },
        status: 200,
        response: SELF_MOCK,
      });
    },
  );
});
