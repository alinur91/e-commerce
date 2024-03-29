import { StarRatingSizeEnum } from "@ts-types/enums";
import { Star } from "@ui/index";
import { useEffect, useState } from "react";

type StarRatingProps = {
  maxRating?: number;
  color?: string;
  size: StarRatingSizeEnum;
  defaultRating?: number;
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = StarRatingSizeEnum.small,
  defaultRating = 0,
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating: number) {
    setRating((previousRating) => (previousRating === rating ? 0 : rating));
    // if previous rating is equal to clicked rating, rating gets defaulted to 0, it resets to defaultrating=0,all stars are gray after this
    setTempRating(0);
  }

  const largeClass =
    size === StarRatingSizeEnum.large ? "text-md md:text-lg" : "";
  const smallClass = size === StarRatingSizeEnum.small ? "text-sm" : "";
  const isLarge = size === StarRatingSizeEnum.large;

  useEffect(() => {
    console.log(rating);
  }, [rating]);

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
