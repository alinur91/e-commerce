import { StarRatingSizeEnum } from "@ts-types/enums";
import { IoIosStar } from "@utils/icons";

type StarProps = {
  onRate: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
  color?: string;
  size: StarRatingSizeEnum;
};

const Star = ({ onRate, onHoverIn, onHoverOut, size }: StarProps) => {
  const largeClass =
    size === StarRatingSizeEnum.large ? "text-xl md:text-2xl" : "";
  const smallClass = size === StarRatingSizeEnum.small ? "text-md" : "";

  return (
    <span
      role="button"
      className={`flex-auto text-yellow-400 ${smallClass} ${largeClass}`}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <IoIosStar />
    </span>
  );
};

export default Star;
