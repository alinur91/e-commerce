import { PriceByAscDescEnum } from "@features/filters/lib/types";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectFiltersData } from "../slices/selector";

const FilterPriceByAscDesc = () => {
  const { setSortBy } = useActions();
  const { sortBy } = useAppSelector(selectFiltersData);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="flex  flex-col items-start gap-3">
      <h3 className="text-lg font-semibold text-gray-400">Sort By</h3>
      <select
        defaultValue={sortBy}
        className="md:text-md rounded-sm bg-gray-200 p-2 text-sm outline-none"
        onChange={onChange}
      >
        <option value={PriceByAscDescEnum.ASC}>{PriceByAscDescEnum.ASC}</option>
        <option value={PriceByAscDescEnum.DESC}>
          {PriceByAscDescEnum.DESC}
        </option>
      </select>
    </div>
  );
};

export default FilterPriceByAscDesc;
