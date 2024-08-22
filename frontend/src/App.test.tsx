import { getByTestId } from "@/tests/utils";
import { describe, expect, test } from "vitest";

import { render, waitFor } from "@testing-library/react";
import { sleep } from "jkscript";
import { App } from "./App";

describe.concurrent("App", () => {
  const getElements = (
    container: HTMLElement,
  ): { appLayout: HTMLDivElement } => ({
    appLayout: getByTestId(container, "app-layout"),
  });

  test("should render", async () => {
    // Uses the original "render" func
    const { container } = render(<App />);
    await sleep(100);

    await waitFor(() => {
      const { appLayout } = getElements(container);
      expect(appLayout).toBeVisible();
    });
  });
});
