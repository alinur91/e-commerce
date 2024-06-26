import { StarRatingSizeEnum } from "@ts-types/enums";
import { IoIosStar } from "@utils/icons";

type StarProps = {
  onRate: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
  color?: string;
  rating: number;
  index: number;
  tempRating: number;
  size: StarRatingSizeEnum;
};

const Star = ({
  onRate,
  onHoverIn,
  onHoverOut,
  size,
  rating,
  index,
  tempRating,
}: StarProps) => {
  const sizeClasses =
    size === StarRatingSizeEnum.large
      ? "text-xl md:text-2xl"
      : "text-md cursor-auto";

  const isStarYellowClass =
    tempRating >= index + 1 || rating >= index + 1
      ? "text-yellow-400"
      : "text-gray-200";

  return (
    <span
      role="button"
      className={`flex-auto ${isStarYellowClass} ${sizeClasses}`}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <IoIosStar />
    </span>
  );
};

export default Star;
