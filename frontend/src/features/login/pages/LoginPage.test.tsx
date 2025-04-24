import { navigateMock } from "@/tests/mocks/globals";
import { render } from "@/tests/utils";
import { fireEvent, getByTestId } from "@testing-library/react";
import { describe, test } from "vitest";
import LoginPage from "./LoginPage";

describe.concurrent("LoginPage", () => {
  test("should render the page with login form by default", ({ expect }) => {
    const { container } = render(<LoginPage />);
    const loginPage = getByTestId<HTMLDivElement>(container, "login-page");

    expect(loginPage).toBeVisible();
    expect(loginPage).toHaveTextContent("Django React Starter");
    expect(getByTestId(container, "login-form")).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalledWith("/");
  });

  test("should switch to register form when register toggle is clicked", ({
    expect,
  }) => {
    const { container } = render(<LoginPage />);
    const loginPage = getByTestId<HTMLDivElement>(container, "login-page");

    expect(loginPage).toBeVisible();
    // Initially should show login form
    expect(getByTestId(container, "login-form")).toBeInTheDocument();
    // Click on register toggle
    fireEvent.click(getByTestId(container, "mode-register"));
    // Should now show register form
    expect(getByTestId(container, "register-form")).toBeInTheDocument();
    // Switch back to login
    fireEvent.click(getByTestId(container, "mode-login"));
    // Should be back to login form
    expect(getByTestId(container, "login-form")).toBeInTheDocument();
  });

  test("should switch to password reset page when link is clicked", ({
    expect,
  }) => {
    const { container } = render(<LoginPage />);
    const loginPage = getByTestId<HTMLDivElement>(container, "login-page");

    expect(loginPage).toBeVisible();
    expect(getByTestId(container, "password-reset-link")).toHaveAttribute(
      "href",
      "/password-reset",
    );
  });
});
