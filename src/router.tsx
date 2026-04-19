import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import Register from "./pages/auth/register";
import CompleteProfilePage from "./pages/auth/ProfileCompletePage";
import DashboardPage from "./pages/dashboard";
import AppLayout from "./components/layout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/complete-profile",
    element: <CompleteProfilePage />,
  },
  {
    Component: AppLayout,
    children: [
      {
        path: "/dashboard",
        Component: DashboardPage,
      },
    ],
  },
]);

export default router;
