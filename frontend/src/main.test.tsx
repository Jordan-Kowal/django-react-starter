import { describe, expect, test } from "vitest";

import { render, waitFor } from "@testing-library/react";
import { sleep } from "jkscript";

describe.concurrent("main", () => {
  test("should render", async () => {
    render(<div id="root" />);

    // div should be empty
    await waitFor(() => {
      const app = window.document.getElementById("root") as HTMLDivElement;
      expect(app).toBeVisible();
      expect(app.innerHTML).toBe("");
    });

    await import("./main");

    await sleep(100);

    // App should have been rendered in the div
    await waitFor(() => {
      const app = window.document.getElementById("root") as HTMLDivElement;
      expect(app).toBeVisible();
      expect(app.innerHTML).not.toBe("");
    });
  });
});
