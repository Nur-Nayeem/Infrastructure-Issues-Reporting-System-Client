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
    Component: DashboardLayout,
  },
]);

export default router;
