import { RootState } from "@services/store/store";

export const selectProductsData = (state: RootState) => state.products;
