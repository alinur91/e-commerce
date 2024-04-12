import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "@services/firebase/firebaseConfig";
import { doc, deleteDoc } from "@firebase/firestore";

export const removeCoupon = createAsyncThunk("coupons/remove", async () => {
  try {
    // Get the currently logged-in user
    const user = auth.currentUser;

    // Check if the user is logged in
    if (user) {
      // Access the user's coupon document in Firestore
      const userCouponDocRef = doc(db, `users/${user.uid}/coupon/${user.uid}`);

      // Delete the user's coupon document
      await deleteDoc(userCouponDocRef);

      // Return success message or whatever you need
      return "Coupon removed successfully";
    } else {
      // Throw an error if the user is not authenticated
      throw new Error("User not authenticated");
    }
  } catch (error) {
    // Throw an error if any exception occurs
    throw new Error(error as string);
  }
});
