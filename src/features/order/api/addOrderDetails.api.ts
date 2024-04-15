import { removeAllProductsAndCoupon } from "@features/cart/api";
import { ShowNotificationOnAllProductsRemovalEnum } from "@features/cart/lib/types";
import { OrderDetails } from "@features/order/lib/types";
import { addDoc, collection, doc, updateDoc } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "@services/firebase/firebaseConfig";
import { RootState } from "@services/store/store";

export const addOrderDetails = createAsyncThunk(
  "orders/add",
  async (orderDetails: OrderDetails, { dispatch, getState }) => {
    const state = getState() as RootState;
    const discountInfo = state.cart.coupon.discountInfo;
    try {
      const user = auth.currentUser;
      if (user) {
        const ordersCollectionRef = collection(db, `users/${user.uid}/orders`);

        // Add order details to the user's orders collection
        const docRef = await addDoc(ordersCollectionRef, orderDetails);

        // Retrieve the unique ID of the added document
        const orderId = docRef.id;

        // Update the document to include the orderId field
        await updateDoc(doc(ordersCollectionRef, orderId), {
          orderId,
          discountInfo,
        });

        await dispatch(
          removeAllProductsAndCoupon(
            ShowNotificationOnAllProductsRemovalEnum.NO,
          ),
        );

        return {
          ...orderDetails,
          orderId,
          discountInfo,
          orderSuccess: true,
        } as OrderDetails;
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
