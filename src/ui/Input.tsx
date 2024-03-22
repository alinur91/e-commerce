import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

type InputProps = {
  id?: string;
  label?: string;
  errors?: string | undefined;
  className?: string;
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, errors, className, children, ...rest }, ref) => {
    return (
      <div className="relative flex flex-col">
        {label && (
          <label className="text-lg font-semibold" htmlFor={id}>
            {label}
          </label>
        )}
        {errors && <span className="text-red-500">{errors}</span>}
        <input
          id={id}
          className={`h-10 rounded-md bg-gray-100 px-3 outline-none ${className}`}
          ref={ref}
          {...rest}
        />
        {children}
      </div>
    );
  },
);

export default Input;
