import { performRequest } from "@/api/utils";
import { toastErrorMock, toastSuccessMock } from "@/tests/mocks/globals";
import {
  updateSelfCrash,
  updateSelfError,
} from "@/tests/mocks/handlers/settings";
import { server } from "@/tests/server";
import { render } from "@/tests/utils";
import { act, fireEvent, getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { UserForm } from "./UserForm";

const getElements = (
  container: HTMLElement,
): {
  form: HTMLFormElement;
  emailInput: HTMLInputElement;
  firstNameInput: HTMLInputElement;
  lastNameInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
} => ({
  form: getByTestId<HTMLFormElement>(container, "user-form"),
  emailInput: getByTestId<HTMLInputElement>(container, "email-input"),
  firstNameInput: getByTestId<HTMLInputElement>(container, "first-name-input"),
  lastNameInput: getByTestId<HTMLInputElement>(container, "last-name-input"),
  submitButton: getByTestId<HTMLButtonElement>(container, "submit-button"),
});

const fillAndSubmitForm = ({
  emailInput,
  firstNameInput,
  lastNameInput,
  submitButton,
}: {
  emailInput: HTMLInputElement;
  firstNameInput: HTMLInputElement;
  lastNameInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
}) => {
  act(() => {
    fireEvent.input(emailInput, {
      target: { value: "email@email.email" },
    });
    fireEvent.input(firstNameInput, { target: { value: "firstName" } });
    fireEvent.input(lastNameInput, { target: { value: "lastName" } });
    fireEvent.submit(submitButton);
  });
};

describe("UserForm", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(<UserForm />);
    const { form, submitButton } = getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    expect(form).toHaveTextContent("First name");
    expect(submitButton).toBeDisabled();
  });

  test("should show success message on update", async ({ expect }) => {
    const { container } = render(<UserForm />);
    const { form, emailInput, firstNameInput, lastNameInput, submitButton } =
      getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      emailInput,
      firstNameInput,
      lastNameInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastSuccessMock).toHaveBeenCalledWith("Information updated");
    });

    expect(performRequest).toHaveBeenCalledWith("/api/v1/self/", {
      data: {
        email: "email@email.email",
        first_name: "firstName",
        last_name: "lastName",
      },
      method: "POST",
    });
  });

  test("should show error message on 400", async ({ expect }) => {
    server.use(updateSelfError);
    const { container } = render(<UserForm />);
    const { form, emailInput, firstNameInput, submitButton, lastNameInput } =
      getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      emailInput,
      firstNameInput,
      lastNameInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith(
        "Failed to update information",
      );
    });

    expect(performRequest).toHaveBeenCalledWith("/api/v1/self/", {
      data: {
        email: "email@email.email",
        first_name: "firstName",
        last_name: "lastName",
      },
      method: "POST",
    });
  });

  test("should show generic error on 500", async ({ expect }) => {
    server.use(updateSelfCrash);
    const { container } = render(<UserForm />);
    const { form, emailInput, firstNameInput, submitButton, lastNameInput } =
      getElements(container);

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    fillAndSubmitForm({
      emailInput,
      firstNameInput,
      lastNameInput,
      submitButton,
    });

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Something went wrong");
    });

    expect(performRequest).toHaveBeenCalledWith("/api/v1/self/", {
      data: {
        email: "email@email.email",
        first_name: "firstName",
        last_name: "lastName",
      },
      method: "POST",
    });
  });
});
