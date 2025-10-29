import React, {useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTimes, FaSun, FaMoon, FaBars } from 'react-icons/fa';
const Navbar = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const[isHome, setIsHome] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsHome(location.pathname === "/");
    }, [location]);

   

    


    
  return (
    <div >
        <nav className={`${isHome? "text-orange-400": "" } w-full bg-white  z-50  h-[3.5rem] md:h-[4.5rem] lg:h-[4.5rem] fixed  top-0 left-0`}>
           <div className=' mx-auto pr-5  md:w-[90%] lg:w-[95%] p-2 justify-between flex items-center'>
                <div> {/* Logo Section */}
                    <Link to={"/"}>
                        <img src= "./orangeLogo.png" alt="Casted Logo" 
                        className=' h-10  w-25 md:w-35 lg:w-40 lg:h-auto md:h-15  '
                        />
                    </Link>
                </div>

                    {/* Mobile nav */}
                <div className='hidden md:flex lg:flex'>
                    <ul className= {`${isHome ? "text-orange-400" : "text-orange-400"} font-medium flex gap-[1rem]`}>
                        <li className='transform transition-transform duration-300 hover:scale-103'> <Link to={"/"}>Home</Link></li>
                        <li className='transform transition-transform duration-300 hover:scale-103'> <Link to={"/blog"}>Blog</Link> </li>
                        <li className='transform transition-transform duration-300 hover:scale-103'><Link to={"/about"}> About</Link></li>
                        <li className='transform transition-transform duration-300 hover:scale-103'><Link to={"/admin"}> Admin</Link></li>
                        
                    </ul>
                </div>

                {/* Hamburger Menu */}
                <div className='md:hidden lg:hidden relative z-50 '>
                    <button  className="cursor-pointer" onClick ={()=> setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <FaTimes size={17} className={isHome ? 'text-orange-400' : 'text-orange-400'} />
                        ) : (
                            <FaBars size={17} className={isHome ? 'text-orange-400' : 'text-orange-400'} />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Items */}
                <div className={` ${isOpen ? "flex" : "hidden"}  absolute text-orange-400 bg-white top-[0] left-0 w-full h-screen  md:hidden lg:hidden `}>
                    <ul className='flex flex-col w-full  mx-auto items-center space-y-20 py-40 px-6  '>
                        <li className='font-medium transform transition-transform duration-300 hover:scale-103'> <Link to={"/"} onClick={()=> setIsOpen(false)}>Home</Link></li>
                        <li className='font-medium transform transition-transform duration-300 hover:scale-103'> <Link to={"/blog"} onClick={()=> setIsOpen(false)}>Blog</Link> </li>
                        <li className='font-medium transform transition-transform duration-300 hover:scale-103'><Link to={"/about"} onClick={()=> setIsOpen(false)}> About</Link></li>
                        <li className='font-medium transform transition-transform duration-300 hover:scale-103'><Link to={"/admin"} onClick={ ()=> setIsOpen(false)}> Admin</Link></li>
                    </ul>
                </div>

                
           </div>
        </nav>

        <div> {children}</div>

    </div>
  )
}

export default Navbar