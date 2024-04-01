import { RootState } from "@services/store/store";

export const selectFiltersData = (state: RootState) => state.filters;
