import {
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@services/firebase/firebaseConfig";
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
      // Query the "cart" collection to find the document with productId field equal to the provided productId
      const q = query(
        collection(db, "cart"),
        where("productId", "==", productId),
      );
      const querySnapshot = await getDocs(q);

      // Check if the document exists
      if (!querySnapshot.empty) {
        // If the document exists, get the document reference
        const docRef = querySnapshot.docs[0].ref;
        const currentQuantity = querySnapshot.docs[0].data().quantity;
        if (operation === DecreaseQuantityEnum.REMOVE || currentQuantity <= 1) {
          await deleteDoc(docRef);
        } else {
          // If the quantity is greater than 1, decrease the quantity by 1
          await updateDoc(docRef, { quantity: currentQuantity - 1 });
        }

        return productId;
      } else {
        throw new Error("Product not found in the cart");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
