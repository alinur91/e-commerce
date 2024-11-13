import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
} from "react";

type InputProps = {
  id?: string;
  label?: string;
  errors?: string | undefined;
  inputClassName?: string;
  labelClassName?: string;
  children?: ReactNode;
  autoFocus?: boolean; // Add autoFocus prop
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      errors,
      inputClassName,
      children,
      labelClassName,
      autoFocus = false,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const focusRef = useRef<boolean>(autoFocus ?? true); // Use autoFocus prop to control focusing

    useEffect(() => {
      // Focus the input element when the component mounts
      if (focusRef.current && inputRef.current) {
        inputRef.current.focus();
        focusRef.current = false; // Disable focusing on subsequent renders
      }
    }, []);

    return (
      <div className="relative flex flex-col space-y-1">
        {label && (
          <label
            className={`cursor-pointer text-lg font-semibold ${labelClassName}`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        {errors && (
          <span className="text-xs text-red-500 sm:text-lg">{errors}</span>
        )}
        <input
          id={id}
          className={`rounded-md bg-gray-100 px-3 outline-none ${inputClassName}`}
          ref={(input) => {
            // Assign the input ref
            if (typeof ref === "function") {
              ref(input);
            } else if (ref) {
              ref.current = input;
            }
            // Assign the input ref for focusing
            inputRef.current = input;
          }}
          {...rest}
        />
        {children}
      </div>
    );
  },
);

export default Input;
