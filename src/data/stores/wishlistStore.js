// src/data/stores/wishlistStore.js
import { create } from "zustand";
import {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
} from "../api/wishlistApi";

const wishlistStore = create((set, get) => ({
  wishlist: [],
  loading: false,

  // ✅ Fetch wishlist items for logged-in user
  fetchWishlist: async (uid) => {
    if (!uid) return;
    set({ loading: true });
    try {
      const items = await getUserWishlist(uid);
      set({ wishlist: items });
    } catch (error) {
      console.error("Fetch Wishlist Error:", error);
    } finally {
      set({ loading: false });
    }
  },
// fetchWishlist:async (uid)=>{
//   if(!uid) return;
//   set({loading:true});
//   try{
//     const items = await getUserWishlist(uid);
//     set({wishlist:items});
//   } catch(error){
//  console.error("Fetch Wishlist Error:", error);
//   }finally{
//     set({loading:false});
//   }
// }
  // ✅ Add item to wishlist
  addItem: async (uid, item) => {
    try {
      await addToWishlist(uid, item);
      set((state) => ({
        wishlist: [...state.wishlist, { ...item, uid }],
      }));
    } catch (error) {
      console.error("Add Wishlist Error:", error);
    }
  },

  // ✅ Remove item from wishlist
  removeItem: async (uid, itemId) => {
    try {
      await removeFromWishlist(uid, itemId);
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== itemId),
      }));
    } catch (error) {
      console.error("Remove Wishlist Error:", error);
    }
  },
}));

export default wishlistStore;
