import { vi } from "vitest";

export const useRouterStateMock = vi.fn();

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
  // Toastify
  // Wouter
};
