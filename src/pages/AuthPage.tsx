import { ecommerce1, ecommerce2, ecommerce3 } from "@data/index";
import {
  ResetPasswordForm,
  SigninForm,
  SignupForm,
} from "@features/auth/components/index";
import { AuthenticationPagesEnum } from "@ts-types/enums";
import { BackgroundWithBlur, ImageWithOverlay } from "@ui/index";
import { useEffect } from "react";
import { useAppSelector } from "@hooks/index";
import { selectAuthData } from "@features/auth/slices/selector";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ pageType }: { pageType: AuthenticationPagesEnum }) => {
  const { loggedInUser } = useAppSelector(selectAuthData);
  const navigate = useNavigate();

  const authPageConfig = {
    [AuthenticationPagesEnum.Signin]: {
      FormComponent: SigninForm,
      imageUrl: ecommerce1,
      lgHeight: "lg:h-[600px]",
    },
    [AuthenticationPagesEnum.Signup]: {
      FormComponent: SignupForm,
      imageUrl: ecommerce2,
      lgHeight: "lg:h-[750px]",
    },
    [AuthenticationPagesEnum.Reset_Password]: {
      FormComponent: ResetPasswordForm,
      imageUrl: ecommerce3,
      lgHeight: "lg:h-[500px]",
    },
  };

  const { FormComponent, imageUrl, lgHeight } = authPageConfig[pageType];

  useEffect(() => {
    if (loggedInUser) navigate("/");
  }, [loggedInUser, navigate]);

  return (
    <BackgroundWithBlur imageUrl={imageUrl}>
      <div
        className={`flex h-auto justify-center px-8 ${lgHeight} lg:max-w-[1000px]`}
      >
        <FormComponent />
        <ImageWithOverlay imageUrl={imageUrl} />
      </div>
    </BackgroundWithBlur>
  );
};

export default AuthPage;
