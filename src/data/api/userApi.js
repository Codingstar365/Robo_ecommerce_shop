import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // ✅ Ensure db is imported

export const createUserProfile = async (userData) => {
  await setDoc(doc(db, "users", auth.currentUser.uid), userData);
};

// 🔹 Read user profile
export const getUserProfile = async () => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  const firestoreData = docSnap.exists() ? docSnap.data() : {};
  const user = auth.currentUser;

  return {
    ...firestoreData,
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    name: firestoreData.name || user?.displayName || "User",
  };
};

export const updateUserProfile = async (updatedData) => {
  const userRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userRef, updatedData);
};

export const deleteUserProfile = async () => {
  await deleteDoc(doc(db, "users", auth.currentUser.uid));
};
