import { AuthRoutesEnum } from "@features/auth/lib/types";
import { AuthenticationPagesEnum } from "@ts-types/enums";
import { Link } from "react-router-dom";

type AuthenticationNavigationProps = {
  page: AuthenticationPagesEnum;
};

const AuthenticationNavigation = ({ page }: AuthenticationNavigationProps) => {
  return (
    <>
      {page === AuthenticationPagesEnum.Signin && (
        <>
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link className="font-bold text-blue-500" to={AuthRoutesEnum.Signup}>
              Sign up
            </Link>{" "}
          </p>{" "}
          <Link
            className="cursor-default hover:underline"
            to={AuthRoutesEnum.ResetPassword}
          >
            <p className="text-gray-400 hover:text-gray-500">
              Forgot Your Password?
            </p>
          </Link>
        </>
      )}

      {(page === AuthenticationPagesEnum.Signup ||
        page === AuthenticationPagesEnum.Reset_Password) && (
        <>
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link className="font-bold text-blue-500" to={AuthRoutesEnum.Signin}>
              Sign in
            </Link>{" "}
          </p>{" "}
        </>
      )}
    </>
  );
};

export default AuthenticationNavigation;
