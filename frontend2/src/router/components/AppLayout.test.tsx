import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { AppLayout } from "./AppLayout";

describe("AppLayout", () => {
  test("should render", async () => {
    const { container } = render(
      <AppLayout>
        <div>Content</div>
      </AppLayout>,
    );

    const appLayout = getByTestId<HTMLDivElement>(container, "app-layout");

    await waitFor(() => {
      expect(appLayout).toBeVisible();
      expect(appLayout).toHaveTextContent("Content");
    });
  });
});
