import { DiscountsInfo } from "@features/cart/lib/types";
import { ProductsData } from "@features/products/lib/types";
import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 3 characters"),
  phoneNumber: z.string().min(6, "PhoneNumber must be at least 6 characters"),
  address: z.string().min(6, "Address must be at least 6 characters"),
});

export type TOrderSchema = z.infer<typeof orderSchema>;

export type OrderState = {
  orderedProducts: ProductsData;
  loading: boolean;
  error: string | null;
  orderSuccess?: boolean | null;
  discountInfo?: DiscountsInfo
  name: string | null;
  phoneNumber: string | null;
  address: string | null;
  orderId: string | null;
};

export type OrderDetails = Omit<OrderState, "error" | "loading">;
