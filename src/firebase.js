          // src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 
const firebaseConfig = {
 apiKey: "AIzaSyA4NpXxuDuN_KPeZ0kpAeKrey1JfJTrHY8",
  authDomain: "tokengenerator-85ccb.firebaseapp.com",
  projectId: "tokengenerator-85ccb",
  storageBucket: "tokengenerator-85ccb.appspot.com",
  messagingSenderId: "545985494948",
  appId: "1:545985494948:web:017887950cf2c1f32bcb31",
  measurementId: "G-KE9LC805BX" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ✅ initialize auth
 const storage = getStorage(app);
export { db, auth ,storage};
