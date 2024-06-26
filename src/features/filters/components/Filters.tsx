import { FilterByCategories, Price } from "@features/filters/components/index";
import { FilterPriceByAscDesc } from "@features/filters/components/index";
import StarRating from "@ui/StarRating";
import { StarRatingSizeEnum } from "@ts-types/enums";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectFiltersData } from "@features/filters/slices/selector";

const Filters = () => {
  const { rating } = useAppSelector(selectFiltersData);

  return (
    <div className="space-y-5 px-6 py-4 md:px-24 md:py-10">
      <h2 className="text-xl font-bold opacity-80 md:text-2xl">Filters</h2>
      <div className="flex flex-wrap items-start justify-between gap-x-20 gap-y-6">
        <FilterByCategories />
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-400">Rating</h3>
          <StarRating rating={rating} size={StarRatingSizeEnum.large} />
        </div>
        <Price />
        <FilterPriceByAscDesc />
      </div>
    </div>
  );
};

export default Filters;
