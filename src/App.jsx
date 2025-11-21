// Import necessary React modules and routing utilities
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {useEffect} from "react";


// Import shared components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import Loader from "./components/loader/Loader";
import AnalyticsTracker from "./components/analytics/AnalyticsTracker";

// Eager-load Home for faster FCP/LCP on the landing route; keep others lazy
import Home from "./pages/home/Home";
import { messaging } from "./Firebase";
import { onMessage, getToken } from "firebase/messaging";

const Blog = lazy(() => import("./pages/blog/Blog"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const About = lazy(() => import("./pages/about/About"));
const Dashboard = lazy(() => import("./pages/admin/adminDashboard/Dashboard"));
const SinglePost = lazy(() => import("./pages/blog/SinglePost"));

const VAPID_KEY = "BO6gTLciyTn4U3v9h5Z7RIcRcFjMjkMNZhSfMBRNhhps8_ELBbnzrug9rGaIbBVfbMDbmtN_0Ha5Bm5kcuR9Pfw";

const generateTokenAndSendToServer = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (currentToken) {
      console.log('FCM Token:', currentToken);
      
      // *** SEND TOKEN TO YOUR BACKEND ***
      // You'd also send the current user's ID
      await fetch("https://fcm-server-sigma.vercel.app/store-token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: currentToken
        })
      });

    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

const App = () => {
  

  useEffect(()=>{
    generateTokenAndSendToServer();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      payload.notification.body
    });
  }, []);
  return (
    // Enables routing throughout the app
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsTracker />
       
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
