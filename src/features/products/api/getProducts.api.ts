import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductData, ProductsData } from "@features/products/lib/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@services/firebase/firebaseConfig";

export const getProducts = createAsyncThunk<ProductsData>(
  "products/getProducts",
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


// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { db } from "@services/firebase/firebaseConfig";
// import {
//   QuerySnapshot,
//   collection,
//   getDocs,
//   query,
//   where,
//   orderBy,
// } from "@firebase/firestore";
// import { CategoryEnum } from "@features/filters/lib/types";

// export const getProducts = createAsyncThunk(
//   "products/getByCategory",
//   async ({
//     category,
//     rating,
//     price,
//     sortBy,
//   }: {
//     category: CategoryEnum;
//     rating: number;
//     price: number;
//     sortBy: "asc" | "desc";
//   }) => {
//     try {
//       let q = collection(db, "products");

//       // Apply category filter
//       if (category) {
//         q = query(q, where("category", "==", category));
//       }

//       // Apply rating filter
//       if (rating) {
//         q = query(q, where("rating", "<=", rating));
//       }

//       // Apply price filter
//       if (price) {
//         q = query(q, where("price", ">=", price));
//       }

//       // Apply sorting
//       if (sortBy) {
//         const order = sortBy === "asc" ? "asc" : "desc";
//         q = query(q, orderBy("price", order));
//       }

//       const querySnapshot: QuerySnapshot = await getDocs(q);
//       const products = querySnapshot.docs.map((doc) => doc.data());
//       return products;
//     } catch (error) {
//       throw new Error(error as string);
//     }
//   },
// );
