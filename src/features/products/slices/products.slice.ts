import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductById } from "@features/products/api/index";
import {
  ProductData,
  ProductsData,
  ProductsState,
} from "@features/products/lib/types";
import {
  handlePendingState,
  handleRejectedState,
} from "@features/auth/utils/helpers";

const productsSlice = createSlice({
  name: "auth",
  initialState: {
    productsList: null as ProductsData | null,
    singleProduct: null as ProductData | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      handlePendingState(state as ProductsState);
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.productsList = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      handleRejectedState(
        state as ProductsState,
        action.error.message as string,
      );
    });
    builder.addCase(getProductById.pending, (state) => {
      handlePendingState(state as ProductsState);
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProduct = action.payload;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      handleRejectedState(
        state as ProductsState,
        action.error.message as string,
      );
    });
  },
});

export const { actions, reducer } = productsSlice;
