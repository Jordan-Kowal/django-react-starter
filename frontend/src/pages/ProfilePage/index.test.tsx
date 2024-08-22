import { getByTestId, render } from "@/tests/utils";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import ProfilePage from "./index";

describe.concurrent("pages/ProfilePage", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    page: HTMLDivElement;
    banner: HTMLDivElement;
    profileTabButton: HTMLDivElement;
    passwordTabButton: HTMLDivElement;
    profileForm: HTMLFormElement;
    passwordForm: HTMLFormElement;
  } => ({
    page: getByTestId<HTMLDivElement>(container, "profile-page"),
    banner: getByTestId<HTMLDivElement>(container, "page-banner"),
    profileTabButton: getByTestId<HTMLDivElement>(
      container,
      "profile-tab-button",
    ),
    passwordTabButton: getByTestId<HTMLDivElement>(
      container,
      "password-tab-button",
    ),
    profileForm: getByTestId<HTMLFormElement>(container, "profile-form"),
    passwordForm: getByTestId<HTMLFormElement>(container, "password-form"),
  });

  test("should render the page with the profile form by default", async ({
    expect,
  }) => {
    const { container } = render(<ProfilePage />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.page).toBeVisible();
      expect(elements.banner).toBeVisible();
      expect(elements.banner).toHaveTextContent("Profil");
      expect(elements.profileTabButton).toBeVisible();
      expect(elements.profileTabButton).toHaveTextContent("Profil");
      expect(elements.profileTabButton).toHaveClass(
        "border-primary text-primary",
      );
      expect(elements.passwordTabButton).toBeVisible();
      expect(elements.passwordTabButton).toHaveTextContent("Mot de passe");
      expect(elements.passwordTabButton).not.toHaveClass(
        "border-primary text-primary",
      );
      expect(elements.profileForm).toBeVisible();
      expect(elements.passwordForm).toBeNull();
    });
  });

  test("should allow to switch between profile and password form", async ({
    expect,
  }) => {
    const { container } = render(<ProfilePage />);

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.page).toBeVisible();
    });

    // Go to password form
    act(() => {
      const elements = getElements(container);
      fireEvent.click(elements.passwordTabButton);
    });

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.profileTabButton).not.toHaveClass(
        "border-primary text-primary",
      );
      expect(elements.passwordTabButton).toHaveClass(
        "border-primary text-primary",
      );
      expect(elements.profileForm).toBeNull();
      expect(elements.passwordForm).toBeVisible();
    });

    // Go back to profile form
    act(() => {
      const elements = getElements(container);
      fireEvent.click(elements.profileTabButton);
    });

    await waitFor(() => {
      const elements = getElements(container);
      expect(elements.profileTabButton).toHaveClass(
        "border-primary text-primary",
      );
      expect(elements.passwordTabButton).not.toHaveClass(
        "border-primary text-primary",
      );
      expect(elements.profileForm).toBeVisible();
      expect(elements.passwordForm).toBeNull();
    });
  });
});
