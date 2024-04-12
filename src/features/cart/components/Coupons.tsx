import { ButtonEnum } from "@ts-types/enums";
import { Button } from "@ui/index";
import { BiSolidCoupon } from "@utils/icons";
import { useState } from "react";
import { DiscountsList } from "@features/cart/components";

const CouponsList = () => {
  const [isCouponsOpen, setIsCouponsOpen] = useState(false);

  const handleCouponsClick = () => {
    setIsCouponsOpen((isOpen) => !isOpen);
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleCouponsClick}
        className="flex h-9 w-full items-center gap-1 rounded-sm uppercase outline-dashed outline-1 outline-gray-400 hover:shadow-md"
        type={ButtonEnum.SECONDARY}
      >
        <BiSolidCoupon />
        <span className="flex items-center gap-1">
          {isCouponsOpen ? "Hide Coupons" : "Show Coupons"}
        </span>
      </Button>
      {isCouponsOpen && <DiscountsList />}
    </div>
  );
};

export default CouponsList;
