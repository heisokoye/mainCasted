// Import necessary libraries and components
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'; // Icons for slider navigation
import { motion, AnimatePresence } from 'framer-motion'; // For animations

// Hero component definition
const Hero = () => {
    // State to track the current slide index
    const [currentSlide, setCurrentSlide] = useState(0);
    // State to track the direction of the slide transition (for animation)
    const [direction, setDirection] = useState(0);
    // Refs for DOM elements
    const heroRef = useRef(null);
    const sliderRef = useRef(null);

    // Data for the slider previews
    // Example of a commented-out slide
    // {
    //     pictures: "/101.jpg",
    //     titles: "Did you Know?",
    //     excerpt: "Casted! Publications began in the most unexpected way — a debate over a sex film sparked its creation. ",
    // },
    const preview = [
        {
            pictures: "/slider1.jpg ",
            titles: "NACOS & ENGINEERING INDUCTION CEREMONY",
            excerpt: "VC with ....",
        },
        {
            pictures: "/slider2.jpg ",
            titles: "NACOS & ENGINEERING INDUCTION CEREMONY",
            excerpt: "This is a short excerpt from blog post 3.",
        },
         {
            pictures: "/slider3.jpg ",
            titles: "NACOS & ENGINEERING INDUCTION CEREMONY",
            excerpt: "This is a short excerpt from blog post 3.",
        },
        {
            pictures: "/slider4.jpg ",
            titles: "NACOS & ENGINEERING INDUCTION CEREMONY",
            excerpt: "This is a short excerpt from blog post 3.",
        }
    
    ];
    
    // Function to go to the previous slide
    const prevSlide = () => {
        setDirection(-1); // Set direction to left
        const isFirstSlide = currentSlide === 0;
        const newIndex = isFirstSlide ? preview.length - 1 : currentSlide - 1;
        setCurrentSlide(newIndex);
    };
    
    // Function to go to the next slide
   const nextSlide = useCallback(() => {
        setDirection(1);
        const isLastSlide = currentSlide === preview.length - 1;
        const newIndex = isLastSlide ? 0 : currentSlide + 1;
        setCurrentSlide(newIndex);
    }, [currentSlide, preview.length]);
    
    // Animation variants for the slide transitions
    const slideVariants = {
        hidden: (direction) => ({
            x: direction > 0 ? '100%' : '-100%', // Enters from right or left
            opacity: 0,
            translateZ: 0,
        }),
        visible: {
            x: '0%', // Moves to the center
            opacity: 1,
            translateZ: 0,
            transition: { duration: 0.5, ease: 'easeInOut' },
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%', // Exits to right or left
            opacity: 0,
            translateZ: 0,
            transition: { duration: 0.5, ease: 'easeInOut' },
        }),
    };

    // Animation variants for the text container within the slide
    const textContainerVariants = {
        hidden: { opacity: 0 },
        visible: (direction) => ({
            opacity: 1,
            transition: {
                delayChildren: direction === 0 ? 1.5 : 0.4, // Longer delay on initial load for dramatic effect
                staggerChildren: 0.1, // Stagger the animation of child elements
            },
        }),
        exit: { opacity: 0, transition: { duration: 0.2 } },
    };

    // Animation variants for individual text items (title and excerpt)
    const textItemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { y: -20, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
    };

    // Animation variants for the arrow icon on the subscribe button
    const arrowVariants = {
        rest: { x: 0 },
        hover: { x: 8, transition: { type: 'spring', stiffness: 300 } } // Bounces on hover
    };

    // useEffect hook for automatic sliding
    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

  return (
    // Main container for the hero section
    <div className="w-full border-b border-gray-300">
        <section className='bg-white bg-cover w-full h-[50vh] md:h-[60vh] lg:h-[60vh] '>
            <div ref={heroRef} className='flex lg:justify-between  md:justify-center md:items-center items-center justify-center h-full relative z-10 mx-auto w-[80%]'>
                {/* Left side: Hero Text and Subscribe Button */}
                <div>
                    {/* Animated heading */}
                    <motion.h1 className='hero-text   text-3xl md:text-4xl md:w-full lg:text-5xl lg:w-140 text-orange-400 font-medium  '
                    initial={{ opacity: 0, y: -50 }} // Initial state
                    animate={{ opacity: 1, y: 0 }} // Animate to this state
                    transition={{ duration: 1.5, ease: 'easeInOut' }}>
                        Discover the latest social events, gossip and more.
                    </motion.h1>
                    {/* Animated subscribe button */}
                    <motion.button
                        className='hero-text mt-4 bg-white border text-amber-600 px-4 py-2 cursor-pointer rounded-lg shadow-lg flex items-center gap-2'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        whileHover="hover" // Trigger 'hover' variant on mouse over
                        variants={{
                            hover: { scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 15 } }
                        }}
                    >
                        <a href="https://whatsapp.com/channel/0029Vb56767I1rckrGeYrs1E" target='_blank' rel="noopener noreferrer" className='font-medium'>Subscribe</a>
                        {/* Animated arrow icon */}
                        <motion.div variants={arrowVariants}><BsArrowRight /></motion.div>
                    </motion.button>
                </div>

                {/* Right side: Image and blog preview slider (hidden on small screens) */}
                <div className='hidden  md:flex lg:flex items-center justify-center'>
                    <div ref={sliderRef} className="relative xl:w-200 h-120 rounded-lg shadow-2xl overflow-hidden">
                        {/* AnimatePresence handles the mounting and unmounting of slides */}
                        <AnimatePresence initial={false} custom={direction}>
                            {/* The motion.div represents a single slide */}
                            <motion.div
                                key={currentSlide} // Key is crucial for AnimatePresence to track items
                                custom={direction} // Pass direction to variants
                                variants={slideVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="absolute w-full h-full"
                            >
                                {/* Slide image */}
                                <img src={preview[currentSlide].pictures} alt={preview[currentSlide].titles} className="w-full h-full object-cover"/>
                                {/* Overlay with text content */}
                                <motion.div 
                                    className="absolute bottom-0 left-0 w-full p-4 `bg-gradient-to-t` from-black/70 to-transparent rounded-b-lg"
                                    variants={textContainerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    custom={direction}
                                >
                                    {/* Animated slide title */}
                                    <motion.h3 variants={textItemVariants} className="text-white text-xl font-semibold mb-2">{preview[currentSlide].titles}</motion.h3>
                                    {/* Animated slide excerpt */}
                                    <motion.p variants={textItemVariants} className="text-gray-200">{preview[currentSlide].excerpt}</motion.p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                        {/* Slider navigation arrows */}
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

// Export the component
export default Hero;
