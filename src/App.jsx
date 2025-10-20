import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/home/Home"
import Blog from "./pages/blog/Blog"
import Admin from "./pages/admin/Admin"
import Contact from "./pages/contact/Contact"
import Navbar from "./components/navbar/Navbar"

const App=()=>{
  return (
    <BrowserRouter> 
      <Navbar>
        <div> 
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/admin" element={<Admin/>} />
          </Routes>
        </div>
      </Navbar>

    </BrowserRouter>
  )
}

export default App