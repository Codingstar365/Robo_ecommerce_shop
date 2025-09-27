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
          set({ user: newUser, loading: false });
          return newUser;
        } catch (e) {
          set({ error: e.message, loading: false });
          throw e;
        }
      },

    loginWithEmail: async (email, password) => {
  set({ loading: true, error: null });
  try {
    const loggedInUser = await login(email, password);
    set({ user: loggedInUser, loading: false });
    return loggedInUser; // ✅ Return user if success
  } catch (e) {
    set({ error: e.message, loading: false });
    throw e; // ✅ re-throw so component knows login failed
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
      name: "auth-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ user: state.user }), // ✅ persist only user
    }
  )
);
