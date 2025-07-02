// src/api/userApi.js
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../../firebase";

// 🔹 Create user profile in Firestore after signup
export const createUserProfile = async (userData) => {
  await setDoc(doc(db, "users", auth.currentUser.uid), userData);

};

// 🔹 Read user profile
export const getUserProfile = async () => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

// 🔹 Update user profile
export const updateUserProfile = async (updatedData) => {

  const userRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userRef, updatedData);

};

// 🔹 Delete user profile
export const deleteUserProfile = async () => {
  await deleteDoc(doc(db, "users", auth.currentUser.uid));

};
