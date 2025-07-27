// src/data/stores/authStore.js

import { create } from "zustand";
import { signup, login, logout } from "../api/authApi";

const useAuthStore = create((set) => ({
  error: null,
  loading: false,

  singupwithemail: async (email, password, name) => {
    set({ loading: true, error: null });
    try {
      await signup(email, password, name); // ✅ name passed
      set({ loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  loginWithEmail: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await login(email, password);
      set({ loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  logoutUser: async () => {
    set({ loading: true });
    try {
      logout();
    } catch (e) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export { useAuthStore };
