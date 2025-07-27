
import {doc, setDoc, deleteDoc, getDocs, collection,query,where} from "firebase/firestore";
import {db} from "../../firebase";
// ✅ Add item to wishlist
export const addToWishlist = async (uid, item) => {
  if (!uid || typeof uid !== "string") {
    throw new Error("Invalid user ID.");
  }


  const docRef = doc(db, "wishlist", `${uid}_${item.id}`);
  await setDoc(docRef, {
    ...item,
    uid,
    addedAt: Date.now(),
  });
};
// const docRef = doc(db, "wishlist", `${uid}_${item.id}`);
// await setDoc(docRef,{
//   ...item,
//   uid,
//   addedAt:Date.now(),
// })
// ✅ Remove item from wishlist
export const removeFromWishlist = async (uid, itemId) => {
  const docRef = doc(db, "wishlist", `${uid}_${itemId}`);
  await deleteDoc(docRef);
};
// export const removeFrom =Wishlist = async(uid,itemId)=>{
//   const docRef = doc(db,"wishlist",`${uid}_${itemId}`);
//   await deleteDoc(docRef);
// }
// ✅ Get all wishlist items for user
export const getUserWishlist = async (uid) => {
  const wishlistRef = collection(db, "wishlist");
  const q = query(wishlistRef, where("uid", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
};
// export const getUserWishlist = async (uid)=>{
//   const wishlistRef = collection(db,"wishlist");
//   const q = query(wishlistRef,where("uid","==",uid));
//   const snapShot = await getDocs(q);
//   return snapshot.docs.map((doc)=>{
//     ...doc.data(),
//     docId:doc.id,
//   }));
// };