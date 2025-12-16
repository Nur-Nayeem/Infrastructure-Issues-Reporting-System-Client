import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading)
    return (
      <div className="h-96 flex justify-center items-center">
        <h2>Loading...</h2>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return children;
};
export default PrivateRoute;
