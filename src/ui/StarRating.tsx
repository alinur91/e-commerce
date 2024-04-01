import { useActions } from "@hooks/useActions";
import { StarRatingSizeEnum } from "@ts-types/enums";
import { Star } from "@ui/index";
import { useState } from "react";

type StarRatingProps = {
  maxRating?: number;
  color?: string;
  size: StarRatingSizeEnum;
  rating?: number;
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = StarRatingSizeEnum.small,
  rating = 0,
}: StarRatingProps) {
  // const [rating, setRating] = useState(rating);
  const { setRating } = useActions();

  const [tempRating, setTempRating] = useState(0);

  function handleRating(newRating: number) {
    setRating(rating === newRating ? 0 : newRating);
    // if previous rating is equal to clicked rating, rating gets defaulted to 0, it resets to rating=0,all stars are gray after this,otherwise return newrating
    setTempRating(0);
  }

  const largeClass =
    size === StarRatingSizeEnum.large ? "text-md md:text-lg" : "";
  const smallClass = size === StarRatingSizeEnum.small ? "text-sm" : "";
  const isLarge = size === StarRatingSizeEnum.large;

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            index={i}
            rating={rating}
            tempRating={tempRating}
            onRate={() => isLarge && handleRating(i + 1)}
            onHoverIn={() => isLarge && setTempRating(i + 1)}
            onHoverOut={() => isLarge && setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <span
        className={`flex h-3 w-3 items-center font-medium  text-gray-400 ${smallClass} ${largeClass}`}
      >
        {tempRating || rating || "All"}
      </span>
    </div>
  );
}
