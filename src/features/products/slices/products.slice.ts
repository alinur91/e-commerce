import { createSlice } from "@reduxjs/toolkit";
import { getFilteredProducts, getProductById } from "@features/products/api/index";
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
    builder.addCase(getFilteredProducts.pending, (state) => {
      handlePendingState(state as ProductsState);
    });
    builder.addCase(getFilteredProducts.fulfilled, (state, action) => {
      handleProductsFulfilledState(
        state as ProductsState,
        action.payload as ProductsData,
      );
    });
    builder.addCase(getFilteredProducts.rejected, (state, action) => {
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
