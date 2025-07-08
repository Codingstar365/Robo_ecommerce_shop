// ✅ src/data/stores/orderStore.js
import { create } from "zustand";
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../api/orderApi";

const useOrderStore = create((set) => ({
  userOrders: [],
  selectedOrder: null,
  loading: false,
  error: null,

  // 🔹 Place order
  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const id = await placeOrder(orderData);
      set({ loading: false });
      return id;
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  // 🔹 Fetch all orders for user
  fetchUserOrders: async (userId) => {
    set({ loading: true, error: null });
    try {
      const orders = await getUserOrders(userId);
      set({ userOrders: orders, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  // 🔹 Get single order detail
  fetchOrderDetails: async (orderId) => {
    set({ loading: true });
    try {
      const order = await getOrderById(orderId);
      set({ selectedOrder: order, loading: false });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  // 🔹 Update order status (used by admin)
  changeOrderStatus: async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      set((state) => ({
        userOrders: state.userOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        ),
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

export default useOrderStore;
