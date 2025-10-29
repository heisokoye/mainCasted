import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Team = () => {

  const team = [
      {
          avatar: "/iskeel7.png",
          name: "Iskeel Atolagbe",
          title: "Executive Director",
          linkedin: "javascript:void(0)",
          twitter: "javascript:void(0)",
      },
      {
        avatar: "https://randomuser.me/api/portraits/women/79.jpg",
        name: "Khalid Adeboye",
        title: "Managing Director", 
        linkedin: "javascript:void(0)",
        twitter: "javascript:void(0)",
      },
        {
            avatar: "/seyi5.png",
            name: "Oluwaseyifunmi Dosunmu",
            title: "Director Emeritus",
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
        },
        {
            avatar: "https://randomuser.me/api/portraits/women/63.jpg",
            name: "Adex",
            title: "Head of designers",
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
        },
        {
            avatar: "https://randomuser.me/api/portraits/men/86.jpg",
            name: "Daniel",
            title: "Product designer",
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
        },
        {
            avatar: "https://randomuser.me/api/portraits/men/46.jpg",
            name: "Tolu",
            title: "Product manager",
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
        },
    ]

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % team.length);
    }, [team.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + team.length) % team.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // Only auto-slide on smaller screens
            if (window.innerWidth < 640) {
                nextSlide();
            }
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [nextSlide]);

    const currentTeamMember = team[currentIndex];


    return (
    <section className="py-14 border-b  border-b-gray-200">
      <div className="mx-auto w-[90%] ">
        <div className="max-w-screen-3xl mx-auto  px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                Meet our <span className="text-orange-500">team</span>
            </h3>
          </div>
          <div className="mt-12 relative">
            {/* Desktop Grid View */}
            <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {
                team.map((item, idx) => (
                  <li key={idx} className="hidden sm:block">
                    <div className="w-32 h-32 mx-auto">
                      <img
                        src={item.avatar}
                        className="w-full h-full rounded-full object-cover object-center"
                        alt=""
                      />
                    </div>
                    <div className="mt-2">
                        <h4 className="text-gray-700 font-semibold sm:text-lg">{item.name}</h4>
                        <p className="text-orange-600">{item.title}</p>
                    </div>
                  </li>
                ))
              }
            </ul>
            {/* Mobile Slider View */}
            <div className="sm:hidden relative">
                <div className="w-32 h-32 mx-auto">
                    <img
                    src={currentTeamMember.avatar}
                    className="w-full h-full rounded-full object-cover object-center transition-transform duration-500 ease-in-out"
                    alt={currentTeamMember.name}
                    key={currentIndex} // Re-trigger animations on change
                    />
                </div>
                <div className="mt-2">
                    <h4 className="text-gray-700 font-semibold sm:text-lg">{currentTeamMember.name}</h4>
                    <p className="text-orange-600">{currentTeamMember.title}</p>
                </div>
                <button onClick={prevSlide} className="absolute cursor-pointer top-1/2 -translate-y-1/2 left-0 p-2 bg-gray-200 rounded-full">
                    <FaChevronLeft />
                </button>
                <button onClick={nextSlide} className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-0 p-2 bg-gray-200 rounded-full">
                    <FaChevronRight />
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Team;