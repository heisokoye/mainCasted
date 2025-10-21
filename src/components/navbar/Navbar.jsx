import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { FaTimes, FaBars } from 'react-icons/fa';
const Navbar = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div >
        <nav className='w-full bg-transparent z-50 text-white fixed top-0 left-0'>
           <div className=' mx-auto w-[90%] p-2 justify-between flex items-center'>
                <div> {/* Logo Section */}
                    <Link to={"/"}>
                        <img src="./whiteLogo.png" alt="Casted Logo" 
                        className='h-20 mt-2 mb-2 '
                        />
                    </Link>
                </div>

                    {/* Mobile nav */}
                <div className='hidden md:flex lg:flex'>
                    <ul className='flex gap-[1rem] '>
                        <li> <Link to={"/"}>Home</Link></li>
                        <li> <Link to={"/blog"}>Blog</Link> </li>
                        <li><Link to={"/about"}> About</Link></li>
                         <li><Link to={"/contact"}> Contact</Link></li>
                        <li><Link to={"/admin"}> Admin</Link></li>
                    </ul>
                </div>

                {/* Hamburger Menu */}
                <div className='md:hidden lg:hidden relative z-50 '>
                    <button  className="cursor-pointer" onClick ={()=> setIsOpen(!isOpen)}>
                        {isOpen ? (<FaTimes size={20} color='black'/>) : (<FaBars size={20} />)}
                    </button>
                </div>

                {/* Mobile Menu Items */}
                <div className={` ${isOpen ? "flex" : "hidden"}  absolute bg-white top-[0] left-0 w-full h-screen  md:hidden lg:hidden `}>
                    <ul className='flex flex-col w-full text-black items-center space-y-20 py-20 px-6  '>
                        <li className='font-medium'> <Link to={"/"} onClick={()=> setIsOpen(false)}>Home</Link></li>
                        <li className='font-medium'> <Link to={"/blog"} onClick={()=> setIsOpen(false)}>Blog</Link> </li>
                        <li className='font-medium'><Link to={"/about"} onClick={()=> setIsOpen(false)}> About</Link></li>
                        <li className='font-medium'><Link to={"/contact"} onClick={()=> setIsOpen(false)}> Contact</Link></li>
                        <li className='font-medium'><Link to={"/admin"} onClick={ ()=> setIsOpen(false)}> Admin</Link></li>
                    </ul>
                </div>
           </div>
        </nav>

        <div> {children}</div>

    </div>
  )
}

export default Navbar