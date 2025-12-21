import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/Loader";

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <LoadingSpinner />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};
export default PrivateRoute;
