import { getByTestId, render } from "@/tests/utils";
import { ReadOutlined } from "@ant-design/icons";
import { waitFor } from "@testing-library/react";
import { describe, test } from "vitest";
import { PageBanner } from "./index";

describe.concurrent("components/layout/PageBanner", () => {
  const getElements = (
    container: HTMLElement,
  ): {
    banner: HTMLDivElement;
    icon: HTMLElement;
  } => ({
    banner: getByTestId<HTMLDivElement>(container, "page-banner"),
    icon: container.querySelector(".anticon.anticon-read") as HTMLElement,
  });

  test("should render the component without icon", async ({ expect }) => {
    const { container } = render(<PageBanner label="Recettes" />);

    await waitFor(() => {
      const { banner, icon } = getElements(container);
      expect(banner).toBeVisible();
      expect(banner).toHaveTextContent("Recette");
      expect(icon).not.toBeInTheDocument();
    });
  });

  test("should render the component with icon", async ({ expect }) => {
    const { container } = render(
      <PageBanner icon={<ReadOutlined />} label="Recette" />,
    );

    await waitFor(() => {
      const { banner, icon } = getElements(container);
      expect(banner).toBeVisible();
      expect(banner).toHaveTextContent("Recette");
      expect(icon).toBeInTheDocument();
    });
  });
});
