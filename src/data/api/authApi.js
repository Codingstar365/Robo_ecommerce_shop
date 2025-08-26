
  import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthStore } from "../stores/authStore"; 


const signup = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  
  await updateProfile(auth.currentUser, {
    displayName: name,
  });

  
  await setDoc(doc(db, "users", auth.currentUser.uid), {
    uid: auth.currentUser.uid,
    email,
    name,
    createdAt: new Date().toISOString(),
  });

  
  const userData = {
    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    displayName: auth.currentUser.displayName,
  };

  useAuthStore.getState().setUser(userData);

  return userData;
};

 
const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  const userData = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    displayName: userCredential.user.displayName,
  };

  
  useAuthStore.getState().setUser(userData);

  return userData;
};

const logout = async () => {
  await signOut(auth);

    
  useAuthStore.getState().clearUser();
};

export { signup, login, logout };
 