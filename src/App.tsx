import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import LandingPage from "./pages/landingPage";
import DashboardLayout from "./components/layout/DashboardLayout";

// Auth Features
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";

// Student Features
import ProfilePage from "./features/student/pages/ProfilePage";
import BookingsPage from "./features/student/pages/BookingsPage";
import FindMentorsPage from "./features/student/pages/FindMentorsPage";
import MentorDetailsPage from "./features/student/pages/MentorDetailsPage";

// Admin Features
import GetPendingMentors from "./features/admin/pages/PendingMentorsPage";

// Mentor Features
import MentorDashboardPage from "./features/mentor/pages/MentorDashboardPage";
import MentorSessionPage from "./features/mentor/pages/MentorSessionPage";
import Otp from "./features/auth/pages/Otp";
import RegisterForm from "./features/auth/components/RegisterForm";
import CreateMentorProfile from "./features/mentor/components/CreateMentorProfile";
import MentorProfilePage from "./features/mentor/pages/MentorProfile";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        {/* AUTH Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />}>
            <Route index element={<RegisterForm />} />
            <Route path="verify-otp" element={<Otp />} />
          </Route>
          {/* ********************************* */}
          {/* User Routes  */}`
          <Route
            path="/user/dashboard"
            element={<DashboardLayout role="student" />}
          >
            <Route path="profile" element={<ProfilePage />} />
            <Route path="mybookings" element={<BookingsPage />} />
            <Route path="mentors" element={<FindMentorsPage />} />
            <Route path="mentors/:id" element={<MentorDetailsPage />} />
          </Route>
          {/* ********************************* */}
          {/* Mentor Routes */}
          <Route path="/mentor/createProfile" element={<CreateMentorProfile />} />
          <Route
            path="/mentor/dashboard"
            element={<DashboardLayout role="mentor" />}
          >
            <Route index element={<MentorDashboardPage />} />

            <Route path="sessions" element={<MentorSessionPage />} />
            <Route path="messages" element={<div>Messages</div>} />
            <Route path="profile" element={<MentorProfilePage/>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
          {/* ********************************* */}
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={<DashboardLayout role="admin" />}
          >
            <Route path="pending/mentors" element={<GetPendingMentors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
