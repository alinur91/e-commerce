import { BackgroundWithBlur, ImageWithOverlay } from "@ui/index";
import { ecommerce3 } from "@data/index";
import { ResetPasswordForm } from "@features/auth/components";

const Login = () => {
  return (
    <BackgroundWithBlur imageUrl={ecommerce3}>
      <div className="flex h-auto justify-center px-8 lg:h-[500px] lg:max-w-[1000px]">
        <ResetPasswordForm />
        <ImageWithOverlay imageUrl={ecommerce3} />
      </div>
    </BackgroundWithBlur>
  );
};

export default Login;
