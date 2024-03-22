import { Category } from "@features/filters/lib/types";

const FilterByCategories = () => {
  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="text-lg font-semibold text-gray-400">Category</h3>
      <select
        className="rounded-sm bg-gray-100 p-1 text-sm outline-none md:text-md"
        name={Category.all}
        id=""
      >
        <option value={Category.all}>{Category.all}</option>
        <option value={Category["home-decoration"]}>
          {Category["home-decoration"]}
        </option>
        <option value={Category.laptops}>{Category.laptops}</option>
        <option value={Category.skincare}>{Category.skincare}</option>
        <option value={Category.smartphones}>{Category.smartphones}</option>
      </select>
    </div>
  );
};

export default FilterByCategories;
