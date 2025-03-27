import { performRequest } from "@/api/utils";
import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(<NavBar />);
    const navbar = getByTestId<HTMLDivElement>(container, "navbar");

    await waitFor(() => {
      expect(navbar).toBeVisible();
    });

    expect(navbar).toHaveTextContent("Django React Starter");
  });

  test("should handle redirects", async ({ expect }) => {
    const { container } = render(<NavBar />);

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
    });

    expect(logoLink.href).toMatch(/\/$/);
    expect(homeLink.href).toMatch(/\/$/);
    expect(settingsLink.href).toMatch(/\/settings$/);
  });

  test("should allow logout", async ({ expect }) => {
    const { container } = render(<NavBar />);
    const logoutButton = getByTestId<HTMLButtonElement>(
      container,
      "navbar-logout-button",
    );

    await waitFor(() => {
      expect(logoutButton).toBeVisible();
    });

    logoutButton.click();

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith("/api/v1/auth/logout/", {
        method: "POST",
      });
    });
  });
});
