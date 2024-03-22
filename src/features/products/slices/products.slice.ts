import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "@features/products/api/getProducts.api";
import { ProductsData } from "@features/products/lib/types";

const productsSlice = createSlice({
  name: "auth",
  initialState: {
    productsList: null as ProductsData | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.productsList = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const { actions, reducer } = productsSlice;
