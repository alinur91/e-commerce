import { createSlice } from "@reduxjs/toolkit";
import { CategoryEnum, PriceByAscDescEnum } from "@features/filters/lib/types";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    category: CategoryEnum,
    rating: 0,
    price: 0,
    sortBy: PriceByAscDescEnum.ASC,
    error: null,
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setRating(state, action) {
      state.rating = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
});

export const { actions, reducer } = filtersSlice;
