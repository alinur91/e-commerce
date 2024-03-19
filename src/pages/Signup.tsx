import { ecommerce1 } from "@data/index";
import { SignupForm } from "@features/auth/components/index";
import { BackgroundWithBlur, ImageWithOverlay } from "@ui/index";

const Signup = () => {
  return (
    <BackgroundWithBlur imageUrl={ecommerce1}>
      <div className="flex h-auto justify-center px-8 lg:h-[750px] lg:max-w-[1000px]">
        <SignupForm />
        <ImageWithOverlay imageUrl={ecommerce1} />
      </div>
    </BackgroundWithBlur>
  );
};

export default Signup;
