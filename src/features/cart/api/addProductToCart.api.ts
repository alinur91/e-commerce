import { ProductData } from "@features/products/lib/types";
import { addDoc, collection } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@services/firebase/firebaseConfig";

export const addProductToCart = createAsyncThunk(
  "cart/add",
  async (item: ProductData) => {
    try {
      const docRef = await addDoc(collection(db, "cart"), item);
      return docRef.id;
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
