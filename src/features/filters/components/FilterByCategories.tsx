import { CategoryEnum } from "@features/filters/lib/types";
import { useForm, Controller } from "react-hook-form";

const FilterByCategories = () => {
  const { control, setValue } = useForm();

  const onChange = (selectedOption: CategoryEnum) => {
    console.log(selectedOption);
    setValue("selectCategory", selectedOption);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="text-lg font-semibold text-gray-400">Category</h3>
      <Controller
        name="selectCategory"
        control={control}
        defaultValue={CategoryEnum.all}
        render={({ field }) => (
          <select
            className="md:text-md rounded-sm bg-gray-200 p-1 text-sm outline-none"
            {...field}
            onChange={(e) => onChange(e.target.value as CategoryEnum)}
          >
            <option value={CategoryEnum.all}>{CategoryEnum.all}</option>
            <option value={CategoryEnum["home-decoration"]}>
              {CategoryEnum["home-decoration"]}
            </option>
            <option value={CategoryEnum.laptops}>{CategoryEnum.laptops}</option>
            <option value={CategoryEnum.skincare}>
              {CategoryEnum.skincare}
            </option>
            <option value={CategoryEnum.smartphones}>
              {CategoryEnum.smartphones}
            </option>
          </select>
        )}
      />
    </div>
  );
};

export default FilterByCategories;
