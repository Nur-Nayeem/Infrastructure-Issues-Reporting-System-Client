import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
