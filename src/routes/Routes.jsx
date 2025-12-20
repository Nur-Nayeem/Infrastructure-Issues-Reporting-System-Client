import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import IssuePage from "../pages/IssuesPage/IssuePage";
import IssueDetails from "../pages/IssueDetailsPage/IssueDetails";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashBoardLayout";
import { MyIssuesPage } from "../pages/CitizenDashboard/MyIssues";
import { ReportIssuePage } from "../pages/CitizenDashboard/ReportIssuePage";
import { ProfilePage } from "../pages/CitizenDashboard/Profile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashboardHome from "../pages/DashBoardHome/DashBoardHome";
import { AdminAllIssuesPage } from "../pages/AdminDashBoard/AdminAllIssuesPage";
import { AdminManageUsersPage } from "../pages/AdminDashBoard/AdminManageUsersPage";
import { AdminManageStaffPage } from "../pages/AdminDashBoard/AdminManageStaffPage";
import AdminPaymentsPage from "../pages/AdminDashBoard/AdminPaymentsPage";
import { StaffAssignedIssuesPage } from "../pages/StaffDashBoard/StaffAssignedIssuesPage";
import PaymentSuccess from "../pages/Payments/PaymentSuccess";
import PayemntCancel from "../pages/Payments/PayemntCancel";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-issues",
        element: <IssuePage />,
      },
      {
        path: "all-issues/:id",
        element: <IssueDetails />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cancel",
        element: <PayemntCancel />,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "user/my-issues",
        Component: MyIssuesPage,
      },
      {
        path: "user/report",
        Component: ReportIssuePage,
      },
      {
        path: "user/profile",
        Component: ProfilePage,
      },
      {
        path: "staff/assigned-issues",
        Component: StaffAssignedIssuesPage,
      },
      {
        path: "staff/profile",
        Component: ProfilePage,
      },
      {
        path: "admin/issues",
        Component: AdminAllIssuesPage,
      },
      {
        path: "admin/manage-users",
        Component: AdminManageUsersPage,
      },
      {
        path: "admin/manage-staff",
        Component: AdminManageStaffPage,
      },
      {
        path: "admin/payments",
        Component: AdminPaymentsPage,
      },
      {
        path: "admin/profile",
        Component: ProfilePage,
      },
    ],
  },
]);

export default router;
