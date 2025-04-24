import { performRequest } from "@/api/utils";
import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import Homepage from "./Homepage";

describe.concurrent("Homepage", () => {
  test("should render the page", ({ expect }) => {
    const { container } = render(<Homepage />);
    const homepage = getByTestId<HTMLDivElement>(container, "homepage");

    expect(homepage).toBeVisible();
    expect(homepage).toHaveTextContent("Django React Starter");
  });

  test("should redirect to settings", ({ expect }) => {
    const { container } = render(<Homepage />);
    const settingsLink = getByTestId<HTMLLinkElement>(
      container,
      "settings-link",
    );

    expect(settingsLink).toBeVisible();
    expect(settingsLink.href).toMatch(/\/settings$/);
  });

  test("should allow user to logout", async ({ expect }) => {
    const { container } = render(<Homepage />);
    const logoutButton = getByTestId<HTMLButtonElement>(
      container,
      "logout-button",
    );
    expect(logoutButton).toBeVisible();

    logoutButton.click();

    await waitFor(() => {
      expect(performRequest).toHaveBeenCalledWith("/api/v1/auth/logout/", {
        method: "POST",
      });
    });
  });
});
