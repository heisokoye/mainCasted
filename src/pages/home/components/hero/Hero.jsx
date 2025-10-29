import React, { useState, useEffect, useRef } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';



const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
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
        setDirection(-1);
        const isFirstSlide = currentSlide === 0;
        const newIndex = isFirstSlide ? preview.length - 1 : currentSlide - 1;
        setCurrentSlide(newIndex);
    };
    
    const nextSlide = () => {
        setDirection(1);
        const isLastSlide = currentSlide === preview.length - 1;
        const newIndex = isLastSlide ? 0 : currentSlide + 1;
        setCurrentSlide(newIndex);
    };
    
    const slideVariants = {
        hidden: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        visible: {
            x: '0%',
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeInOut' },
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' },
        }),
    };

    const textContainerVariants = {
        hidden: { opacity: 0 },
        visible: (direction) => ({
            opacity: 1,
            transition: {
                delayChildren: direction === 0 ? 1.5 : 0.4, // Longer delay on initial load
                staggerChildren: 0.1,
            },
        }),
        exit: { opacity: 0, transition: { duration: 0.2 } },
    };

    const textItemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { y: -20, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
    };

    const arrowVariants = {
        rest: { x: 0 },
        hover: { x: 8, transition: { type: 'spring', stiffness: 300 } }
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
            <div ref={heroRef} className='flex md:justify-between items-center justify-center h-full relative z-10 mx-auto w-[80%]'>
                <div>
                    <motion.h1 className='hero-text w-[25rem]  text-[2.1rem] md:text-4xl md:w-[30rem] lg:text-5xl lg:w-[35rem] text-white font-medium  ' 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}>
                        Discover the latest social events, gossips and more
                    </motion.h1>
                    <motion.button 
                        className='hero-text mt-4 bg-white text-amber-600 px-4 py-2 cursor-pointer rounded-lg shadow-lg flex items-center gap-2'
                        initial="rest"
                        whileHover="hover"
                        animate="rest"
                        variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.05 }
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                        <a href="https://whatsapp.com/channel/0029Vb56767I1rckrGeYrs1E" target='_blank' rel="noopener noreferrer" className='font-medium'>Subscribe</a>
                        <motion.div variants={arrowVariants}><BsArrowRight /></motion.div>
                    </motion.button>
                </div>

                    {/*Slider for blogs preview */}
                <div className='hidden lg:flex items-center justify-center'>
                    <div ref={sliderRef} className="relative xl:w-[50rem] h-[30rem] rounded-lg shadow-2xl overflow-hidden">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentSlide}
                                custom={direction}
                                variants={slideVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute w-full h-full"
                            >
                                <img src={preview[currentSlide].pictures} alt={preview[currentSlide].titles} className="w-full h-full object-cover"/>
                                <motion.div 
                                    className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg"
                                    variants={textContainerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    custom={direction}
                                >
                                    <motion.h3 variants={textItemVariants} className="text-white text-xl font-semibold mb-2">{preview[currentSlide].titles}</motion.h3>
                                    <motion.p variants={textItemVariants} className="text-gray-200">{preview[currentSlide].excerpt}</motion.p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                        {/* Left Arrow */}
                        <div onClick={prevSlide} className='absolute top-[50%] -translate-y-1/2 left-2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20'>
                            <BsArrowLeft size={20} />
                        </div>
                        {/* Right Arrow */}
                        <div onClick={nextSlide} className='absolute top-[50%] -translate-y-1/2 right-2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20'>
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