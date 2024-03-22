import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductData, ProductsData } from "@features/products/lib/types";
import { db } from "@services/firebase/firebaseConfig";

export const getProducts = createAsyncThunk<ProductsData>(
  "getProducts",
  async () => {
    try {
      const collectionRef = db.collection("products");
      const snapshot = await collectionRef.get();
      const documents: ProductsData = snapshot.docs.map((doc) => {
        const data = doc.data() as ProductData;
        return {
          ...data,
        };
      });
      return documents;
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
