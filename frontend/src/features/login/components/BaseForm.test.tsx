import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, test, vi } from "vitest";
import { BaseForm } from "./BaseForm";

const onSubmit = vi.fn();

describe("LoginForm", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(
      <BaseForm dataTestId="base-form" onSubmit={onSubmit}>
        Submit
      </BaseForm>,
    );

    const form = getByTestId(container, "base-form");

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    expect(form).toHaveTextContent("Submit");
  });

  test("should call onSubmit on form submission", async ({ expect }) => {
    const { container } = render(
      <BaseForm dataTestId="base-form" onSubmit={onSubmit}>
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </BaseForm>,
    );

    const form = getByTestId(container, "base-form");
    const submitButton = getByTestId(container, "submit-button");

    await waitFor(() => {
      expect(form).toBeVisible();
    });

    act(() => {
      submitButton.click();
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
