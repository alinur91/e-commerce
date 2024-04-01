import { createSlice } from "@reduxjs/toolkit";
import {
  CategoryEnum,
  FiltersState,
  PriceByAscDescEnum,
} from "@features/filters/lib/types";
import { getLocalStorageItem, setLocalStorageItem } from "@utils/helpers";
import { LocalStorageKeyEnum } from "@ts-types/enums";

const initialFiltersState = {
  category: CategoryEnum.all,
  rating: 0,
  price: 0,
  sortBy: PriceByAscDescEnum.ASC,
  error: null,
};

const filtersState: FiltersState | null =
  getLocalStorageItem(LocalStorageKeyEnum.FILTERS) ?? initialFiltersState;

const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
      setLocalStorageItem(LocalStorageKeyEnum.FILTERS, state);
    },
    setRating(state, action) {
      state.rating = action.payload;
      setLocalStorageItem(LocalStorageKeyEnum.FILTERS, state);
    },
    setPrice(state, action) {
      state.price = action.payload;
      setLocalStorageItem(LocalStorageKeyEnum.FILTERS, state);
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      setLocalStorageItem(LocalStorageKeyEnum.FILTERS, state);
    },
    resetFiltersState() {
      return initialFiltersState;
    },
  },
});

export const { actions, reducer } = filtersSlice;
