import { vi } from "vitest";

/* react-router-dom */
export const mockUseBreakpoint = vi.fn(() => ({}));
export const mockNavigate = vi.fn();
export const mockLocation = vi.fn(() => ({
  pathname: "/",
  search: "",
  hash: "",
  state: null,
  key: "",
}));

export const registerGlobalMocks = () => {
  // React Router
  vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal<typeof import("react-router-dom")>();
    return {
      ...mod,
      useNavigate: () => mockNavigate,
      useLocation: mockLocation,
    };
  });
  // Antd
  vi.mock("antd", async (importOriginal) => {
    const mod = await importOriginal<typeof import("antd")>();
    return {
      ...mod,
      Grid: {
        ...mod.Grid,
        useBreakpoint: mockUseBreakpoint,
      },
    };
  });
  // matchMedia
  global.matchMedia =
    global.matchMedia ||
    (() => ({
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
};
