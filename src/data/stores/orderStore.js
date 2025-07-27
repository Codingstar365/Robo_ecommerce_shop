import { create } from "zustand";
import {
  placeOrderDetails,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../api/orderApi";

import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const ORDER_STORAGE_KEY = "user_orders_data";

const useOrderStore = create((set) => ({
  userOrders: JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY)) || [],
  selectedOrder: null,
  loading: false,
  error: null,

  // 🔹 Place order
  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const id = await placeOrderDetails(orderData);
      set({ loading: false });

      // Refetch and store updated orders
      const user = getAuth().currentUser;
      if (user) {
        const updatedOrders = await getUserOrders(user.uid);
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders));
        set({ userOrders: updatedOrders });
      }

      return id;
    } catch (err) {
      console.error("Create Order Error:", err.message);
      set({ loading: false, error: err.message });
    }
  },

  // 🔹 Fetch current user's orders
  fetchUserOrders: async () => {
    const user = getAuth().currentUser;
    if (!user) return;

    set({ loading: true, error: null });
    try {
      const q = query(collection(db, "orders"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(data));
      set({ userOrders: data, loading: false });
    } catch (err) {
      console.error("Fetch Orders Error:", err.message);
      set({ loading: false, error: err.message });
    }
  },

  // 🔹 Fetch single order
  fetchOrderDetails: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const order = await getOrderById(orderId);
      set({ selectedOrder: order, loading: false });
    } catch (err) {
      console.error("Fetch Order Details Error:", err.message);
      set({ loading: false, error: err.message });
    }
  },

  // 🔹 Change status
  changeOrderStatus: async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      set((state) => {
        const updatedOrders = state.userOrders.map((order) =>
          order.id === orderId ? { ...order, currentStatus: status } : order
        );

        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders));
        return { userOrders: updatedOrders };
      });
    } catch (err) {
      console.error("Change Order Status Error:", err.message);
      set({ error: err.message });
    }
  },

  // 🔹 Clear orders from memory and localStorage
  clearOrders: () => {
    localStorage.removeItem(ORDER_STORAGE_KEY);
    set({ userOrders: [], selectedOrder: null });
  },
}));

export default useOrderStore;
