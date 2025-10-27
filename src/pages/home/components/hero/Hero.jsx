import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';


const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroRef = useRef(null);
    const sliderRef = useRef(null);

    // Your existing preview data
    const preview = [
        {
            pictures: "/101.jpg",
            titles: "Did you Know?",
            excerpt: "Casted! Publications began in the most unexpected way — a debate over a sex film sparked its creation. ",
        },
        {
            pictures: "/2.jpeg ",
            titles: "Blog Post 2",
            excerpt: "This is a short excerpt from blog post 2.",
        },
        {
            pictures: "/3.jpg ",
            titles: "Blog Post 3",
            excerpt: "This is a short excerpt from blog post 3.",
        }
    ]
    
    // Functions to handle manual slide changes
    const prevSlide = () => {
        const isFirstSlide = currentSlide === 0;
        const newIndex = isFirstSlide ? preview.length - 1 : currentSlide - 1;
        setCurrentSlide(newIndex);
    };
    
    const nextSlide = () => {
        const isLastSlide = currentSlide === preview.length - 1;
        const newIndex = isLastSlide ? 0 : currentSlide + 1;
        setCurrentSlide(newIndex);
    };
    
    // Effect for automatic sliding
    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 8000); // Change slide every 8 seconds
        return () => clearInterval(slideInterval); // Cleanup interval on component unmount
    }, [currentSlide]);

  return (
    <div className="w-full">
        <section className='bg-[url("/room.jpg")] bg-cover w-full h-[80vh] '>
            <div className='inset-0 absolute bg-black/70'></div>
            <div ref={heroRef} className='flex md:justify-between items-center h-full relative z-10 mx-auto w-[80%]'>
                <div>
                    <h1 className='hero-text w-[20rem]  text-xl md:text-2xl md:w-[25rem] lg:text-4xl lg:w-[35rem] text-white font-md '>
                        Discover the latest social events, gossips and more
                    </h1>

                    <button className='hero-text mt-4  bg-white text-amber-600 px-3 py-2 cursor-pointer rounded-lg '>
                        <a href="https://whatsapp.com/channel/0029Vb56767I1rckrGeYrs1E" target='_blank' rel= "noopener noreferrer" className='font-medium '>Subscribe  <BsArrowRight className='inline hover:translate-x-2 hover:transition-transform hover:duration-300 '/></a>
                    </button>
                </div>

                    {/*Slider for blogs preview */}
                <div className='hidden lg:flex items-center justify-center'>
                    <div ref={sliderRef} className="relative xl:w-[50rem] h-[30rem] rounded-lg shadow-2xl overflow-hidden">
                        {/* Slide Content */}
                        <img src={preview[currentSlide].pictures} alt={preview[currentSlide].titles} className="w-full h-full object-cover rounded-lg"/>
                        {/* Text Overlay */}
                        <div className="slide-content absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
                            <h3 className="text-white text-xl font-semibold mb-2">{preview[currentSlide].titles}</h3>
                            <p className="text-gray-200">{preview[currentSlide].excerpt}</p>
                        </div>

                        {/* Left Arrow */}
                        <div onClick={prevSlide} className='absolute top-[50%] -translate-y-1/2 left-2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                            <BsArrowLeft size={20} />
                        </div>
                        {/* Right Arrow */}
                        <div onClick={nextSlide} className='absolute top-[50%] -translate-y-1/2 right-2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                            <BsArrowRight size={20}  />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}

export default Hero