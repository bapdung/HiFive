import { create } from "zustand";
import Cookie from "js-cookie";
import { getAccessToken } from "../service/authService";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  fetchTokens: () => Promise<void>;
  isCreator: boolean | null;
  setIsCreator: (bool: boolean) => void;
  validateAndGetToken: () => Promise<string | null>;
  logout: (redirect?: boolean) => void; // 리다이렉트 제어를 위한 매개변수 추가
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
    const refreshToken = Cookie.get("refresh_token");

    if (!accessToken && refreshToken) {
      accessToken = await getAccessToken();
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        set({ accessToken });
      } else {
        return null;
      }
    } else if (!accessToken && !refreshToken) {
      // 이미 로그아웃 상태이거나 무한 로그아웃을 방지하기 위해 redirect를 false로 설정
      useAuthStore.getState().logout(false);
      return null;
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

  logout: (redirect = true) => {
    set({ accessToken: null, isCreator: false });
    localStorage.removeItem("accessToken");
    document.cookie = "refresh_token=; path=/; max-age=0;";
    if (redirect) {
      window.location.href = "/"; // 기본적으로 리다이렉트 수행
    }
  },
}));

export default useAuthStore;
