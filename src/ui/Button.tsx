import { ButtonEnum } from "@ts-types/enums";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: ButtonEnum;
  to?: string;
};

function Button({
  children,
  disabled,
  type,
  onClick,
  to,
  className,
}: ButtonProps) {
  const base = `flex justify-center items-center font-bold rounded-md text-white tracking-wide uppercase text-sm disabled:cursor-not-allowed`;

  const styles = {
    [ButtonEnum.PRIMARY]: `${base} py-3 bg-gradient transition duration-300 border-green-800  w-full active:bg-green-600  bg-green-500`,
    [ButtonEnum.SECONDARY]: `${base} bg-gray-100 text-gray-400 py-3 px-5`,
    [ButtonEnum.DANGER]: `${base} bg-red-600 text-red-700  py-3 px-5`,
    [ButtonEnum.LIGHT]: `${base} bg-gray-100 text-gray-400 py-1 px-4 border-2 border-gray-200 border-solid`,
    [ButtonEnum.WARNING]: `${base} bg-white text-orange-200 `,
  };

  if (to)
    return (
      <Link to={to} className={`${type ? styles[type] : ""} ${className}`}>
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles[type as ButtonEnum]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
