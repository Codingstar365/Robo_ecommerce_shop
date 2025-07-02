
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  getDoc
} from "firebase/firestore";

// 🔹 1. Place Order
export const placeOrder = async (orderData) => {
  const ref = await addDoc(collection(db, "orders"), {
    ...orderData,
    status: "confirmed",
    createdAt: Date.now(),
    rated: false,
    rating: 0
  });
  return ref.id;
};

// 🔹 2. Get All Orders for a User
export const getUserOrders = async (userId) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 🔹 3. Get All Orders for a Merchant
export const getMerchantOrders = async (merchantId) => {
  const q = query(collection(db, "orders"), where("merchantId", "==", merchantId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 🔹 4. Get Single Order by ID
export const getOrderById = async (orderId) => {
  const orderRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(orderRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  throw new Error("Order not found");
};

// 🔹 5. Update Order Status
export const updateOrderStatus = async (orderId, status) => {
  await updateDoc(doc(db, "orders", orderId), { status });
};

// 🔹 6. Rate Order
export const rateOrder = async (orderId, rating) => {
  await updateDoc(doc(db, "orders", orderId), {
    rated: true,
    rating
  });
};
