import { logo } from "@data/index";
import { AuthenticationPagesEnum, ButtonEnum } from "@ts-types/enums";
import { AuthenticationNavigation, Button, Input } from "@ui/index";
import { useForm } from "react-hook-form";
import { signup } from "@features/auth/api/signup.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "@features/auth/lib/types";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { ClipLoader } from "@utils/icons";
import { useEffect } from "react";
import { selectAuthData } from "@features/auth/slices/selector";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, loggedInUser } = useAppSelector(selectAuthData);

  useEffect(() => {
    if (loggedInUser) navigate("/");
  }, [loggedInUser, navigate]);

  const onSubmit = async (data: TSignUpSchema) => {
    const { email, password, name } = data;
    dispatch(signup({ email, password, name }));
  };

  return (
    <div className=" flex flex-1 flex-col gap-2 bg-white px-14 py-16">
      <img className="h-24 w-24" src={logo} alt="" />
      <h1 className="text-2xl font-bold uppercase">FEAST MODE 😉</h1>
      <p className="text-gray-400">
        Your Passport to Quality Goods Starts Here!
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          inputClassName="h-11"
          id="name"
          label="Full Name"
          placeholder="Your Full Name"
          errors={errors.name && errors.name.message}
          autoFocus
          {...register("name")}
        />
        <Input
          inputClassName="h-11"
          id="email"
          label="Email Address"
          type="email"
          placeholder="Your Email Address"
          errors={errors.email && errors.email.message}
          {...register("email")}
        />
        <Input
          inputClassName="h-11"
          id="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          errors={errors.password && errors.password.message}
          {...register("password")}
        />
        <Input
          inputClassName="h-11"
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Re-Enter Password"
          errors={errors.confirmPassword && errors.confirmPassword.message}
          {...register("confirmPassword")}
        />
        <Button
          disabled={loading || isSubmitting}
          className="mt-6 h-11 gap-3 hover:bg-gradient-to-t hover:from-green-500 hover:to-green-800"
          type={ButtonEnum.PRIMARY}
        >
          {loading ? "Signing Up..." : "Sign up"}{" "}
          {loading && <ClipLoader color="#be7c18" size={24} />}
        </Button>
      </form>
      <AuthenticationNavigation page={AuthenticationPagesEnum.Signup} />
    </div>
  );
};

export default LoginForm;
