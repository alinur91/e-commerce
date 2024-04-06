import { useEffect, RefObject } from "react";

type RefObjectMap = {
  [key: string]: RefObject<HTMLElement>;
};

const useClickOutside = (
  refObjectMap: RefObjectMap,
  closeElement: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let clickedOutside = true;

      for (const refKey in refObjectMap) {
        const refObject = refObjectMap[refKey];
        if (
          refObject.current &&
          refObject.current.contains(event.target as Node)
        ) {
          clickedOutside = false;
          break;
        }
      }

      if (clickedOutside) {
        closeElement();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeElement, refObjectMap]);
};

export default useClickOutside;
