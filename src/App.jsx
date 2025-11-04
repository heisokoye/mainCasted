import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import Loader from "./components/loader/Loader";

const Home = lazy(() => import("./pages/home/Home"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const About = lazy(() => import("./pages/about/About"));
const Dashboard = lazy(() => import("./pages/admin/adminDashboard/Dashboard"));
const SinglePost = lazy(() => import("./pages/blog/SinglePost"));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar>
        <div>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen">
                <Loader />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/post/:id" element={<SinglePost />} />
            </Routes>
          </Suspense>
        </div>
      </Navbar>

      <Footer />
    </BrowserRouter>
  );
};

export default App