import create from "zustand";
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
  accessToken: localStorage.getItem("accessToken"),
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
    if (accessToken) {
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(""),
      );
      const decodedToken = JSON.parse(jsonPayload);
      const tokenExpiration = decodedToken.exp;
      const now = Math.floor(Date.now() / 1000);

      if (tokenExpiration < now) {
        accessToken = await getAccessToken();
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          set({ accessToken });
          window.location.reload(); // 새로고침 추가
        } else {
          console.error("Failed to refresh access token");
          return null;
        }
      }
    } else {
      accessToken = await getAccessToken();
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        set({ accessToken });
        window.location.reload(); // 새로고침 추가
      } else {
        console.error("Failed to get access token");
        return null;
      }
    }

    return accessToken;
  },

  setIsCreator: (bool: boolean) => {
    set({ isCreator: bool });
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
