import { logo } from "@data/index";
import { AuthenticationPagesEnum, ButtonEnum } from "@ts-types/enums";
import { AuthenticationNavigation, Button, Input } from "@ui/index";
import { signin } from "@features/auth/api/signin.api";
import { useForm } from "react-hook-form";
import { TSignInSchema, signInSchema } from "@features/auth/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { selectAuthData } from "@features/auth/slices/selector";
import { MoonLoader } from "@utils/icons";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, loggedInUser } = useAppSelector(selectAuthData);

  useEffect(() => {
    if (loggedInUser) navigate("/");
  }, [loggedInUser, navigate]);

  const onSubmit = async (data: TSignInSchema) => {
    const { email, password } = data;
    dispatch(signin({ email, password }));
  };

  const isLoading = isSubmitting || loading;

  return (
    <div className=" flex flex-1 flex-col gap-2 bg-white px-14 py-16">
      <img className="h-24 w-24" src={logo} alt="" />
      <h1 className="text-2xl font-bold uppercase">Enjoy the moment</h1>
      <p className="text-gray-400">
        Sign in now to continue your marketing journey with us
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          inputClassName="h-11"
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter Email Address"
          errors={errors.email && errors.email.message}
          autoFocus
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
        <Button
          disabled={isLoading}
          className={`mt-6 h-11 gap-3 w-full ${
            isLoading
              ? "disabled:bg-gray-200 disabled:text-gray-400"
              : "hover:bg-gradient-to-t hover:from-green-500 hover:to-green-800"
          }`}
          type={ButtonEnum.PRIMARY}
        >
          {isLoading ? "Signing in..." : "Sign in"}{" "}
          {isLoading && <MoonLoader color="#915c0d" size={24} />}
        </Button>
      </form>
      <AuthenticationNavigation page={AuthenticationPagesEnum.Login} />
    </div>
  );
};

export default SigninForm;
