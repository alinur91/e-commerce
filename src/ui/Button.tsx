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
  const base = `flex justify-center items-center font-bold rounded-md tracking-wide uppercase text-sm disabled:cursor-not-allowed outline-none `;

  const styles = {
    [ButtonEnum.PRIMARY]: `${base} py-3 bg-gradient transition duration-300 border-green-800  active:bg-green-600  bg-green-500 text-white `,
    [ButtonEnum.DANGER]: `${base} bg-red-600 text-red-700  py-3 px-5 text-white border-1 border-red-900 `,
    [ButtonEnum.LIGHT]: `${base} rounded-lg border-2 border-gray-300 text-xl text-gray-500 h-8 flex-1 bg-gray-100 `,
    [ButtonEnum.WARNING]: `${base} text-orange-600 text-base font-normal `,
    [ButtonEnum.SECONDARY]: `${base} text-gray-600 font-semibold `,
  };

  if (to)
    return (
      <Link to={to} className={`${type ? styles[type] : " "} ${className}`}>
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
