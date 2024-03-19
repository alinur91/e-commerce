import { AppDispatch } from "@services/store/store";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
export const useAppDispatch = () => useDispatch<any | AppDispatch>();
