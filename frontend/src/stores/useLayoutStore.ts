import { type StoreApi, type UseBoundStore, create } from "zustand";

type LayoutStoreState = {
  // ========== State ==========
  showLayout: boolean;
  siderCollapsed: boolean;
  // ========== Actions ==========
  setShowLayout: (showLayout: boolean) => void;
  toggleSider: () => void;
  setSiderCollapsed: (siderCollapsed: boolean) => void;
};

export const useLayoutStore: UseBoundStore<StoreApi<LayoutStoreState>> = create(
  (set) => ({
    // ========== State ==========
    showLayout: false,
    siderCollapsed: false,

    // ========== Actions ==========
    setShowLayout: (showLayout) => set({ showLayout }),
    toggleSider: () => {
      set((state) => ({ siderCollapsed: !state.siderCollapsed }));
    },
    setSiderCollapsed: (siderCollapsed) => set({ siderCollapsed }),
  }),
);
