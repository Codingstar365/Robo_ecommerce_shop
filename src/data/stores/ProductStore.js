import { create } from 'zustand';
import {
  getAllProducts,
  addProductToFirestoreWithId,
  getAllCategoriesWithSubcategories,
  addCategoryToFirestore,
  addSubcategoryToFirestore,
  updateCategoryInFirestore,      // ✅ new
  deleteCategoryFromFirestore,    // ✅ new
  updateSubcategoryInFirestore,   // ✅ new
  deleteSubcategoryFromFirestore,
  saveImagetoDatabaseAndGetUrl, // ✅ new
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
      const arr = await getAllCategoriesWithSubcategories();
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
      let imageUrl = it.image;

      // ✅ Upload to Firebase Storage if file exists
      if (it.imageFile) {
        imageUrl = await saveImagetoDatabaseAndGetUrl(it.imageFile);
      }

      const productData = { ...it, image: imageUrl };
      delete productData.imageFile; // don’t save raw file object

      const added = await addProductToFirestoreWithId(productData);
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

  // ✅ New: Edit Category
  editCategory: async (oldName, newName) => {
    try {
      await updateCategoryInFirestore(oldName, newName);
      await useProductStore.getState().fetchCategories();
    } catch (e) {
      console.error(e);
    }
  },

  // ✅ New: Delete Category
  deleteCategory: async (name) => {
    try {
      await deleteCategoryFromFirestore(name);
      await useProductStore.getState().fetchCategories();
    } catch (e) {
      console.error(e);
    }
  },

  // ✅ New: Edit Subcategory
  editSubcategory: async (categoryName, oldSub, newSub) => {
    try {
      await updateSubcategoryInFirestore(categoryName, oldSub, newSub);
      await useProductStore.getState().fetchCategories();
    } catch (e) {
      console.error(e);
    }
  },

  // ✅ New: Delete Subcategory
  deleteSubcategory: async (categoryName, subName) => {
    try {
      await deleteSubcategoryFromFirestore(categoryName, subName);
      await useProductStore.getState().fetchCategories();
    } catch (e) {
      console.error(e);
    }
  },
}));

export default useProductStore;
