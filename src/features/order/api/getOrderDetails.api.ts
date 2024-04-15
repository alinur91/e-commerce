import { collection, query, where, getDocs } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "@services/firebase/firebaseConfig";
import { OrderDetails } from "@features/order/lib/types";

export const fetchOrderById = createAsyncThunk(
  "orders/fetchById",
  async (orderId: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Reference the user's orders collection
        const ordersCollectionRef = collection(db, `users/${user.uid}/orders`);

        // Create a query to filter orders where orderId field equals passed orderId
        const q = query(ordersCollectionRef, where("orderId", "==", orderId));

        // Get the documents that match the query
        const querySnapshot = await getDocs(q);

        // Check if any documents match the query
        if (!querySnapshot.empty) {
          // Since orderId is unique, there should be only one matching document
          // Extract the order details from the first document
          const orderDetails = querySnapshot.docs[0].data() as OrderDetails;
          return orderDetails;
        } else {
          throw new Error("Order not found");
        }
      }
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
