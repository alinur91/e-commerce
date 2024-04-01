import { useAppSelector } from "@hooks/useAppSelector";
import { getMaxPrice } from "@utils/helpers";
import { useActions } from "@hooks/useActions";
import { selectFiltersData } from "@features/filters/slices/selector";
import { getProducts } from "@features/products/api";
import { useEffect, useMemo, useState } from "react";
import { ProductsData } from "@features/products/lib/types";

const Price = () => {
  const { setPrice } = useActions();
  const [totalProducts, setTotalProducts] = useState<ProductsData>([]);
  const { price } = useAppSelector(selectFiltersData);
  const maxPrice = useMemo(() => getMaxPrice(totalProducts), [totalProducts]);

  // Calculate the adjusted max value to ensure it's divisible by the step size
  const adjustedMaxPrice = Math.ceil(maxPrice / 20) * 20;

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };

  useEffect(() => {
    (async () => {
      const totalProducts = await getProducts();
      setTotalProducts(totalProducts as ProductsData);
    })();
  }, []);

  return (
    <div className="flex  flex-col items-start gap-3 text-lg font-semibold text-gray-400">
      <h3 className="text-lg font-semibold text-gray-400">Price</h3>
      <div className="flex w-64 items-center gap-4">
        <span>{price}</span>
        <input
          type="range"
          className="w-full outline-none"
          min={0}
          value={price}
          max={adjustedMaxPrice}
          step={20}
          onChange={handleRangeChange}
        />
        <span>{maxPrice || null}</span>
      </div>
    </div>
  );
};

export default Price;
