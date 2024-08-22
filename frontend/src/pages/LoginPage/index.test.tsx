import { getByTestId, render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import LoginPage from "./index";

describe.concurrent("pages/LoginPage", () => {
  test("should render the login page", async ({ expect }) => {
    const { container } = render(<LoginPage />);

    await waitFor(() => {
      const page = getByTestId<HTMLDivElement>(container, "login-page");
      const loginForm = getByTestId<HTMLDivElement>(container, "login-form");
      const logo = container.children[0].querySelector("img");
      expect(page).toBeVisible();
      expect(page).toHaveTextContent(
        "Bienvenue sur le site de Django React Starter.",
      );
      expect(logo).toBeVisible();
      expect(loginForm).toBeVisible();
    });
  });
});
