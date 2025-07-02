import { create } from 'zustand';
import { signup, login, logout } from '../api/authApi'; // ✅ Added logout import

const useAuthStore = create((set) => ({
  error: null,
  loading: false,

  // ✅ Signup
  singupwithemail: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signup(email, password);
      set({ loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  // ✅ Login
  loginWithEmail: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await login(email, password);
      set({ loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  // ✅ Logout
  logoutUser: async () => {
    set({ loading: true });
    try {
      logout(); // Firebase sign-out
      // You can also clear `user` here if tracking
    } catch (e) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  }
}));

export { useAuthStore };
