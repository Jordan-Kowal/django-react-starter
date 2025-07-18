import { getByTestId } from "@testing-library/react";
import { describe, test } from "vitest";
import { render } from "@/tests/utils";
import SettingsPage from "./SettingsPage";

describe.concurrent("SettingsPage", () => {
  test("should render the settings page with all sections", ({ expect }) => {
    const { container } = render(<SettingsPage />);
    const settingsPage = getByTestId<HTMLDivElement>(
      container,
      "settings-page",
    );

    expect(settingsPage).toBeVisible();
    expect(settingsPage).toHaveTextContent("Django React Starter");
    expect(settingsPage).toHaveTextContent("Preferences");
    expect(settingsPage).toHaveTextContent("Information");
    expect(settingsPage).toHaveTextContent("Security");
    expect(settingsPage).toHaveTextContent("Danger Zone");
  });
});
