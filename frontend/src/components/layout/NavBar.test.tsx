import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
  test("should render the component", async () => {
    const { container } = render(<NavBar dataTestId="navbar" />);

    const navbar = getByTestId<HTMLDivElement>(container, "navbar");

    await waitFor(() => {
      expect(navbar).toBeVisible();
      expect(navbar).toHaveTextContent("Django React Starter");
    });
  });

  test("should handle redirects", async () => {
    const { container } = render(<NavBar dataTestId="navbar" />);

    const navbar = getByTestId<HTMLDivElement>(container, "navbar");
    const logoLink = getByTestId<HTMLLinkElement>(
      container,
      "navbar-logo-link",
    );
    const homeLink = getByTestId<HTMLLinkElement>(
      container,
      "navbar-home-link",
    );
    const settingsLink = getByTestId<HTMLLinkElement>(
      container,
      "navbar-settings-link",
    );

    await waitFor(() => {
      expect(navbar).toBeVisible();
      expect(logoLink.href).toMatch(/\/$/);
      expect(homeLink.href).toMatch(/\/$/);
      expect(settingsLink.href).toMatch(/\/settings$/);
    });
  });

  test("should allow logout", async () => {
    const { container } = render(<NavBar dataTestId="navbar" />);
    const navbar = getByTestId<HTMLDivElement>(container, "navbar");
    const logoutButton = getByTestId<HTMLButtonElement>(
      container,
      "navbar-logout-button",
    );

    await waitFor(() => {
      expect(navbar).toBeVisible();
      expect(logoutButton).toBeVisible();
      logoutButton.click();
    });
  });
});
