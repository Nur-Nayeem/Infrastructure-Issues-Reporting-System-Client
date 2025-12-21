import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Forbidden from "../../components/Shared/Forbidden";
import LoadingSpinner from "../../components/Shared/Loader";

// import Loading from "../components/Loading/Loading";
// import Forbidden from "../components/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
