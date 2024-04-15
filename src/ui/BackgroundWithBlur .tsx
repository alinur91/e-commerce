import { ReactNode } from "react";

type BackgroundWithBlurProps = {
  imageUrl: string;
  children: ReactNode;
};

const BackgroundWithBlur = ({
  imageUrl,
  children,
}: BackgroundWithBlurProps) => {
  return (
    <div className="relative flex min-h-dvh items-center justify-center">
      {/* Background image */}
      <div
        className="sm:absolute sm:inset-0 sm:bg-cover sm:bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Blurred overlay */}
      <div className="sm:absolute sm:inset-0 sm:bg-gray-900 sm:bg-opacity-50 sm:blur"></div>

      {/* Content */}
      <div className="relative">
        {/* Render children */}
        {children}
      </div>
    </div>
  );
};

export default BackgroundWithBlur;
