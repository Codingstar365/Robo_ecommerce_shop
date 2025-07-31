          // src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeE2R2kdMOCy6w0SZ4kCUa1ZAzwueoy4o",
  authDomain: "difmoproject.firebaseapp.com",
  projectId: "difmoproject",
  storageBucket: "difmoproject.appspot.com", // ✅ fixed typo
  messagingSenderId: "1001181204930",
  appId: "1:1001181204930:web:a1215d2a143e7f738b065b",
  measurementId: "G-5GEQ3FJJ7H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ✅ initialize auth

export { db, auth };
