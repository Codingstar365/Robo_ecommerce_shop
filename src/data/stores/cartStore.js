// src/data/stores/cartStore.js
import { create } from "zustand";
import { auth } from "../../firebase";

// ✅ Load from localStorage
const storedCart = localStorage.getItem("cartItems");
const initialCart = storedCart ? JSON.parse(storedCart) : [];

const syncToLocalStorage = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
};

const useCartStore = create((set, get) => ({
  cartItems: initialCart,
  buyNowItem: null,

  // ✅ Add product to cart for the logged-in user only
  addToCart: (product) => {
    const currentUserId = auth.currentUser?.uid || null;
    if (!currentUserId) return; // Prevent adding if not logged in

    const existingItem = get().cartItems.find(
      (item) => item.id === product.id && item.userId === currentUserId
    );

    let updatedCart;
    if (existingItem) {
      updatedCart = get().cartItems.map((item) =>
        item.id === product.id && item.userId === currentUserId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...get().cartItems,
        { ...product, quantity: 1, userId: currentUserId },
      ];
    }

    syncToLocalStorage(updatedCart);
    set({ cartItems: updatedCart, buyNowItem: null });
  },

  // ✅ Increment for the current user only
  incrementQty: (id) => {
    const currentUserId = auth.currentUser?.uid;
    const updatedCart = get().cartItems.map((item) =>
      item.id === id && item.userId === currentUserId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    syncToLocalStorage(updatedCart);
    set({ cartItems: updatedCart });
  },

  // ✅ Decrement for the current user only
  decrementQty: (id) => {
    const currentUserId = auth.currentUser?.uid;
    const updatedCart = get()
      .cartItems.map((item) =>
        item.id === id && item.userId === currentUserId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    syncToLocalStorage(updatedCart);
    set({ cartItems: updatedCart });
  },

  // ✅ Buy Now item
  setBuyNowItem: (item) => set({ buyNowItem: { ...item, quantity: 1 } }),

  // ✅ Clear Buy Now item (only for current user)
  clearBuyNowItem: () => {
    const currentUserId = auth.currentUser?.uid;
    const updatedCart = get().cartItems.filter(
      (item) => item.userId !== currentUserId
    );
    syncToLocalStorage(updatedCart);
    set({ cartItems: updatedCart, buyNowItem: null });
  },
}));

export default useCartStore;
