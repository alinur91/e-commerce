import { fetchOrderById } from "@features/order/api";
import {
  CustomerDetails,
  OrderDetails,
  OrderRecievedHeader,
} from "@features/order/components";
import { selectOrderData } from "@features/order/slices/selector";
import { useActions, useAppDispatch, useAppSelector } from "@hooks/index";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MoonLoader } from "@utils/icons";
import ErrorMessage from "@ui/ErrorMessage";

const OrderPlacedPage = () => {
  const { id } = useParams();

  const { setOrderSuccess } = useActions();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(selectOrderData);

  useEffect(() => {
    setOrderSuccess(null);
  }, [setOrderSuccess]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  return (
    <div className="mt-20 flex h-dvh flex-col items-center gap-4 tracking-wide">
      {loading && <MoonLoader color="#915c0d" />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="space-y-6 md:w-[700px] lg:w-[800px]">
          <OrderRecievedHeader />
          <OrderDetails />
          <CustomerDetails />
        </div>
      )}
    </div>
  );
};

export default OrderPlacedPage;
