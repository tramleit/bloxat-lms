import { create } from "zustand";

const useTokenStore = create((set) => ({
  token: JSON.parse(localStorage.getItem("bxAuthToken")) || null,

  setToken: (token) => {
    set({ token });
    localStorage.setItem("bxAuthToken", JSON.stringify(token));
  },

  clearToken: () => {
    set({ token: null });
    localStorage.removeItem("bxAuthToken");
  },
}));

export default useTokenStore;
