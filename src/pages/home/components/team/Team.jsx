import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Team = () => {
  const team = [
    { id: 1, avatar: "/iskeel.png", name: "Iskeel Atolagbe", title: "Executive Director" },
    { id: 2, avatar: "/khalid.webp", name: "Adeboye Khalid", title: "Managing Director" },
    { id: 3, avatar: "/seyi.webp", name: "Oluwaseyifunmi Dosunmu", title: "Director Emeritus" },
    { id: 4, avatar: "/nifemi.webp", name: "Adesanya Olorunnifemi", title: "Lead Designer" },
    { id: 5, avatar: "/Adex.webp", name: "Adeniyi Ademide", title: "Social Media Director" },
    { id: 6, avatar: "/daniel.webp", name: "Adekoya Daniel", title: "Lead Videographer" },
    { id: 7, avatar: "/Tolu.webp", name: "Tolulope Ogunbiyi", title: "Lead Photographer" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Navigation
  const nextSlide = useCallback(() => setCurrentIndex((prev) => (prev + 1) % team.length), [team.length]);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + team.length) % team.length);

  // Detect mobile
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 640);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Auto-slide on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile, nextSlide]);

  const currentMember = team[currentIndex];

  // Motion variants for slide animation
  const slideVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  return (
    <section className="py-14 border-b border-b-gray-200">
      <div className="mx-auto w-[90%] text-center">
        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Meet our <span className="text-orange-500">team</span>
        </h3>

        <div className="mt-12">
          {/* Desktop Grid */}
          
          {!isMobile && (
            <div className="flex flex-wrap justify-center gap-10">
              {team.map((item) => (
                <div
                  key={item.id}
                  className="w-64  rounded-2xl  flex flex-col items-center p-4"
                >
                  <div className="w-32 h-32">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-full h-full rounded-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h4 className="text-gray-800 font-semibold mt-4 text-center">{item.name}</h4>
                  <p className="text-orange-600 text-center mt-1">{item.title}</p>
                  {/* Optional: social links */}
                  <div className="flex gap-3 mt-2">
                   
                  </div>
                </div>
              ))}
            </div>
          )}


          {/* Mobile Slider */}
          {isMobile && (
            <div className="relative w-full max-w-xs mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-32 h-32">
                    <img
                      src={currentMember.avatar}
                      className="w-full h-full rounded-full object-cover object-center"
                      alt={currentMember.name}
                      loading={currentIndex === 0 ? "eager" : "lazy"}
                      fetchpriority={currentIndex === 0 ? "high" : "auto"}
                      decoding="async"
                    />
                  </div>
                  <h4 className="text-gray-700 font-semibold mt-2">{currentMember.name}</h4>
                  <p className="text-orange-600">{currentMember.title}</p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                aria-label="Previous team member"
                className="absolute top-1/2 left-0 -translate-y-1/2 p-2 bg-gray-200 rounded-full"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next team member"
                className="absolute top-1/2 right-0 -translate-y-1/2 p-2 bg-gray-200 rounded-full"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
