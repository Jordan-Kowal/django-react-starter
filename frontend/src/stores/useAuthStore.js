import { apiCall } from "@/services/api";
import { isMissingOrEmptyObject } from "jkscript";
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  // ========== State ==========
  user: null,
  hasFetchedUserOnce: false,

  // ========== Computed ==========
  isAuthenticated: () => !isMissingOrEmptyObject(get().user),

  // ========== Actions ==========
  checkAuth: () => {
    apiCall("auth", "check").catch(() => set({ user: null }));
  },

  fetchUser: async () => {
    let user;
    try {
      user = await apiCall("currentUser", "getCurrentUser");
    } finally {
      set({ hasFetchedUserOnce: true, user });
    }
  },

  login: async ({ email, password }) => {
    await apiCall("auth", "login", { email, password });
    await get().fetchUser();
  },

  logout: async () => {
    await apiCall("auth", "logout");
    set({ user: null });
  },
}));

export default useAuthStore;
