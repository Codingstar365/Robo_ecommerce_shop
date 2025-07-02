import { create } from "zustand";

// Load cart from localStorage
const storedCart = localStorage.getItem("cartItems");
const initialCart = storedCart ? JSON.parse(storedCart) : [];

const syncToLocalStorage = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
};

const useCartStore = create((set) => ({
  cartItems: initialCart,

  // ✅ Add item (or increment if exists)
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
      return { cartItems: updatedCart };
    }),

  // ✅ Increment quantity
  incrementQty: (id) =>
    set((state) => {
      const updatedCart = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      syncToLocalStorage(updatedCart);
      return { cartItems: updatedCart };
    }),

  // ✅ Decrement quantity or remove if zero
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
}));

export default useCartStore;
