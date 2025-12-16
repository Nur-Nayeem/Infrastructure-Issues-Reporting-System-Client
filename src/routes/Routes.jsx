import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import IssuePage from "../pages/IssuesPage/IssuePage";
import IssueDetails from "../pages/IssueDetailsPage/IssueDetails";
import IssueDetailsPage from "../pages/IssueDetailsPage/TestDetails";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashBoardLayout";
import { MyIssuesPage } from "../pages/CitizenDashboard/MyIssues";
import { ReportIssuePage } from "../pages/CitizenDashboard/ReportIssuePage";
import { ProfilePage } from "../pages/CitizenDashboard/Profile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashboardHome from "../pages/DashBoardHome/DashBoardHome";

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
        path: "details",
        element: <IssueDetailsPage />,
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
        element: <h2>StaffAssignedIssuesPage</h2>,
      },
      {
        path: "staff/profile",
        element: <h2>StaffProfilePage</h2>,
      },
      {
        path: "admin/issues",
        element: <h2>AdminAllIssuesPage</h2>,
      },
    ],
  },
]);

export default router;
