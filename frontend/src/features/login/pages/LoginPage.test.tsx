import { navigateMock } from "@/tests/mocks/globals";
import { selfError } from "@/tests/mocks/handlers/shared";
import { server } from "@/tests/server";
import { render } from "@/tests/utils";
import { act, fireEvent, getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  test("should render the page with login form by default", async ({
    expect,
  }) => {
    server.use(selfError);
    const { container } = render(<LoginPage />);
    const loginPage = getByTestId<HTMLDivElement>(container, "login-page");

    await waitFor(() => {
      expect(loginPage).toBeVisible();
    });

    expect(loginPage).toHaveTextContent("Django React Starter");
    expect(getByTestId(container, "login-form")).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalledWith("/");
  });

  test("should switch to register form when register toggle is clicked", async ({
    expect,
  }) => {
    server.use(selfError);
    const { container } = render(<LoginPage />);
    const loginPage = getByTestId<HTMLDivElement>(container, "login-page");

    await waitFor(() => {
      expect(loginPage).toBeVisible();
    });

    // Initially should show login form
    expect(getByTestId(container, "login-form")).toBeInTheDocument();

    // Click on register toggle
    act(() => {
      fireEvent.click(getByTestId(container, "mode-register"));
    });

    // Should now show register form
    await waitFor(() => {
      expect(getByTestId(container, "register-form")).toBeInTheDocument();
    });

    // Switch back to login
    act(() => {
      fireEvent.click(getByTestId(container, "mode-login"));
    });

    // Should be back to login form
    await waitFor(() => {
      expect(getByTestId(container, "login-form")).toBeInTheDocument();
    });
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
