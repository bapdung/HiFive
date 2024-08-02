import create from "zustand";
import { getAccessToken } from "../service/authService";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  fetchTokens: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,

  setAccessToken: (token) => {
    set({ accessToken: token });
  },

  fetchTokens: async () => {
    try {
      const newAccessToken = await getAccessToken();
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        set({ accessToken: newAccessToken });
      }
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
    }
  },
}));

export default useAuthStore;
