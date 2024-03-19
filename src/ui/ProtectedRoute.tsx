import { selectAuthData } from "@features/auth/slices/selector";
import { useAppSelector } from "@hooks/useAppSelector";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { loading, loggedInUser } = useAppSelector(selectAuthData);
  // 2. If there is NO authenticated user, redirect to the /signin
  
  useEffect(
    function () {
      if (!loggedInUser && !loading) navigate("/signin");
    },
    [loggedInUser, loading, navigate],
  );

  // 3. While loading, show a spinner
  if (loading) return <div>Spinnger</div>;

  // 4. If there IS a user, render the app
  if (loggedInUser) return children;
}

export default ProtectedRoute;
