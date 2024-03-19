import { BackgroundWithBlur, ImageWithOverlay } from "@ui/index";
import { SigninForm } from "@features/auth/components/index";
import { ecommerce2 } from "@data/index";

const Signin = () => {
  return (
    <BackgroundWithBlur imageUrl={ecommerce2}>
      <div className="flex h-auto justify-center px-8 lg:h-[600px] lg:max-w-[1000px]">
        <SigninForm />
        <ImageWithOverlay imageUrl={ecommerce2} />
      </div>
    </BackgroundWithBlur>
  );
};

export default Signin;
