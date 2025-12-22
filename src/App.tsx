import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/loginpage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile";
import MyBookingsPage from "./pages/bookings";
import FindMentorsPage from "./pages/findMentors";
import MentorDetailsPage from "./pages/MentorDetails";
import GetPendingMentors from "./features/admin/pages/PendingMentorsPage";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/user/dashboard" element={<Dashboard role="student" />}>
            <Route path="profile" element={<Profile />} />
            <Route path="mybookings" element={<MyBookingsPage />} />
            <Route path="mentors" element={<FindMentorsPage />} />
            <Route path="mentors/:id" element={<MentorDetailsPage />} />
          </Route>

          <Route path="/mentor/dashboard" element={<Dashboard role="mentor" />}>
            <Route
              index
              element={
                <div className="p-4 text-center text-lg text-muted-foreground">
                  Mentor Dashboard - Coming Soon
                </div>
              }
            />
            {/* Placeholder routes for now */}
            <Route path="sessions" element={<div>My Sessions</div>} />
            <Route path="messages" element={<div>Messages</div>} />
            <Route path="profile" element={<div>Profile</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>

          <Route path="/admin/dashboard" element={<Dashboard role="admin" />}>
            <Route path="pending/mentors" element={<GetPendingMentors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
