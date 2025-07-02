import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  
} from "firebase/auth";


import { auth } from '../../firebase';

const signup = async (email,password) => {
  await createUserWithEmailAndPassword(auth, email, password);
}

const login = async (email,password) => {
  await signInWithEmailAndPassword(auth,email, password);
}
const logout=()=>{
  signOut(auth);
}


export {signup,login,logout};