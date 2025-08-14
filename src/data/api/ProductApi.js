import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db,storage } from '../../firebase';

export const saveImagetoDatabaseAndGetUrl = async (file) => {
  try {
    const storage = getStorage();
    const fileName = `${uuidv4()}-${file.name || "image"}`;
    const storageRef = ref(storage, `images/${fileName}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("✅ File uploaded. Download URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    throw error;
  }
};
// ✅ Generate new Product ID like Item0001
export const generateNewProductId = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  let maxIdNumber = 0;

  querySnapshot.forEach((docSnap) => {
    const product = docSnap.data();
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
  querySnapshot.forEach((docSnap) => {
    products.push({ id: docSnap.id, ...docSnap.data() });
  });
  return products;
};

// ✅ Get all users
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users = [];
  querySnapshot.forEach((docSnap) => {
    users.push({ id: docSnap.id, ...docSnap.data() });
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

// ✅ Update category name in Firestore & products
export const updateCategoryInFirestore = async (oldName, newName) => {
  // Update category doc
  const q = query(collection(db, 'categories'), where('name', '==', oldName));
  const snap = await getDocs(q);

  if (!snap.empty) {
    const catDoc = snap.docs[0];
    await updateDoc(catDoc.ref, { name: newName });
  }

  // Update products with that category
  const prodQ = query(collection(db, 'products'), where('category', '==', oldName));
  const prodSnap = await getDocs(prodQ);
  for (const prod of prodSnap.docs) {
    await updateDoc(prod.ref, { category: newName });
  }
};

// ✅ Delete category from Firestore & remove from products
export const deleteCategoryFromFirestore = async (name) => {
  // Find category doc
  const q = query(collection(db, 'categories'), where('name', '==', name));
  const snap = await getDocs(q);

  if (!snap.empty) {
    const catDoc = snap.docs[0];

    // Delete subcategories
    const subSnap = await getDocs(collection(catDoc.ref, 'subcategories'));
    for (const sub of subSnap.docs) {
      await deleteDoc(sub.ref);
    }

    // Delete category doc
    await deleteDoc(catDoc.ref);
  }

  // Remove category from products (set to empty)
  const prodQ = query(collection(db, 'products'), where('category', '==', name));
  const prodSnap = await getDocs(prodQ);
  for (const prod of prodSnap.docs) {
    await updateDoc(prod.ref, { category: '' });
  }
};

// ✅ Update subcategory name in Firestore & products
export const updateSubcategoryInFirestore = async (categoryName, oldSub, newSub) => {
  const q = query(collection(db, 'categories'), where('name', '==', categoryName));
  const snap = await getDocs(q);

  if (!snap.empty) {
    const catDoc = snap.docs[0];
    const subQ = query(collection(catDoc.ref, 'subcategories'), where('name', '==', oldSub));
    const subSnap = await getDocs(subQ);
    if (!subSnap.empty) {
      const subDoc = subSnap.docs[0];
      await updateDoc(subDoc.ref, { name: newSub });
    }
  }

  // Update in products
  const prodQ = query(
    collection(db, 'products'),
    where('category', '==', categoryName),
    where('subcategory', '==', oldSub)
  );
  const prodSnap = await getDocs(prodQ);
  for (const prod of prodSnap.docs) {
    await updateDoc(prod.ref, { subcategory: newSub });
  }
};

// ✅ Delete subcategory in Firestore & products
export const deleteSubcategoryFromFirestore = async (categoryName, subName) => {
  const q = query(collection(db, 'categories'), where('name', '==', categoryName));
  const snap = await getDocs(q);

  if (!snap.empty) {
    const catDoc = snap.docs[0];
    const subQ = query(collection(catDoc.ref, 'subcategories'), where('name', '==', subName));
    const subSnap = await getDocs(subQ);
    if (!subSnap.empty) {
      const subDoc = subSnap.docs[0];
      await deleteDoc(subDoc.ref);
    }
  }

  // Remove from products
  const prodQ = query(
    collection(db, 'products'),
    where('category', '==', categoryName),
    where('subcategory', '==', subName)
  );
  const prodSnap = await getDocs(prodQ);
  for (const prod of prodSnap.docs) {
    await updateDoc(prod.ref, { subcategory: '' });
  }
};
