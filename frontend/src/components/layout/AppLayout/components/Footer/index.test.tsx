import { getByTestId, render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { sleep } from "jkscript";
import { describe, test } from "vitest";
import { Footer } from "./index";

describe.concurrent("components/layout/AppLayout/components/Footer", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    footer: HTMLDivElement;
    logo: HTMLImageElement;
  } => ({
    footer: getByTestId<HTMLDivElement>(container, "footer"),
    logo: container.querySelector("img.ant-image-img") as HTMLImageElement,
  });

  test("should correctly render the footer", async ({ expect }) => {
    const { container } = render(<Footer />);

    // Wait for API response
    await sleep(100);

    await waitFor(() => {
      const { footer, logo } = getElements(container);
      expect(footer).toBeVisible();
      expect(footer).toHaveTextContent("Copyright © 2022-");
      expect(footer).toHaveTextContent("JKDev - All Rights Reserved");
      expect(logo).toBeVisible();
    });
  });
});
