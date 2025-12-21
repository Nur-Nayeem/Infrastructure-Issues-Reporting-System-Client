import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Forbidden from "../../components/Shared/Forbidden";
import LoadingSpinner from "../../components/Shared/Loader";

const StaffRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <LoadingSpinner />;
  }

  if (role !== "staff") {
    return <Forbidden />;
  }

  return children;
};

export default StaffRoute;
