import { collection, deleteDoc, getDocs } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "@services/firebase/firebaseConfig";
import { removeCoupon } from "@features/cart/api/removeCoupon.api";
import { hasCouponApplied } from "@utils/helpers";
import { RootState } from "@services/store/store";
import { ShowNotificationOnAllProductsRemovalEnum } from "@features/cart/lib/types";

export const removeAllProductsAndCoupon = createAsyncThunk(
  "cart/removeAllProducts",
  async (
    shouldShowNotificationOnRemoval:
      | ShowNotificationOnAllProductsRemovalEnum
      | undefined = ShowNotificationOnAllProductsRemovalEnum.YES,
    { dispatch, getState },
  ) => {
    const state = getState() as RootState;
    const couponApplied = hasCouponApplied(state.cart.coupon.discountInfo);
    try {
      const user = auth.currentUser;
      if (user) {
        const userCartCollectionRef = collection(db, `users/${user.uid}/cart`);

        // Query the user's cart collection to get all documents
        const querySnapshot = await getDocs(userCartCollectionRef);

        // Iterate through each document and delete it
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        if (couponApplied) await dispatch(removeCoupon());

        return shouldShowNotificationOnRemoval;
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
