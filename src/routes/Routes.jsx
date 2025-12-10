import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import IssuePage from "../pages/IssuesPage/IssuePage";
import IssueDetails from "../pages/IssueDetailsPage/IssueDetails";
import IssueDetailsPage from "../pages/IssueDetailsPage/TestDetails";

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
]);

export default router;
