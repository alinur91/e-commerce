import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToCart,
  removeProductFromCart,
} from "@features/cart/api/index";
import { ProductsData } from "@features/products/lib/types";
import {
  handlePendingState,
  handleRejectedState,
} from "@features/auth/lib/helpers";
import {
  handleAddToCartFulfilledState,
  handleRemoveFromCartFulfilledState,
} from "@features/cart/lib/helpers";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [] as ProductsData,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setCartProducts(state, action) {
      state.cartProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.pending, (state) => {
      handlePendingState(state);
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      handleAddToCartFulfilledState(state, action.payload);
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      handleRejectedState(state, action.payload as string);
    });
    builder.addCase(removeProductFromCart.pending, (state) => {
      handlePendingState(state);
    });
    builder.addCase(removeProductFromCart.fulfilled, (state) => {
      handleRemoveFromCartFulfilledState(state);
    });
    builder.addCase(removeProductFromCart.rejected, (state, action) => {
      handleRejectedState(state, action.payload as string);
    });
  },
});

export const { actions, reducer } = cartSlice;
