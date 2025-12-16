import useUser from "../../hooks/useUser";
import { AdminDashboardPage } from "../AdminDashBoard/AdminDashboardPage";
import { DashboardPage } from "../CitizenDashboard/DashBoard";
import { StaffDashboardPage } from "../StaffDashBoard/StaffDashboardPage";

const DashboardHome = () => {
  const { currentUser: user, userLoading } = useUser();
  console.log(user);

  if (userLoading) {
    return (
      <div className="h-96 flex justify-center items-center">
        <h2>Loading...</h2>
      </div>
    );
  } else if (user?.role === "admin") {
    return <AdminDashboardPage />;
  } else if (user?.role === "staff") {
    return <StaffDashboardPage />;
  } else {
    return <DashboardPage />;
  }
};

export default DashboardHome;
