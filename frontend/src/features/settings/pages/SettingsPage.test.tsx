import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import SettingsPage from "./SettingsPage";

describe.concurrent("SettingsPage", () => {
  test("should render the settings page with all sections", async ({
    expect,
  }) => {
    const { container } = render(<SettingsPage />);
    const settingsPage = getByTestId<HTMLDivElement>(
      container,
      "settings-page",
    );

    await waitFor(() => {
      expect(settingsPage).toBeVisible();
    });

    expect(settingsPage).toHaveTextContent("Django React Starter");
    expect(settingsPage).toHaveTextContent("Preferences");
    expect(settingsPage).toHaveTextContent("Information");
    expect(settingsPage).toHaveTextContent("Security");
    expect(settingsPage).toHaveTextContent("Danger Zone");
  });
});
