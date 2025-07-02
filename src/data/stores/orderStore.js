import { create } from "zustand";
import {
  placeOrder,
  getUserOrders,
  getMerchantOrders,
  updateOrderStatus,
  getOrderById,
  rateOrder
} from "../api/orderApi";

const useOrderStore = create((set) => ({
  userOrders: [],
  merchantOrders: [],
  selectedOrder: null,
  loading: false,
  error: null,
  
  // 🔹 Place a new order
  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const id = await placeOrder(orderData);
      set({ loading: false });
      return id;
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // 🔹 Fetch orders for logged-in user
  fetchUserOrders: async (userId) => {
    set({ loading: true, error: null });
    try {
      const orders = await getUserOrders(userId);
      set({ userOrders: orders, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // 🔹 Fetch orders for logged-in merchant
  fetchMerchantOrders: async (merchantId) => {
    set({ loading: true, error: null });
    try {
      const orders = await getMerchantOrders(merchantId);
      set({ merchantOrders: orders, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // 🔹 Fetch single order details
  fetchOrderDetails: async (orderId) => {
    set({ loading: true });
    try {
      const order = await getOrderById(orderId);
      set({ selectedOrder: order, loading: false });
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // 🔹 Merchant changes order status
  changeOrderStatus: async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      set((state) => ({
        merchantOrders: state.merchantOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  // 🔹 User rates order
  submitRating: async (orderId, rating) => {
    try {
      await rateOrder(orderId, rating);
      set((state) => ({
        userOrders: state.userOrders.map((order) =>
          order.id === orderId ? { ...order, rated: true, rating } : order
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useOrderStore;
