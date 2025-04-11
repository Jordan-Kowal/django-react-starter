import { render } from "@/tests/utils";
import { act, fireEvent, getByTestId, waitFor } from "@testing-library/react";
import { LogOut } from "lucide-react";
import { describe, test, vi } from "vitest";
import { FieldsetInput } from "./FieldsetInput";

describe.concurrent("FieldsetInput", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(
      <FieldsetInput
        dataTestId="fieldset"
        label="Label"
        placeholder="Placeholder"
        type="email"
        name="Email"
      />,
    );
    const label = getByTestId<HTMLLabelElement>(container, "fieldset-label");
    const icon = label.querySelector("svg");
    const input = getByTestId<HTMLInputElement>(container, "fieldset-input");
    const error = getByTestId<HTMLDivElement>(container, "fieldset-error");

    await waitFor(() => {
      expect(label).toBeVisible();
    });

    expect(label).toHaveTextContent("Label");
    expect(icon).toBeNull();
    expect(input).toBeVisible();
    expect(input.id).toBe("Email");
    expect(input.name).toBe("Email");
    expect(input.type).toBe("email");
    expect(input.placeholder).toBe("Placeholder");
    expect(input).toHaveClass("input w-full input-primary");
    expect(error).toBeVisible();
    expect(error).toBeEmptyDOMElement();
  });

  test("should handle onChange and onBlur", async ({ expect }) => {
    const onChange = vi.fn();
    const onBlur = vi.fn();

    const { container } = render(
      <FieldsetInput
        dataTestId="fieldset"
        label="Label"
        type="email"
        name="Email"
        onChange={onChange}
        onBlur={onBlur}
      />,
    );

    const input = getByTestId<HTMLInputElement>(container, "fieldset-input");

    await waitFor(() => {
      expect(input).toBeVisible();
    });

    act(() => {
      fireEvent.blur(input);
      fireEvent.change(input, { target: { value: "test" } });
    });

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test("should show the provided icon", async ({ expect }) => {
    const { container } = render(
      <FieldsetInput
        dataTestId="fieldset"
        label="Label"
        type="email"
        name="Email"
        icon={<LogOut />}
      />,
    );

    const label = getByTestId<HTMLLabelElement>(container, "fieldset-label");
    const icon = label.querySelector("svg");

    await waitFor(() => {
      expect(label).toBeVisible();
    });

    expect(icon).toBeVisible();
  });

  test("should display the error when it exists", async ({ expect }) => {
    const { container } = render(
      <FieldsetInput
        dataTestId="fieldset"
        label="Label"
        type="email"
        name="Email"
        errorMessage="This is an error message"
      />,
    );

    const input = getByTestId<HTMLInputElement>(container, "fieldset-input");
    const error = getByTestId<HTMLDivElement>(container, "fieldset-error");

    await waitFor(() => {
      expect(error).toBeVisible();
    });

    expect(input).toHaveClass("input w-full input-error");
    expect(error).toHaveTextContent("This is an error message");
  });
});
