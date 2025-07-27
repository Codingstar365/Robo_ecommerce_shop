// src/data/api/authApi.js

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const signup = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // ✅ Update displayName
  await updateProfile(auth.currentUser, {
    displayName: name,
  });

  // ✅ Save user info in Firestore
  await setDoc(doc(db, "users", auth.currentUser.uid), {
    uid: auth.currentUser.uid,
    email,
    name,
    createdAt: new Date().toISOString(),
  });

  return userCredential;
};

const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  signOut(auth);
};

export { signup, login, logout };
