import { create } from 'zustand';

const useLayoutStore = create((set, get) => ({
  // ========== State ==========
  showLayout: false,
  siderCollapsed: false,

  // ========== Actions ==========
  setShowLayout: (showLayout) => set({ showLayout }),

  toggleSider: () =>
    set((state) => ({ siderCollapsed: !state.siderCollapsed })),

  setSiderCollapsed: (siderCollapsed) => set({ siderCollapsed }),

  collapseSider: () => set({ siderCollapsed: true }),
}));

export default useLayoutStore;
