import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import PasswordResetPage from "./PasswordResetPage";

describe("PasswordResetPage", () => {
  test("should render the page ", async ({ expect }) => {
    const { container } = render(<PasswordResetPage />);
    const passwordResetPage = getByTestId<HTMLDivElement>(
      container,
      "password-reset-page",
    );

    await waitFor(() => {
      expect(passwordResetPage).toBeVisible();
    });

    expect(passwordResetPage).toHaveTextContent("Django React Starter");
    expect(getByTestId(container, "password-reset-form")).toBeInTheDocument();
  });
});
