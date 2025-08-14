import { create } from "zustand"; // ✅ Import create here
import { persist } from "zustand/middleware";
import { signup, login, logout } from "../api/authApi";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      error: null,
      loading: false,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      signupWithEmail: async (email, password, name) => {
        set({ loading: true, error: null });
        try {
          const newUser = await signup(email, password, name);
          console.log("new User",newUser)
          set({ user: newUser, loading: false });
        } catch (e) {
          set({ error: e.message, loading: false });
        }
      },

      loginWithEmail: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const loggedInUser = await login(email, password);
          set({ user: loggedInUser, loading: false });
        } catch (e) {
          set({ error: e.message, loading: false });
        }
      },

      logoutUser: async () => {
        set({ loading: true });
        try {
          await logout();
          set({ user: null });
        } catch (e) {
          set({ error: e.message });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage", // ✅ Persisted in localStorage
      getStorage: () => localStorage,
    }
  )
);
