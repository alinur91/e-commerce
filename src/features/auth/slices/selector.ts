import { RootState } from "@services/store/store";

export const selectAuthData = (state: RootState) => state.auth;
