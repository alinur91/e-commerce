import { logo } from "@data/index";
import { AuthenticationPages, ButtonEnum } from "@ts-types/enums";
import { AuthenticationNavigation, Button, Input } from "@ui/index";
import { signin } from "@features/auth/api/signin.api";
import { useForm } from "react-hook-form";
import { TSignInSchema, signInSchema } from "@features/auth/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAppDispatch, useActions, useAppSelector } from "@hooks/index";
import { selectAuthData } from "@features/auth/slices/selector";
import { ClipLoader } from "react-spinners";
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

  const onSubmit = async (data: TSignInSchema) => {
    const { email, password } = data;
    dispatch(signin({ email, password }));
  };

  return (
    <div className=" flex flex-1 flex-col gap-2 bg-white px-14 py-16">
      <img className="h-24 w-24" src={logo} alt="" />
      <h1 className="text-2xl font-bold uppercase">Enjoy the moment</h1>
      <p className="text-gray-400">
        Sign in now to continue your marketing journey with us
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="Email Address"
          type="email"
          errors={errors.email && errors.email.message}
          {...register("email")}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          errors={errors.password && errors.password.message}
          {...register("password")}
        />
        <Button
          disabled={isSubmitting}
          className="mt-6 gap-3 hover:bg-gradient-to-t hover:from-green-500 hover:to-green-800"
          type={ButtonEnum.Primary}
        >
          {loading ? "Signing in..." : "SIGN IN"}{" "}
          {loading && <ClipLoader color="#be7c18" size={24} />}
        </Button>
      </form>
      <AuthenticationNavigation page={AuthenticationPages.Login} />
    </div>
  );
};

export default SigninForm;
