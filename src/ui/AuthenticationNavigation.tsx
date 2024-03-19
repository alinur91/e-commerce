import { AuthenticationPages } from "@ts-types/enums";
import { Link } from "react-router-dom";

type AuthenticationNavigationProps = {
  page: AuthenticationPages;
};

const AuthenticationNavigation = ({ page }: AuthenticationNavigationProps) => {
  return (
    <>
      {page === AuthenticationPages.Login && (
        <>
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link className="text-blue-500 font-bold" to="/signup">
              Sign up
            </Link>{" "}
          </p>{" "}
          <Link className="hover:underline cursor-default" to="/reset-password">
            <p className="text-gray-400">Forgot Your Password?</p>
          </Link>
        </>
      )}

      {(page === AuthenticationPages.Signup ||
        page === AuthenticationPages.Reset_Password) && (
        <>
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link className="text-blue-500 font-bold" to="/signin">
              Sign in
            </Link>{" "}
          </p>{" "}
        </>
      )}
    </>
  );
};

export default AuthenticationNavigation;
