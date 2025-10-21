import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

const Hero = () => {
  return (
    <div>
        <section className='bg-[url("/room.jpg")] bg-cover w-full h-[80vh] '>
            <div className='inset-0 absolute bg-black/60'></div>
            <div className='flex  items-center align-left h-full relative z-10 mx-auto w-[80%]'>
                <div>
                    <h1 className='w-[20rem]  text-xl md:text-2xl md:w-[25rem] lg:text-4xl lg:w-[35rem] text-white font-md '>
                        Discover the latest social events, gossips and more
                    </h1>

                    <button className='mt-4  bg-white text-amber-600 px-3 py-2 cursor-pointer rounded-lg '>
                        <a href="https://whatsapp.com/channel/0029Vb56767I1rckrGeYrs1E" target='_blank' rel= "noopener noreferrer" className='font-medium '>Subscribe  <BsArrowRight className='inline hover:translate-x-2 hover:transition-transform hover:duration-300 '/></a>
                    </button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Hero