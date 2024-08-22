import { getByTestId, render } from "@/tests/utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { type ExpectStatic, describe, test } from "vitest";
import { InputNumber } from "./index";

describe.concurrent("components/forms/InputNumber", () => {
  const assertUpdate = async (
    expect: ExpectStatic,
    input: HTMLInputElement,
    inputValue: string,
    expectedValue: string,
  ) => {
    act(() => {
      fireEvent.change(input, { target: { value: inputValue } });
    });

    await waitFor(() => {
      expect(input).toHaveValue(expectedValue);
    });
  };

  test("should correctly parse french and english numbers", async ({
    expect,
  }) => {
    const { container } = render(<InputNumber dataTestId="input" />);
    const input = getByTestId<HTMLInputElement>(container, "input");

    await waitFor(() => {
      expect(input).toBeVisible();
    });

    await assertUpdate(expect, input, "1,5", "1.5");
    await assertUpdate(expect, input, "2.5", "2.5");
    await assertUpdate(expect, input, "", "0");
    await assertUpdate(expect, input, "0", "0");
  });
});
