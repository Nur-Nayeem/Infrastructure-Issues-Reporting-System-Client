import LoadingSpinner from "../../components/Shared/Loader";
import useRole from "../../hooks/useRole";
import { AdminDashboardPage } from "../AdminDashBoard/AdminDashboardPage";
import { DashboardPage } from "../CitizenDashboard/DashBoard";
import { StaffDashboardPage } from "../StaffDashBoard/StaffDashboardPage";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <LoadingSpinner />;
  } else if (role === "admin") {
    return <AdminDashboardPage />;
  } else if (role === "staff") {
    return <StaffDashboardPage />;
  } else {
    return <DashboardPage />;
  }
};

export default DashboardHome;
