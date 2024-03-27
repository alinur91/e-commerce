import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductData, ProductsData } from "@features/products/lib/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@services/firebase/firebaseConfig";

export const getProducts = createAsyncThunk<ProductsData>(
  "getProducts",
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData: ProductsData = querySnapshot.docs.map((doc) => {
        const data = doc.data() as ProductData;
        return {
          ...data,
        };
      });
      return productsData;
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
