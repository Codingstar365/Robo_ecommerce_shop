import { create } from "zustand";
import {
  placeOrderDetails,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrdersWithUserDetails,
} from "../api/orderApi";

import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

const ORDER_STORAGE_KEY = "user_orders_data";

const useOrderStore = create((set) => ({
  userOrders: JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY)) || [],
  selectedOrder: null,
  loading: false,
  error: null,

  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const orderId = await placeOrderDetails(orderData);
      const user = getAuth().currentUser;

      if (user) {
        const updatedOrders = await useOrderStore
          .getState()
          .fetchOrdersWithUserDetails(user.uid);
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders));
        set({ userOrders: updatedOrders });
      }

      set({ loading: false });
      return orderId;
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  // 🔹 MAIN FUNCTION CALLED FROM COMPONENT
  fetchUserOrders: async () => {
    const user = getAuth().currentUser;
    if (!user) return;

    set({ loading: true, error: null });

    try {
      const tokenResult = await user.getIdTokenResult();
      const isAdmin = tokenResult.claims?.admin || false;

      let orders = [];

      if (isAdmin) {
        orders = await getAllOrdersWithUserDetails();
      } else {
        orders = await useOrderStore.getState().fetchOrdersWithUserDetails(user.uid);
      }

      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
      set({ userOrders: orders, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  fetchOrdersWithUserDetails: async (userId) => {
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const userDoc = await getDoc(doc(db, "users", userId));
    const userData = userDoc.exists() ? userDoc.data() : {};

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      userName: userData.name || "Unknown",
      userAddress: userData.address || "No address",
    }));
  },

  fetchOrderDetails: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const order = await getOrderById(orderId);
      let userInfo = {};

      if (order.userId) {
        const userDoc = await getDoc(doc(db, "users", order.userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          userInfo = {
            userName: userData.name || "Unknown",
            userAddress: userData.address || "No address",
          };
        }
      }

      set({ selectedOrder: { ...order, ...userInfo }, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  changeOrderStatus: async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      set((state) => {
        const updatedOrders = state.userOrders.map((order) =>
          order.id === orderId
            ? { ...order, currentStatus: newStatus }
            : order
        );

        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders));
        return { userOrders: updatedOrders };
      });
    } catch (err) {
      set({ error: err.message });
    }
  },

  clearOrders: () => {
    localStorage.removeItem(ORDER_STORAGE_KEY);
    set({ userOrders: [], selectedOrder: null });
  },
}));

export default useOrderStore;
