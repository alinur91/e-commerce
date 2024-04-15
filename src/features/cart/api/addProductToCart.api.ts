import { ProductData } from "@features/products/lib/types";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "@services/firebase/firebaseConfig";

export const addProductToCart = createAsyncThunk(
  "cart/add",
  async (product: ProductData) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userCartCollectionRef = collection(db, `users/${user.uid}/cart`);

        // Query the user's cart collection to find the document with productId field equal to the provided productId
        const q = query(
          userCartCollectionRef,
          where("productId", "==", product.productId),
        );
        const querySnapshot = await getDocs(q);

        // Check if the document exists
        if (!querySnapshot.empty) {
          // If the document already exists, update the quantity
          const docToUpdate = querySnapshot.docs[0];
          const currentQuantity = docToUpdate.data().quantity;
          await updateDoc(docToUpdate.ref, { quantity: currentQuantity + 1 });
          return product;
        } else {
          // If the document doesn't exist, add it to the user's cart
          await addDoc(userCartCollectionRef, {
            ...product,
            quantity: 1,
          });
          return product;
        }
      }
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
