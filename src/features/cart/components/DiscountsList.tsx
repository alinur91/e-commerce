import { discounts } from "@features/cart/lib/discounts";
import { Discount } from "@features/cart/components";
import { useState } from "react";
import { MinThresholdInfoError } from "@features/cart/lib/types";

const DiscountsList = () => {
  const [minThresholdInfoError, setMinThresholdInfoError] =
    useState<MinThresholdInfoError>({
      isError: false,
      value: 0,
    });

  const handleCouponError = (info: MinThresholdInfoError) => {
    setMinThresholdInfoError(info);
  };

  return (
    <>
      <div className="h-64 divide-y divide-dashed divide-stone-200 overflow-y-auto rounded-sm border-2 border-gray-200">
        {discounts.map((discount) => (
          <Discount
            key={discount.value}
            handleCouponError={handleCouponError}
            discount={discount}
          />
        ))}
      </div>
      {minThresholdInfoError.isError && (
        <p className="text-red-500">
          Coupon only applicable for cart value above $
          {minThresholdInfoError.value}
        </p>
      )}
    </>
  );
};

export default DiscountsList;
