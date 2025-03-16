import { render } from "@/tests/utils";
import { getByTestId, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Main } from "./Main";

describe("Main", () => {
  test("should render", async () => {
    const { container } = render(
      <Main>
        <div>Content</div>
      </Main>,
    );

    const main = getByTestId<HTMLDivElement>(container, "main");

    await waitFor(() => {
      expect(main).toBeVisible();
      expect(main).toHaveTextContent("Content");
    });
  });
});
