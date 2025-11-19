// Import necessary React modules and routing utilities
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Import shared components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import Loader from "./components/loader/Loader";
import AnalyticsTracker from "./components/analytics/AnalyticsTracker";
import Notifications from "./components/notifications/Notifications";

// Eager-load Home for faster FCP/LCP on the landing route; keep others lazy
import Home from "./pages/home/Home";
const Blog = lazy(() => import("./pages/blog/Blog"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const About = lazy(() => import("./pages/about/About"));
const Dashboard = lazy(() => import("./pages/admin/adminDashboard/Dashboard"));
const SinglePost = lazy(() => import("./pages/blog/SinglePost"));



const App = () => {
  return (
    // Enables routing throughout the app
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsTracker />
        <Notifications />
        {/* Navbar appears on all pages */}
        <Navbar />

      {/* Suspense shows a loader while lazy components are being fetched */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Loader /> {/* Custom loading spinner component */}
          </div>
        }
      >
        {/* Define all application routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />

          {/* Protected route (requires authentication) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Dynamic route for individual blog posts */}
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </Suspense>

      {/* Footer appears on all pages */}
      <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
