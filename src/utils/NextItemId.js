// src/api/productApi.js
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

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

export const addProductToFirestoreWithId = async (product) => {
  const newId = await generateNewProductId();
  const productWithId = { ...product, id: newId };
  const docRef = await addDoc(collection(db, 'products'), productWithId);
  return { id: docRef.id, ...productWithId };
};
