import { collection, doc, onSnapshot } from "@firebase/firestore";
import { auth, db } from "@services/firebase/firebaseConfig";
import { useEffect } from "react";
import { useActions } from "./index";
import { ProductData, ProductsData } from "@features/products/lib/types";
import { DiscountsInfo } from "@features/cart/lib/types";

const useUserDataSubscriptionEffect = () => {
  const {
    setCartProducts,
    resetFiltersState,
    setCouponData,
    setCartLoading,
    setAuthLoading,
    setProductsList,
  } = useActions();

  useEffect(() => {
    setAuthLoading(true);
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setAuthLoading(false);
        try {
          setCartLoading(true);
          const userCartCollectionRef = collection(
            db,
            `users/${authUser.uid}/cart`,
          );

          const unsubscribeCart = onSnapshot(
            userCartCollectionRef,
            (querySnapshot) => {
              const productsData = [] as ProductsData;
              querySnapshot.forEach((doc) => {
                const data = { ...doc.data(), id: doc.id };
                productsData.push(data as ProductData);
              });
              setCartProducts(productsData);
              setCartLoading(false);
            },
          );

          const userCouponDocRef = doc(
            db,
            `users/${authUser.uid}/coupon/${authUser.uid}`,
          );

          const unsubscribeCoupon = onSnapshot(userCouponDocRef, (doc) => {
            if (doc.exists()) {
              const couponData = doc.data() as DiscountsInfo;
              setCouponData(couponData);
            } else {
              setCouponData({});
            }
          });

          return () => {
            unsubscribeCart();
            unsubscribeCoupon();
          };
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        resetFiltersState();
        setCartProducts([]);
        setProductsList([]);
        setCouponData({});
      }
    });

    return unsubscribeAuth;
  }, [
    resetFiltersState,
    setCartProducts,
    setCouponData,
    setCartLoading,
    setAuthLoading,
    setProductsList,
  ]);

  return null; // Custom hooks should return a value, but in this case, we don't need to return anything
};

export default useUserDataSubscriptionEffect;
