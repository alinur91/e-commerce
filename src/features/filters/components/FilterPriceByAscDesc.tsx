import { PriceByAscDescEnum } from "@features/filters/lib/types";

const FilterPriceByAscDesc = () => {
  const [ascending, descending] = Object.keys(PriceByAscDescEnum);

  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="text-lg font-semibold text-gray-400">Sort By</h3>
      <select className="md:text-md rounded-sm bg-gray-200 p-1 text-sm outline-none">
        <option value={ascending}>{PriceByAscDescEnum.ASC}</option>
        <option value={descending}>{PriceByAscDescEnum.DESC}</option>
      </select>
    </div>
  );
};

export default FilterPriceByAscDesc;
