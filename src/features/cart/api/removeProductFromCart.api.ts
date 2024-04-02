import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@services/firebase/firebaseConfig";

export const removeProductFromCart = createAsyncThunk(
  "cart/remove",
  async (productId: string) => {
    try {
      // Query the "cart" collection to find the document with productId field equal to the provided productId
      const q = query(
        collection(db, "cart"),
        where("productId", "==", productId),
      );
      const querySnapshot = await getDocs(q);

      // Check if the document exists
      if (!querySnapshot.empty) {
        // If the document exists, delete it
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(docToDelete.ref);
        return productId;
      } else {
        throw new Error("Document not found");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
