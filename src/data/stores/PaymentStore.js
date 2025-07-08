// src/data/stores/paymentStore.js
import { create } from "zustand";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase"; // make sure this path is correct
// import { getAuth } from "firebase/auth"; // temporarily not needed

const usePaymentStore = create((set) => ({
  loading: false,
  error: null,

  savePaymentDetails: async (paymentInfo) => {
    set({ loading: true, error: null });
    try {
    
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const paymentData = {
        ...paymentInfo,
        userId:auth.currentUser.uid, // Or use: null / "test-user"
        createdAt: new Date().toISOString(),
              // ✅ ensure productId is included
         
      };

      await addDoc(collection(db, "payments"), paymentData);
      set({ loading: false });
    } catch (err) {
      console.error("Error saving payment:", err);
      set({ loading: false, error: err.message });
    }
  },
}));

export default usePaymentStore;
