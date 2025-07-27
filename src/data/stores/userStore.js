// src/data/stores/userStore.js
import { create } from "zustand";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../api/userApi";

// Helper to safely serialize Firestore Timestamp
const serializeTimestamps = (obj) => {
  if (!obj || typeof obj !== "object") return obj;
  const newObj = { ...obj };
  for (const key in newObj) {
    const value = newObj[key];
    if (value && value.toDate) {
      newObj[key] = value.toDate().toISOString();
    } else if (typeof value === "object") {
      newObj[key] = serializeTimestamps(value);
    }
  }
  return newObj;
};

const STORAGE_KEY = "user_profile_data";

const userStore = create((set) => ({
  user: null,
  data: JSON.parse(localStorage.getItem(STORAGE_KEY)) || null,
  loading: true,
  error: null,

  // Firebase Auth listener
  initAuthListener: () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const safeUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        set({ user: safeUser, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    });
  },

  setUser: (user) => set({ user }),

  // User profile methods
  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      await createUserProfile(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      set({ data: userData, loading: false });
    } catch (error) {
      console.error("Create Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const profile = await getUserProfile();
      const serializedProfile = serializeTimestamps(profile);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedProfile));
      set({ data: serializedProfile, loading: false });
    } catch (error) {
      console.error("Fetch Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  updateUser: async (updatedData) => {
    set({ loading: true, error: null });
    try {
      await updateUserProfile(updatedData);
      set((state) => {
        const updatedUser = { ...state.data, ...updatedData };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
        return { data: updatedUser, loading: false };
      });
    } catch (error) {
      console.error("Update Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  deleteUser: async () => {
    set({ loading: true, error: null });
    try {
      await deleteUserProfile();
      localStorage.removeItem(STORAGE_KEY);
      set({ data: null, loading: false });
    } catch (error) {
      console.error("Delete Error:", error);
      set({ error: error.message, loading: false });
    }
  },
}));

export default userStore;
