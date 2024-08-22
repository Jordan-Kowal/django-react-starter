import { getByTestId, render, renderHook } from "@/tests/utils";
import { act, waitFor } from "@testing-library/react";
import { Form } from "antd";
import { describe, test } from "vitest";
import { NonFieldErrors } from "./index";

describe.concurrent("components/forms/NonFieldErrors", () => {
  test("should render the form element", async ({ expect }) => {
    const { result } = renderHook(() => Form.useForm());
    const [form] = result.current;
    const { container } = render(
      <Form form={form}>
        <NonFieldErrors dataTestId="non-field-errors" />
      </Form>,
    );

    const element = getByTestId<HTMLDivElement>(container, "non-field-errors");

    await waitFor(() => {
      const errorElement = element?.querySelector("#nonFieldErrors_help");
      expect(element).toBeVisible();
      expect(errorElement).toBeNull();
    });

    act(() => {
      form.setFields([
        {
          name: "nonFieldErrors",
          errors: ["This is a test error"],
        },
      ]);
    });

    await waitFor(() => {
      const errorElement = element?.querySelector("#nonFieldErrors_help");
      expect(errorElement).toHaveTextContent("This is a test error");
    });
  });
});
