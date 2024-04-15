import { selectCartData } from "@features/cart/slices/selector";
import { addOrderDetails } from "@features/order/api";
import {
  OrderDetails,
  TOrderSchema,
  orderSchema,
} from "@features/order/lib/types";
import { selectOrderData } from "@features/order/slices/selector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import {
  ButtonEnum,
  ToastPositionNotificationsEnum,
  ToastTypeNotificationsEnum,
} from "@ts-types/enums";
import { Button, Input } from "@ui/index";
import { useForm } from "react-hook-form";
import { MoonLoader } from "@utils/icons";
import { showToastNotificationMessage } from "@utils/helpers";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const { cartProducts } = useAppSelector(selectCartData);
  const { loading } = useAppSelector(selectOrderData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TOrderSchema>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = (data: TOrderSchema) => {
    if (cartProducts.length > 0) {
      dispatch(
        addOrderDetails({
          ...data,
          orderedProducts: cartProducts,
        } as OrderDetails),
      );
    } else {
      showToastNotificationMessage(
        ToastTypeNotificationsEnum.ERROR,
        "Your cart is empty",
        ToastPositionNotificationsEnum.TOP_CENTER,
      );
    }
  };
  const isLoading = isSubmitting || loading;

  return (
    <>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          inputClassName="h-12 text-gray-400 font-semibold"
          labelClassName="text-sm sm:text-lg"
          id="name"
          label="Full Name"
          type="text"
          placeholder="Your Name"
          errors={errors.name && errors.name.message}
          autoFocus
          {...register("name")}
        />
        <Input
          inputClassName="h-12 text-gray-400 font-semibold"
          labelClassName="text-sm sm:text-lg"
          id="phoneNumber"
          label="Phone Number"
          type="number"
          placeholder="Your Number"
          errors={errors.phoneNumber && errors.phoneNumber.message}
          {...register("phoneNumber")}
        />
        <Input
          inputClassName="h-12 text-gray-400 font-semibold"
          labelClassName="text-sm sm:text-lg"
          id="address"
          label="Address"
          type="text"
          placeholder="Your Address"
          errors={errors.address && errors.address.message}
          {...register("address")}
        />
        <Button
          disabled={isSubmitting || loading}
          className={`mt-6 h-11 w-full gap-3 ${
            isLoading
              ? "disabled:bg-gray-200 disabled:text-gray-400"
              : "hover:bg-gradient-to-t hover:from-green-500 hover:to-green-800"
          }`}
          type={ButtonEnum.PRIMARY}
        >
          {isLoading ? "Ordering..." : "Order"}{" "}
          {isLoading && <MoonLoader color="#915c0d" size={24} />}
        </Button>
      </form>
      <button
        onClick={() => navigate(-1)}
        disabled={isSubmitting}
        className="h-12 w-full border-2 border-orange-600 text-base  font-normal text-orange-600 hover:border-orange-400 hover:text-orange-400"
      >
        Cancel
      </button>
    </>
  );
};

export default OrderForm;
