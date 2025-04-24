import { render } from "@/tests/utils";
import { getByTestId } from "@testing-library/react";
import { describe, test } from "vitest";
import PasswordResetPage from "./PasswordResetPage";

describe.concurrent("PasswordResetPage", () => {
  test("should render the page ", ({ expect }) => {
    const { container } = render(<PasswordResetPage />);
    const passwordResetPage = getByTestId<HTMLDivElement>(
      container,
      "password-reset-page",
    );

    expect(passwordResetPage).toBeVisible();
    expect(passwordResetPage).toHaveTextContent("Forgot your password?");
    expect(getByTestId(container, "password-reset-form")).toBeInTheDocument();
  });
});
