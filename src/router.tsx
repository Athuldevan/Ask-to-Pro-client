import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import Register from "./pages/auth/register";
import CompleteProfilePage from "./pages/auth/ProfileCompletePage";

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
]);

export default router;
