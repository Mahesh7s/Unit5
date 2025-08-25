// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UploadPodcast from "./pages/UploadPodcast";
import ManagePodcasts from "./pages/ManagePodcasts";
import PodcastPlayer from "./pages/PodcastPlayer";
import MyLibrary from "./pages/MyLibrary";
import Browse from "./pages/Browse";
import Subscriptions from "./pages/Subscriptions";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/podcast/:id" element={<PodcastPlayer />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            {/* Listener Routes */}
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/subscriptions" element={<Subscriptions />} />
            <Route path="/dashboard/library" element={<MyLibrary />} />

            {/* Creator Routes */}
            <Route path="/dashboard/upload" element={<UploadPodcast />} />
            <Route path="/dashboard/manage" element={<ManagePodcasts />} />

            {/* Admin Routes */}
            {/* Example: admin overview & analytics pages can be added here */}
            {/* <Route path="/dashboard/overview" element={<AdminOverview />} /> */}
            {/* <Route path="/dashboard/analytics" element={<Analytics />} /> */}
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
