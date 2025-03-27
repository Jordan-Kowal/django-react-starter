import { vi } from "vitest";

export const navigateMock = vi.fn();
export const useLocationMock = vi.fn(() => ["/", navigateMock]);

export const registerGlobalMocks = () => {
  // matchMedia
  global.matchMedia =
    global.matchMedia ||
    ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

  // Wouter
  vi.mock("wouter", () => ({
    useLocation: useLocationMock,
  }));
};
