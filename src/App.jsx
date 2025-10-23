import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/home/Home"
import Blog from "./pages/blog/Blog"
import Admin from "./pages/admin/Admin"
import Contact from "./pages/contact/Contact"
import Navbar from "./components/navbar/Navbar"
import About from "./pages/about/About"
import Dashboard from "./pages/admin/adminDashboard/Dashboard"

const App=()=>{
  return (
    <BrowserRouter> 
      
      <Navbar >
        <div>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </div>
      </Navbar>

    </BrowserRouter>
  )
}

export default App