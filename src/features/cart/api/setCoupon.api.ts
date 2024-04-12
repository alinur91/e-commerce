import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "@services/firebase/firebaseConfig";
import { setDoc, doc } from "@firebase/firestore";
import { DiscountsInfo } from "@features/cart/lib/types";

export const setCoupon = createAsyncThunk(
  "coupons/add",
  async (couponData: DiscountsInfo) => {
    try {
      // Get the currently logged-in user
      const user = auth.currentUser;

      // Check if the user is logged in
      if (user) {
        // Access the user's coupon document in Firestore
        const userCouponDocRef = doc(
          db,
          `users/${user.uid}/coupon/${user.uid}`,
        );

        // Set the coupon data in the user's coupon document
        await setDoc(userCouponDocRef, couponData);

        // Return the added coupon data
        return couponData;
      } else {
        // Throw an error if the user is not authenticated
        throw new Error("User not authenticated");
      }
    } catch (error) {
      // Throw an error if any exception occurs
      throw new Error(error as string);
    }
  },
);
