import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  test("should render the login page", async ({ expect }) => {
    const { container } = render(<LoginPage />);

    await waitFor(() => {
      const loginPage = getByTestId<HTMLDivElement>(container, "login-page");
      expect(loginPage).toBeVisible();
      expect(loginPage).toHaveTextContent("Django React Starter");
    });
  });
});
