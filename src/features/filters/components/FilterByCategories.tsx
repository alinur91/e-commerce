import { CategoryEnum } from "@features/filters/lib/types";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectFiltersData } from "../slices/selector";

const FilterByCategories = () => {
  const { setCategory } = useActions();
  const { category } = useAppSelector(selectFiltersData);

  const onChange = (selectedOption: CategoryEnum) => {
    setCategory(selectedOption);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="text-lg font-semibold text-gray-400">Category</h3>
      <select
        defaultValue={category}
        className="md:text-md rounded-sm bg-gray-200 p-2 text-sm outline-none"
        onChange={(e) => onChange(e.target.value as CategoryEnum)}
      >
        <option value={CategoryEnum.all}>{CategoryEnum.all}</option>
        <option value={CategoryEnum["home-decoration"]}>
          {CategoryEnum["home-decoration"]}
        </option>
        <option value={CategoryEnum.laptops}>{CategoryEnum.laptops}</option>
        <option value={CategoryEnum.skincare}>{CategoryEnum.skincare}</option>
        <option value={CategoryEnum.smartphones}>
          {CategoryEnum.smartphones}
        </option>
        <option value={CategoryEnum.fragrances}>
          {CategoryEnum.fragrances}
        </option>
        <option value={CategoryEnum.groceries}>{CategoryEnum.groceries}</option>
      </select>
    </div>
  );
};

export default FilterByCategories;
