import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = {
  id: string;
  label: string;
  errors?: string | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, errors, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="text-lg font-semibold" htmlFor={id}>
          {label}
        </label>
        <span className="text-red-500">{errors}</span>
        <input
          id={id}
          className="h-10 rounded-md bg-gray-100 px-3 outline-none"
          ref={ref}
          {...rest}
        />
      </div>
    );
  },
);

export default Input;
