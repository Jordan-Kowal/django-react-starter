import { navigateMock } from "@/tests/mocks/globals";
import { selfError } from "@/tests/mocks/handlers/shared";
import { server } from "@/tests/server";
import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  test("should render the page", async ({ expect }) => {
    server.use(selfError);
    const { container } = render(<LoginPage />);
    const loginPage = getByTestId<HTMLDivElement>(container, "login-page");

    await waitFor(() => {
      expect(loginPage).toBeVisible();
    });

    expect(loginPage).toHaveTextContent("Django React Starter");
    expect(navigateMock).not.toHaveBeenCalledWith("/");
  });

  test("should redirect if user is already logged in", async ({ expect }) => {
    const { container } = render(<LoginPage />);
    const loginPage = getByTestId<HTMLDivElement>(container, "login-page");

    await waitFor(() => {
      expect(loginPage).toBeVisible();
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/");
    });
  });
});
