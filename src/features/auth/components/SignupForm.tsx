import { logo } from "@data/index";
import { AuthenticationPagesEnum, ButtonEnum } from "@ts-types/enums";
import { AuthenticationNavigation, Button, Input } from "@ui/index";
import { useForm } from "react-hook-form";
import { signup } from "@features/auth/api/signup.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "@features/auth/lib/types";
import { useAppDispatch, useAppSelector, useActions } from "@hooks/index";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
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
  const { error, loading, loggedInUser } = useAppSelector(selectAuthData);
  const { setErrorToNull } = useActions();

  useEffect(() => {
    if (error) toast.error(error, { position: "bottom-right" });

    return () => {
      setErrorToNull();
    };
  }, [error, setErrorToNull]);

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
          id="name"
          label="Full Name"
          placeholder="Your Full Name"
          errors={errors.name && errors.name.message}
          {...register("name")}
        />
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="Your Email Address"
          errors={errors.email && errors.email.message}
          {...register("email")}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
          errors={errors.password && errors.password.message}
          {...register("password")}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Re-Enter Password"
          errors={errors.confirmPassword && errors.confirmPassword.message}
          {...register("confirmPassword")}
        />
        <Button
          disabled={isSubmitting || loading}
          className="mt-6 gap-3 hover:bg-gradient-to-t hover:from-green-500 hover:to-green-800"
          type={ButtonEnum.Primary}
        >
          {loading ? "Signing Up..." : "SIGN UP"}{" "}
          {loading && <ClipLoader color="#be7c18" size={24} />}
        </Button>
      </form>
      <AuthenticationNavigation page={AuthenticationPagesEnum.Signup} />
    </div>
  );
};

export default LoginForm;
