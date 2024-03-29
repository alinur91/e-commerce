import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductById,
  getProductsByCategory,
} from "@features/products/api/index";
import {
  ProductData,
  ProductsData,
  ProductsState,
} from "@features/products/lib/types";
import {
  handlePendingState,
  handleRejectedState,
} from "@features/auth/lib/helpers";
import { handleProductsFulfilledState } from "@features/products/lib/helpers";

const productsSlice = createSlice({
  name: "products",
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
      handleProductsFulfilledState(
        state as ProductsState,
        action.payload as ProductsData,
      );
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
    builder.addCase(getProductsByCategory.pending, (state) => {
      handlePendingState(state as ProductsState);
    });
    builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
      handleProductsFulfilledState(
        state as ProductsState,
        action.payload as ProductsData,
      );
    });
    builder.addCase(getProductsByCategory.rejected, (state, action) => {
      handleRejectedState(
        state as ProductsState,
        action.error.message as string,
      );
    });
  },
});

export const { actions, reducer } = productsSlice;
