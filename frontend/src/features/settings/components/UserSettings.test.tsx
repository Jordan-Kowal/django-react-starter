import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { render } from "@/tests/utils";
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
  test("should render the component", ({ expect }) => {
    const { container } = render(<UserSettings />);
    const { userSettings } = getElements(container);

    expect(userSettings).toBeVisible();
    expect(userSettings).toHaveTextContent("Language");
  });

  test.sequential("should change locale on click", async ({ expect }) => {
    const { container } = render(<UserSettings />);
    const { userSettings, localeFr, localeEn } = getElements(container);

    expect(userSettings).toBeVisible();
    expect(userSettings).toHaveTextContent("Language");

    localeFr.click();

    await waitFor(() => {
      expect(userSettings).toHaveTextContent("Langue");
    });

    localeEn.click();

    await waitFor(() => {
      expect(userSettings).toHaveTextContent("Language");
    });
  });

  test("should change theme on click", async ({ expect }) => {
    const { container } = render(<UserSettings />);
    const themeProvider = getByTestId(container, "theme-provider");
    const { userSettings, themeLight, themeDark } = getElements(container);

    expect(userSettings).toBeVisible();
    expect(themeProvider).toHaveAttribute("data-theme", "bumblebee");

    themeDark.click();

    await waitFor(() => {
      expect(themeProvider).toHaveAttribute("data-theme", "coffee");
    });

    themeLight.click();

    await waitFor(() => {
      expect(themeProvider).toHaveAttribute("data-theme", "bumblebee");
    });
  });
});
