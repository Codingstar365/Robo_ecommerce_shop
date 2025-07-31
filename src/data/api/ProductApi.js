import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';

// ✅ Generate new Product ID like Item0001
export const generateNewProductId = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  let maxIdNumber = 0;

  querySnapshot.forEach((doc) => {
    const product = doc.data();
    const match = product.id?.match(/^Item(\d{4})$/);
    if (match) {
      const number = parseInt(match[1]);
      if (number > maxIdNumber) {
        maxIdNumber = number;
      }
    }
  });

  const newIdNumber = (maxIdNumber + 1).toString().padStart(4, '0');
  return `Item${newIdNumber}`;
};

// ✅ Add product with generated ID
export const addProductToFirestoreWithId = async (product) => {
  const newId = await generateNewProductId();
  const productWithId = { ...product, id: newId };

  const docRef = doc(db, 'products', newId);
  await setDoc(docRef, productWithId);

  return { id: newId, ...productWithId };
};

// ✅ Get all products
export const getAllProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

// ✅ Get all users
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
};

// ✅ Add a new category
export const addCategoryToFirestore = async (categoryName) => {
  const q = query(collection(db, 'categories'), where('name', '==', categoryName));
  const existing = await getDocs(q);
  if (!existing.empty) return;

  const docRef = await addDoc(collection(db, 'categories'), { name: categoryName });
  return docRef.id;
};

// ✅ Add a subcategory to a category (as subcollection)
export const addSubcategoryToFirestore = async (categoryName, subcategoryName) => {
  const q = query(collection(db, 'categories'), where('name', '==', categoryName));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const categoryDoc = querySnapshot.docs[0];
    const subRef = collection(categoryDoc.ref, 'subcategories');

    // Check for existing subcategory
    const subQuery = query(subRef, where('name', '==', subcategoryName));
    const existing = await getDocs(subQuery);
    if (!existing.empty) return;

    await addDoc(subRef, { name: subcategoryName });
  }
};

// ✅ Get all categories with their subcategories
export const getAllCategoriesWithSubcategories = async () => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  const categories = [];

  for (const docSnap of querySnapshot.docs) {
    const name = docSnap.data().name;
    const subSnapshot = await getDocs(collection(docSnap.ref, 'subcategories'));
    const subcategories = subSnapshot.docs.map((sub) => sub.data().name);
    categories.push({ name, subcategories });
  }

  return categories;
};
