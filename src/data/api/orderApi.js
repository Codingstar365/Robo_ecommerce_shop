// ✅ src/data/api/orderApi.js
import { collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

// 🔹 Create a new order
export const placeOrder = async (orderData) => {
  const docRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};

// 🔹 Get orders by user ID
export const getUserOrders = async (userId) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 🔹 Get order by ID
export const getOrderById = async (orderId) => {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Order not found");
  }
};

// 🔹 Update order status
export const updateOrderStatus = async (orderId, status) => {
  const docRef = doc(db, "orders", orderId);
  await updateDoc(docRef, { status });
};
