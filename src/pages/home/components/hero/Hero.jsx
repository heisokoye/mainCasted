import React from "react"
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
    return (
        <div> 
                <div className="absolute inset-0 bg-black/60"> </div>

                <section className="hero relative z-10 flex  mt-[10rem] items-center ">
                    <div className=" gap-10 flex-col md:items-start"> 
                        <h1 className="text-xl  sm:text-2xl md:text-4xl  lg:text-5xl items-center justify-start text-left w-[17rem]  md:w-[25rem]  lg:w-[35rem] flex">Discover the latest social events,  gossip, and more.</h1>
                        <a href="https://whatsapp.com/channel/0029Vb56767I1rckrGeYrs1E "  
                            
                            rel = "noopener noreferrer"
                            target="_blank"
                            className= "inline-block border black p-1 mt-4 rounded-lg cursor-pointer hover:bg-white text-black transition-ease"
                        > Subscribe
                        </a>
                    </div>   
                </section>
        </div>
    )
}

export default Hero