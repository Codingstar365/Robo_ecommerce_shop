import { create } from "zustand";

const storedCart = localStorage.getItem("cartItems");
const initialCart = storedCart ? JSON.parse(storedCart) : [];

const syncToLocalStorage = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
};

const useCartStore = create((set) => ({
  cartItems: initialCart,
  buyNowItem: null,

  addToCart: (product) =>
    set((state) => {
      const updatedCart = [...state.cartItems];
      const existingIndex = updatedCart.findIndex((item) => item.id === product.id);
      if (existingIndex !== -1) {
        updatedCart[existingIndex].quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }
      syncToLocalStorage(updatedCart);
      return { cartItems: updatedCart, buyNowItem: null };
    }),

  incrementQty: (id) =>
    set((state) => {
      const updatedCart = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      syncToLocalStorage(updatedCart);
      return { cartItems: updatedCart };
    }),

  decrementQty: (id) =>
    set((state) => {
      const updatedCart = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      syncToLocalStorage(updatedCart);
      return { cartItems: updatedCart };
    }),

  setBuyNowItem: (item) => set({ buyNowItem: { ...item, quantity: 1 } }),
  clearBuyNowItem: () => set({ buyNowItem: null }),

  // ✅ Function to clear all cart items
  clearCart: () =>
    set(() => {
      syncToLocalStorage([]);
      return { cartItems: [] };
    }),
}));

export default useCartStore;
