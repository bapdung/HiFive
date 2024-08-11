import { create } from "zustand";
import { getAccessToken } from "../service/authService";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  fetchTokens: () => Promise<void>;
  isCreator: boolean | null;
  setIsCreator: (bool: boolean) => void;
  validateAndGetToken: () => Promise<string | null>;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isCreator: false,

  setAccessToken: (token) => {
    set({ accessToken: token });
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  },

  validateAndGetToken: async () => {
    let accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      accessToken = await getAccessToken();
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        set({ accessToken });
      } else {
        return null;
      }
    }
    return accessToken;
  },

  setIsCreator: (bool: boolean) => {
    set({ isCreator: bool });
  },

  fetchTokens: async () => {
    const newAccessToken = await getAccessToken();
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
      set({ accessToken: newAccessToken });
    }
  },
}));

export default useAuthStore;
