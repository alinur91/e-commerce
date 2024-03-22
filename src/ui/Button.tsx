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
  const base =
    "flex justify-center items-center font-semibold rounded-md tracking-wide";

  const styles = {
    [ButtonEnum.Primary]: `${base} bg-green-500 text-white h-10 bg-gradient transition duration-300 border-green-800 border-2 w-full`,
    [ButtonEnum.Secondary]: `${base} bg-white text-orange-200 h-10`,
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
