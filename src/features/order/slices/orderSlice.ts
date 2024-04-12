import { createSlice } from "@reduxjs/toolkit";
import { ProductsData } from "@features/products/lib/types";

const orderSlice = createSlice({
  name: "cart",
  initialState: {
    orderedProducts: [] as ProductsData,
    loading: false,
    error: null as string | null,
    name: null,
    phoneNumber: null,
    address: null,
  },
  reducers: {
    setCustomerDetails(state, action) {
      const { name, phoneNumber, address } = action.payload;
      state.name = name;
      state.phoneNumber = phoneNumber;
      state.address = address;
    },
  },
});

export const { actions, reducer } = orderSlice;
