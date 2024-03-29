import { CategoryEnum } from "@features/filters/lib/types";
import {
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@services/firebase/firebaseConfig";

export const getProductsByCategory = createAsyncThunk(
  "products/getByCategory",
  async (category: CategoryEnum) => {
    try {
      const q = query(
        collection(db, "products"),
        where("category", "==", category),
      );
      const querySnapshot: QuerySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => doc.data());
      return products;
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
