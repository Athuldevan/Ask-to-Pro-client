import { BrowserRouter, Route, Routes } from "react-router";
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

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />}>
            <Route
              path="otp-pending"
              element={<p>OTP Verification sending page</p>}
            />
          </Route>

          <Route path="/user/dashboard" element={<DashboardLayout role="student" />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="mybookings" element={<BookingsPage />} />
            <Route path="mentors" element={<FindMentorsPage />} />
            <Route path="mentors/:id" element={<MentorDetailsPage />} />
          </Route>

          <Route path="/mentor/dashboard" element={<DashboardLayout role="mentor" />}>
            <Route
              index
              element={<MentorDashboardPage />}
            />
            {/* Placeholder routes for now */}
            <Route path="sessions" element={<div>My Sessions</div>} />
            <Route path="messages" element={<div>Messages</div>} />
            <Route path="profile" element={<div>Profile</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>

          <Route path="/admin/dashboard" element={<DashboardLayout role="admin" />}>
            <Route path="pending/mentors" element={<GetPendingMentors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
