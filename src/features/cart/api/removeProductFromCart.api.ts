import {
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "@services/firebase/firebaseConfig";
import { DecreaseQuantityEnum } from "@features/cart/lib/types";

type removeProductFromCartProps = {
  productId: string;
  operation?: DecreaseQuantityEnum;
};

export const removeProductFromCart = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({
    productId,
    operation = DecreaseQuantityEnum.DECREASE,
  }: removeProductFromCartProps) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userCartCollectionRef = collection(db, `users/${user.uid}/cart`);

        // Query the user's cart collection to find the document with productId field equal to the provided productId
        const q = query(
          userCartCollectionRef,
          where("productId", "==", productId),
        );
        const querySnapshot = await getDocs(q);

        // Check if the document exists
        if (!querySnapshot.empty) {
          // If the document exists, get the document reference
          const docRef = querySnapshot.docs[0].ref;
          const currentQuantity = querySnapshot.docs[0].data().quantity;
          if (
            operation === DecreaseQuantityEnum.REMOVE ||
            currentQuantity <= 1
          ) {
            await deleteDoc(docRef);
          } else {
            // If the quantity is greater than 1, decrease the quantity by 1
            await updateDoc(docRef, { quantity: currentQuantity - 1 });
          }

          // Fetch the document again to get the updated quantity
          const updatedDoc = await getDoc(docRef);
          const updatedQuantity = updatedDoc.data()?.quantity || 0;
          return updatedQuantity;
        } else {
          throw new Error("Product not found in the cart");
        }
      }
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
