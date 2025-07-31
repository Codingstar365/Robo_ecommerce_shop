import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

// 🔹 Full 4-step flow
const initialStatusFlow = [
  { step: "Pending", completed: true, timestamp: new Date().toISOString() },
  { step: "Processing Order", completed: false, timestamp: null },
  { step: "Dispatched", completed: false, timestamp: null },
  { step: "Delivered", completed: false, timestamp: null },
];

// 🔹 Create new order
export const placeOrderDetails = async (orderData) => {
  const createdAt = new Date().toISOString();

  // 1️⃣ Add order in orders collection
  const docRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    createdAt,
    currentStatus: "Pending",
    pending: true,
    processingOrder: false,
    productDispatched: false,
    productDelivered: false,
    statusHistory: [{ status: "Pending", timestamp: createdAt }],
    statusFlow: initialStatusFlow,
  });

  // 2️⃣ Store only required fields in orderHistory collection
  await addDoc(collection(db, "orderHistory"), {
    orderId: docRef.id,
    createdAt,
    totalAmount: orderData.totalAmount || 0,
    userId: orderData.userId || null,
  });

  // 3️⃣ Update total revenue (single doc approach)
  const revenueDocRef = doc(db, "revenue", "totalRevenue"); // fixed document name

  const revenueSnap = await getDoc(revenueDocRef);
  if (revenueSnap.exists()) {
    // If doc exists → add new amount to previous total
    const prevAmount = revenueSnap.data().totalAmount || 0;
    await updateDoc(revenueDocRef, {
      totalAmount: prevAmount + (orderData.totalAmount || 0),
      lastUpdated: createdAt,
    });
  } else {
    // If doc doesn't exist → create new with this amount
    await setDoc(revenueDocRef, {
      totalAmount: orderData.totalAmount || 0,
      lastUpdated: createdAt,
    });
  }

  return docRef.id;
};

// 🔹 Get all orders for a user
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

// 🔹 Update order status and history
export const updateOrderStatus = async (orderId, newStatus) => {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error("Order not found");

  const data = docSnap.data();
  const timestamp = new Date().toISOString();

  const statusFlags = {
    pending: false,
    processingOrder: false,
    productDispatched: false,
    productDelivered: false,
  };

  if (newStatus === "Pending") statusFlags.pending = true;
  if (newStatus === "Processing Order") statusFlags.processingOrder = true;
  if (newStatus === "Dispatched") statusFlags.productDispatched = true;
  if (newStatus === "Delivered") statusFlags.productDelivered = true;

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

// 🔹 Get all orders with user data (admin)
export const getAllOrdersWithUserDetails = async () => {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const ordersSnap = await getDocs(q);
  const orders = [];

  for (const docItem of ordersSnap.docs) {
    const order = { id: docItem.id, ...docItem.data() };

    if (order.userId) {
      const userDoc = await getDoc(doc(db, "users", order.userId));
      const userData = userDoc.exists() ? userDoc.data() : {};
      order.userName = userData.name || "Unknown";
      order.userAddress = userData.address || "No address";
    }

    orders.push(order);
  }

  return orders;
};
