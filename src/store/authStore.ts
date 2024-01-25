import { create } from "zustand";

type AuthStore = {
  token?: string;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token") ?? undefined,
  login: (token: string) => {
    localStorage.setItem("token", token);
    set(() => ({ token }));
  },
  logout: () => {
    localStorage.removeItem("token");
    set(() => ({ token: undefined }));
  },
}));
