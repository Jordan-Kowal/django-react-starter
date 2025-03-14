import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HeroLayout } from "./HeroLayout";

describe("HeroLayout", () => {
  test("should render", async () => {
    const { container } = render(
      <HeroLayout>
        <div>Content</div>
      </HeroLayout>,
    );

    const heroLayout = getByTestId<HTMLDivElement>(container, "hero-layout");

    await waitFor(() => {
      expect(heroLayout).toBeVisible();
      expect(heroLayout).toHaveTextContent("Content");
    });
  });
});
