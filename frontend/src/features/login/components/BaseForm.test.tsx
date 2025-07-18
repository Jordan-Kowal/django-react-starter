import { getByTestId } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { render } from "@/tests/utils";
import { BaseForm } from "./BaseForm";

const onSubmit = vi.fn();

describe.concurrent("LoginForm", () => {
  test("should render the component", ({ expect }) => {
    const { container } = render(
      <BaseForm dataTestId="base-form" onSubmit={onSubmit}>
        Submit
      </BaseForm>,
    );

    const form = getByTestId(container, "base-form");

    expect(form).toBeVisible();
    expect(form).toHaveTextContent("Submit");
  });

  test("should call onSubmit on form submission", ({ expect }) => {
    const { container } = render(
      <BaseForm dataTestId="base-form" onSubmit={onSubmit}>
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </BaseForm>,
    );

    const form = getByTestId(container, "base-form");
    const submitButton = getByTestId(container, "submit-button");

    expect(form).toBeVisible();

    submitButton.click();

    expect(onSubmit).toHaveBeenCalled();
  });
});
