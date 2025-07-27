// src/data/api/orderApi.js
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

// 🔹 Order Status Flow Template
const initialStatusFlow = [
  { step: "Pending", completed: true, timestamp: new Date().toISOString() },
  { step: "Dispatch", completed: false, timestamp: null },
  { step: "Delivered", completed: false, timestamp: null },
];

// 🔹 Create a new order (with full status flow)
export const placeOrderDetails = async (orderData) => {
  const createdAt = new Date().toISOString();

  const docRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    createdAt,
    currentStatus: "Pending",
    pending: true,
    processingOrder: false,
    qualityCheck: false,
    productDispatched: false,
    productDelivered: false,
    statusHistory: [{ status: "Pending", timestamp: createdAt }],
    statusFlow: initialStatusFlow,
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
export const updateOrderStatus = async (orderId, newStatus) => {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const timestamp = new Date().toISOString();

  const statusFlags = {
    pending: false,
    processingOrder: false,
    qualityCheck: false,
    productDispatched: false,
    productDelivered: false,
  };

  if (newStatus === "Pending") statusFlags.pending = true;
  if (newStatus === "Dispatch") statusFlags.productDispatched = true;
  if (newStatus === "Delivered") statusFlags.productDelivered = true;

  // ✅ Update statusFlow
  const updatedFlow = data.statusFlow.map((step) =>
    step.step === newStatus
      ? { ...step, completed: true, timestamp }
      : step
  );

  await updateDoc(docRef, {
    currentStatus: newStatus,
    ...statusFlags,
    statusHistory: [
      ...data.statusHistory,
      { status: newStatus, timestamp },
    ],
    statusFlow: updatedFlow,
  });
};
