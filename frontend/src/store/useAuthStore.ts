import create from "zustand";
import { getAccessToken } from "../service/authService";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  fetchTokens: () => Promise<void>;
  isCreator: boolean | null;
  setIsCreator: (bool: boolean) => void;
  storeUserId: number | null;
  setStoreUserID: (storeUserId: number) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isCreator: false,
  storeUserId: null,

  setAccessToken: (token) => {
    set({ accessToken: token });
  },

  setIsCreator: (bool: boolean) => {
    set({ isCreator: bool });
  },

  setStoreUserID: (id: number) => {
    set({ storeUserId: id });
  },

  fetchTokens: async () => {
    try {
      const newAccessToken = await getAccessToken();
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        set({ accessToken: newAccessToken });
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
    }
  },
}));

export default useAuthStore;
