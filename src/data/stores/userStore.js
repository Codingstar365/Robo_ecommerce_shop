// src/store/userStore.js
import { create } from "zustand";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../api/userApi";

const userStore = create((set) => ({
  loading: false,
  error: null,
  data: null,

  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      await createUserProfile(userData);
      set({ data: userData, loading: false });
    } catch (error) {
      console.error("Create Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  // 🔹 Fetch user profile
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const profile = await getUserProfile();
      set({ data: profile, loading: false });
    } catch (error) {
      console.error("Fetch Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  // 🔹 Update user profile
  updateUser: async (updatedData) => {
    set({ loading: true, error: null });
    try {
      await updateUserProfile(updatedData);
      set((state) => ({
        data: { ...state.data, ...updatedData },
        loading: false,
      }));
    } catch (error) {
      console.error("Update Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  // 🔹 Delete user profile
  deleteUser: async () => {
    set({ loading: true, error: null });
    try {
      await deleteUserProfile();
      set({ data: null, loading: false });
    } catch (error) {
      console.error("Delete Error:", error);
      set({ error: error.message, loading: false });
    }
  },
}));

export default userStore;
