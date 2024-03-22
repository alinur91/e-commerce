import { PriceByAscDesc } from "@features/filters/lib/types";

const FilterPriceByAscDesc = () => {
  const [ascending, descending] = Object.keys(PriceByAscDesc);

  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="text-lg font-semibold text-gray-400">Category</h3>
      <select className="md:text-md rounded-sm bg-gray-100 p-1 text-sm outline-none">
        <option value={ascending}>{PriceByAscDesc.ASC}</option>
        <option value={descending}>{PriceByAscDesc.DESC}</option>
      </select>
    </div>
  );
};

export default FilterPriceByAscDesc;
