import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import SettingsPage from "./SettingsPage";

describe("SettingsPage", () => {
  test("should render the settings page", async ({ expect }) => {
    const { container } = render(<SettingsPage />);

    await waitFor(() => {
      const settingsPage = getByTestId<HTMLDivElement>(
        container,
        "settings-page",
      );
      expect(settingsPage).toBeVisible();
      expect(settingsPage).toHaveTextContent("Django React Starter");
    });
  });
});
