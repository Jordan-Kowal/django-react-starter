import { render } from "@/tests/utils";
import { act, getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { UserSettings } from "./UserSettings";

const getElements = (
  container: HTMLElement,
): {
  userSettings: HTMLDivElement;
  localeFr: HTMLInputElement;
  localeEn: HTMLInputElement;
  themeLight: HTMLInputElement;
  themeDark: HTMLInputElement;
} => ({
  userSettings: getByTestId<HTMLDivElement>(container, "user-settings"),
  localeFr: getByTestId<HTMLInputElement>(container, "locale-fr"),
  localeEn: getByTestId<HTMLInputElement>(container, "locale-en"),
  themeLight: getByTestId<HTMLInputElement>(container, "theme-light"),
  themeDark: getByTestId<HTMLInputElement>(container, "theme-dark"),
});

describe.concurrent("UserSettings", () => {
  test("should render the component", async ({ expect }) => {
    const { container } = render(<UserSettings />);
    const { userSettings } = getElements(container);

    await waitFor(() => {
      expect(userSettings).toBeVisible();
    });

    expect(userSettings).toHaveTextContent("Language");
  });

  test("should change locale on click", async ({ expect }) => {
    const { container } = render(<UserSettings />);
    const { userSettings, localeFr, localeEn } = getElements(container);

    await waitFor(() => {
      expect(userSettings).toBeVisible();
    });

    expect(userSettings).toHaveTextContent("Language");

    act(() => {
      localeFr.click();
    });

    await waitFor(() => {
      expect(userSettings).toHaveTextContent("Langue");
    });

    act(() => {
      localeEn.click();
    });

    await waitFor(() => {
      expect(userSettings).toHaveTextContent("Language");
    });
  });

  test("should change theme on click", async ({ expect }) => {
    const { container } = render(<UserSettings />);
    const themeProvider = getByTestId(container, "theme-provider");
    const { userSettings, themeLight, themeDark } = getElements(container);

    await waitFor(() => {
      expect(userSettings).toBeVisible();
    });

    expect(themeProvider).toHaveAttribute("data-theme", "bumblebee");

    act(() => {
      themeDark.click();
    });

    await waitFor(() => {
      expect(themeProvider).toHaveAttribute("data-theme", "coffee");
    });

    act(() => {
      themeLight.click();
    });

    await waitFor(() => {
      expect(themeProvider).toHaveAttribute("data-theme", "bumblebee");
    });
  });
});
