import { StarRatingSize } from "@ts-types/enums";
import { Star } from "@ui/index";
import { useState } from "react";

type StarRatingProps = {
  maxRating: number;
  color?: string;
  size: StarRatingSize;
  messages?: [];
  defaultRating?: number;
  onSetRating?: (n: number) => void;
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = StarRatingSize.small,
  messages = [],
  defaultRating = 0,
  onSetRating,
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating: number) {
    setRating(rating);
    onSetRating(rating);
  }

  const largeClass = size === StarRatingSize.large ? "text-md md:text-lg" : "";
  const smallClass = size === StarRatingSize.small ? "text-sm" : "";
  const isLarge = size === StarRatingSize.large;

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
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
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </span>
    </div>
  );
}
