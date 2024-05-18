import { apiCall } from "@/services/api";
import { isMissingOrEmptyObject } from "jkscript";
import { create } from "zustand";

const useAppConfig = create((set, get) => ({
  // ========== State ==========
  appConfig: null,

  // ========== Computed ==========
  isAppConfigLoaded: () => !isMissingOrEmptyObject(get().appConfig),

  // ========== Actions ==========
  fetchAppConfig: async () => {
    let config = null;
    try {
      config = await apiCall("app", "getConfig");
    } finally {
      set({ appConfig: config });
    }
  },
}));

export default useAppConfig;
