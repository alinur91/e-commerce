import { market } from "@data/index";

const ImageBanner = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="sm:absolute sm:inset-0 sm:bg-cover sm:bg-center"
        style={{ backgroundImage: `url(${market})` }}
      ></div>

      <div className="sm:absolute sm:inset-0 sm:bg-gray-400 sm:bg-opacity-50"></div>

      <div className="z-1 relative w-full sm:w-[576px]">
        <img
          src={market}
          className="h-52 w-full object-cover sm:h-60 sm:w-[576px]"
          alt=""
        />
      </div>
    </div>
  );
};

export default ImageBanner;
