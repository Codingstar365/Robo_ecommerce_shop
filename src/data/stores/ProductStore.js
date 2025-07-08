import { create } from 'zustand';
import {
  getAllProducts,
  addProductToFirestoreWithId,
  getAllCategoriesWithSubcategories, // ✅ correct import
  addCategoryToFirestore,
  addSubcategoryToFirestore,
} from '../api/ProductApi';

const useProductStore = create((set) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const arr = await getAllProducts();
      set({ products: arr, loading: false });
    } catch (e) {
      console.error(e);
      set({ loading: false, error: e.message });
    }
  },

  fetchCategories: async () => {
    try {
      const arr = await getAllCategoriesWithSubcategories(); // ✅ fix here
      set({ categories: arr });
    } catch (e) {
      console.error(e);
      set({ error: e.message });
    }
  },

  addProduct: async (...items) => {
    set({ loading: true, error: null });
    try {
      const newArr = [];
      for (const it of items) {
        const added = await addProductToFirestoreWithId(it);
        newArr.push(added);
      }
      set((state) => ({
        products: [...state.products, ...newArr],
        loading: false,
      }));
    } catch (e) {
      console.error(e);
      set({ loading: false, error: e.message });
    }
  },

  addCategory: async (name) => {
    try {
      await addCategoryToFirestore(name);
      await useProductStore.getState().fetchCategories();
    } catch (e) {
      console.error(e);
    }
  },

  addSubcategory: async (category, sub) => {
    try {
      await addSubcategoryToFirestore(category, sub);
      await useProductStore.getState().fetchCategories();
    } catch (e) {
      console.error(e);
    }
  },
}));

export default useProductStore;
