import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductData } from "@features/products/lib/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@services/firebase/firebaseConfig";

export const getProductById = createAsyncThunk<ProductData, string>(
  "getProductById",
  async (productId) => {
    try {
      const productDocRef = doc(db, "products", productId);
      const productDocSnapshot = await getDoc(productDocRef);

      if (productDocSnapshot.exists()) {
        const productData = productDocSnapshot.data() as ProductData;
        return {
          ...productData,
          // userID: productDocSnapshot.id, // Include the document ID
        };
      } else {
        throw new Error(`Product with ID ${productId} not found.`);
      }
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
