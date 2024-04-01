import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@services/firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  CollectionReference,
  DocumentData,
} from "@firebase/firestore";
import { CategoryEnum, PriceByAscDescEnum } from "@features/filters/lib/types";
import { getProducts } from ".";

export const getFilteredProducts = createAsyncThunk(
  "products/getByCategory",
  async ({
    category,
    rating,
    price,
    sortBy,
  }: {
    category: CategoryEnum;
    rating: number;
    price: number;
    sortBy: PriceByAscDescEnum;
  }) => {
    try {
      let q: CollectionReference<DocumentData> = collection(db, "products");
      // Apply category filter
      if (category !== CategoryEnum.all) {
        q = query(
          q,
          where("category", "==", category.toLocaleLowerCase()),
        ) as CollectionReference<DocumentData>;
      }
      if (category === CategoryEnum.all) {
        q = query(
          q,
          where("category", "!=", "All"),
        ) as CollectionReference<DocumentData>;
      }

      // Apply rating filter
      if (rating) {
        q = query(
          q,
          where("rating", ">=", rating.toString()),
        ) as CollectionReference<DocumentData>;
      }

      // Apply price filter
      if (price) {
        q = query(
          q,
          where("price", "<=", price),
        ) as CollectionReference<DocumentData>;
      }

      // Apply sorting
      if (sortBy) {
        const order = sortBy === PriceByAscDescEnum.ASC ? "asc" : "desc";
        q = query(
          q,
          orderBy("price", order),
        ) as CollectionReference<DocumentData>;
      }

      const products = getProducts(q);
      return products;
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
