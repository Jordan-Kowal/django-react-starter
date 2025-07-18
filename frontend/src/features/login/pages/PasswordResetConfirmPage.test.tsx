import { getByTestId } from "@testing-library/react";
import { describe, test } from "vitest";
import { render } from "@/tests/utils";
import PasswordResetConfirmPage from "./PasswordResetConfirmPage";

describe.concurrent("PasswordResetConfirmPage", () => {
  test("should render the page ", ({ expect }) => {
    const { container } = render(<PasswordResetConfirmPage />);
    const passwordResetConfirmPage = getByTestId<HTMLDivElement>(
      container,
      "password-reset-confirm-page",
    );

    expect(passwordResetConfirmPage).toBeVisible();
    expect(passwordResetConfirmPage).toHaveTextContent("Set your new password");
    expect(
      getByTestId(container, "password-reset-confirm-form"),
    ).toBeInTheDocument();
  });
});
