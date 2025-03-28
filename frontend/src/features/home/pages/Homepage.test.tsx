import { performRequest } from "@/api/utils";
import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import Homepage from "./Homepage";

describe("Homepage", () => {
  test("should render the page", async ({ expect }) => {
    const { container } = render(<Homepage />);
    const homepage = getByTestId<HTMLDivElement>(container, "homepage");

    await waitFor(() => {
      expect(homepage).toBeVisible();
    });

    expect(homepage).toHaveTextContent("Django React Starter");
  });

  test("should redirect to settings", async ({ expect }) => {
    const { container } = render(<Homepage />);
    const settingsLink = getByTestId<HTMLLinkElement>(
      container,
      "settings-link",
    );

    await waitFor(() => {
      expect(settingsLink).toBeVisible();
    });

    expect(settingsLink.href).toMatch(/\/settings$/);
  });

  test("should allow user to logout", async ({ expect }) => {
    const { container } = render(<Homepage />);
    const logoutButton = getByTestId<HTMLButtonElement>(
      container,
      "logout-button",
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
