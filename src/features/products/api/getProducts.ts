import { QuerySnapshot, collection, getDocs } from "@firebase/firestore";
import { db } from "@services/firebase/firebaseConfig";

export const getProducts = async (q = collection(db, "products")) => {
  const querySnapshot: QuerySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => doc.data());
  return products;
};
