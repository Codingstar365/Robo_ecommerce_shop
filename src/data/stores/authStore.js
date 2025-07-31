// src/data/stores/authStore.js
import { create } from "zustand";
import { signup, login, logout } from "../api/authApi";

export const useAuthStore = create((set) => ({
  user: null, // ✅ store current logged-in user
  error: null,
  loading: false,

  // ✅ Set user manually (used when Firebase Auth state changes)
  setUser: (user) => set({ user }),

  // ✅ Signup with email/password + name
  singupwithemail: async (email, password, name) => {
    set({ loading: true, error: null });
    try {
      const newUser = await signup(email, password, name);
      set({ user: newUser, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  // ✅ Login with email/password
  loginWithEmail: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const loggedInUser = await login(email, password);
      set({ user: loggedInUser, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  // ✅ Logout user
  logoutUser: async () => {
    set({ loading: true });
    try {
      await logout();
      set({ user: null }); // Clear Zustand user
    } catch (e) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
}));
