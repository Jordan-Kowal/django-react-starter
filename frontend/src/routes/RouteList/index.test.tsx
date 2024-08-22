import { getByTestId, render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { routeConfig } from "../routeConfig";
import { RouteList } from "./index";

describe.concurrent("routes/RouteList", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    homepage: HTMLDivElement;
  } => ({
    homepage: getByTestId<HTMLDivElement>(container, "homepage"),
  });

  test("should render the default route", async ({ expect }) => {
    const { container } = render(
      <RouteList
        defaultRoute={routeConfig.home}
        config={{ home: routeConfig.home, profile: routeConfig.profile }}
      />,
    );

    await waitFor(() => {
      const { homepage } = getElements(container);
      expect(homepage).toBeVisible();
      expect(homepage).toHaveTextContent("Homepage");
    });
  });
});
