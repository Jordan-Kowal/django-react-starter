import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import PasswordResetConfirmPage from "./PasswordResetConfirmPage";

describe.concurrent("PasswordResetConfirmPage", () => {
  test("should render the page ", async ({ expect }) => {
    const { container } = render(<PasswordResetConfirmPage />);
    const passwordResetConfirmPage = getByTestId<HTMLDivElement>(
      container,
      "password-reset-confirm-page",
    );

    await waitFor(() => {
      expect(passwordResetConfirmPage).toBeVisible();
    });

    expect(passwordResetConfirmPage).toHaveTextContent("Set your new password");
    expect(
      getByTestId(container, "password-reset-confirm-form"),
    ).toBeInTheDocument();
  });
});
