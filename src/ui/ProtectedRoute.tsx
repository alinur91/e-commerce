import { selectAuthData } from "@features/auth/slices/selector";
import { useAppSelector } from "@hooks/index";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { loading, loggedInUser } = useAppSelector(selectAuthData);

  // 2. If there is NO authenticated user, redirect to the /signin

  useEffect(() => {
    if (!loggedInUser && !loading) navigate("/signin");
  }, [loggedInUser, loading, navigate]);

  // 4. If there IS a user, render the app
  if (loggedInUser) return children;
}

export default ProtectedRoute;
