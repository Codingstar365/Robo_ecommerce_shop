// src/data/stores/userStore.js
import { create } from "zustand";
import { getAuth, onAuthStateChanged, updateEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  createUserProfile,
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

const userStore = create((set, get) => ({
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

  // Create user profile
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

  // Fetch user from Firestore
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const profile = { uid: user.uid, ...userDoc.data() };
        const serializedProfile = serializeTimestamps(profile);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedProfile));
        set({ data: serializedProfile, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  // Update user Firestore + email + local store
  updateUser: async (newData) => {
    set({ loading: true, error: null });
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);

      // Update Firestore
      await updateDoc(userRef, {
        name: newData.name,
        address: newData.address,
        email: newData.email,
      });

      // Update Firebase Auth email if changed
      if (newData.email && newData.email !== user.email) {
        await updateEmail(user, newData.email);
      }

      // ✅ Fetch fresh data after update
      await get().fetchUser();
    } catch (error) {
      console.error("Update Error:", error);
      set({ error: error.message, loading: false });
    }
  },

  // Delete user
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
