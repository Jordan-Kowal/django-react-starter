import * as useCurrentRoute from "@/hooks/useCurrentRoute";
import { render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { routeConfig } from "../routeConfig";
import { HelmetMetaData } from "./index";

describe.concurrent("routes/HelmetMetaData", () => {
  const getElements = (): {
    title: string;
    description: string;
    lang: string;
  } => ({
    title: window.document.title,
    description:
      window.document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content") || "",
    lang: window.document.querySelector("html")?.getAttribute("lang") || "",
  });

  test.sequential(
    "should set the default attributes if no route",
    async ({ expect }) => {
      vi.spyOn(useCurrentRoute, "useCurrentRoute").mockImplementationOnce(
        () => undefined,
      );
      render(<HelmetMetaData />);

      await waitFor(() => {
        const { title, description, lang } = getElements();
        expect(title).toBe("Django React Starter");
        expect(description).toBe("Django React Starter");
        expect(lang).toBe("fr");
      });
    },
  );

  test.sequential(
    "should set the title and description based off the route",
    async ({ expect }) => {
      vi.spyOn(useCurrentRoute, "useCurrentRoute").mockImplementationOnce(
        () => routeConfig.profile,
      );
      render(<HelmetMetaData />);

      await waitFor(() => {
        const { title, description, lang } = getElements();
        expect(title).toBe("Profil");
        expect(description).toBe("Modifiez vos informations personnelles");
        expect(lang).toBe("fr");
      });
    },
  );
});
