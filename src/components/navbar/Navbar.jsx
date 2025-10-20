//import necessary dependencies
import React, {useState} from "react"
import {Link, useLocation} from "react-router-dom"
import {FaBars, FaTimes} from "react-icons/fa"
import "../../App.css"

const Navbar =({children})=>{
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const isHome = location.pathname === "/"
    
    return(
        <div className= {` ${isHome ? "bg-[url('/101.jpg')] w-[100vw]   pb-130 h-[25rem] bg-cover md:bg-cover   text-white bg-no-repeat" : " pt-16"}`}>
            
            <nav className= {`w-full  fixed z-50 top-0 ${isHome  ? "bg-transparent " : "bg-transparent"} `}> 
                <div className="flex justify-between px-4 "> 
                    {/*Logo Link to direct you to home page when clicked on */}
                    <div className ="md:w-[10rem]  w-[8rem] h-[5rem]" >
                        <Link to="/">
                            <img
                                src={`${isHome? "/whiteLogo.png" : "/orangeLogo.png"}`}
                                className="h-full w-full object-cover object-center"
                                style={{
                                    objectPosition: "center",
                                    transform: "scale(0.8)"
                                }}
                                
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className= {` gap-10  md:flex hidden items-center ${isHome ? "text-white" : "text-orange-500"}`}> 
                        <Link to="/" className="link-underline ">Home</Link>
                        <Link to="/about" className="link-underline sprite-graffiti-font">About</Link>
                        <Link to="/blog" className="link-underline sprite-graffiti-font">Blog</Link>
                        <Link to="/contact" className="link-underline sprite-graffiti-font">Contact</Link>
                        <Link to="/admin" className="link-underline sprite-graffiti-font">Admin</Link>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden flex items-center relative z-50"> 
                        <button
                            className="cursor-pointer text-black p-2"
                            aria-label="Toggle menu"
                            onClick={() => setIsOpen(prev => !prev)}
                        >
                            {isOpen ? (
                                <FaTimes size={25} />
                            ) : (
                                <FaBars size={25} />
                            )}  
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className = {`md:hidden ${isOpen ? "flex": "hidden"} absolute top-[0rem] z-20 left-0 w-full bg-white font-medium text-black h-screen flex-col items-center pb-4 `}> 
                           <div className ="flex flex-col space-y-20 py-20 px-6">
                                <Link to="/" className="link-underline  text-xl" onClick={() => setIsOpen(false)}>Home</Link>
                                <Link to="/about" className="link-underline text-xl sprite-graffiti-font" onClick={() => setIsOpen(false)}>About</Link>
                                <Link to="/blog" className="link-underline  text-xl sprite-graffiti-font" onClick={() => setIsOpen(false)}>Blog</Link>
                                <Link to="/contact" className="link-underline text-xl sprite-graffiti-font" onClick={() => setIsOpen(false)}>Contact</Link>
                                <Link to="/admin" className="link-underline text-xl sprite-graffiti-font" onClick={() => setIsOpen(false)}>Admin</Link>
                            </div>
                    </div>
                </div>
            </nav>

            <div className="pt-30 pb-20 md:pt-30  lg:pt-30"> {children}</div>
        </div>
    )
}

export default Navbar
