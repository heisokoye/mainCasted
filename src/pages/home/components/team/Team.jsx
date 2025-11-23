import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Team component displays a list of team members, with a grid view for desktop
 * and a carousel/slider view for mobile, featuring navigation and auto-slide.
 */
const Team = () => {

  // Array of team member objects, each containing avatar, name, title, and social links.
  const team = [
      {
          avatar: "/iskeel.png",
          name: "Iskeel Atolagbe",
          title: "Executive Director",
          linkedin: "javascript:void(0)",
          twitter: "javascript:void(0)",
      },
      {
        avatar: "/khalid.webp",
        name: "Adeboye Khalid",
        title: "Managing director", 
        linkedin: "javascript:void(0)",
        twitter: "javascript:void(0)",
      },
      {
        avatar: "/nifemi.webp",
        name: "Adesanya Olorunnifemi",
        title: "Lead Designer", 
        linkedin: "javascript:void(0)",
        twitter: "javascript:void(0)",
      },
        {
            avatar: "/seyi.webp",
            name: "Oluwaseyifunmi Dosunmu",
            title: "Director Emeritus",
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
        },
        {
            avatar: "/Adex.webp",
            name: "Adeniyi Ademide",
            title: "Social Media Director",
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
        },
        {
            avatar: "/daniel.webp",
            name: " Adekoya Daniel ",
            title: "Lead Videographer",
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
        },
        {
            avatar: "/Tolu.webp",
            name: "Tolulope Ogunbiyi",
            title: "Lead Photographer",
            linkedin: "javascript:void(0)",
            twitter: "javascript:void(0)",
        },
    ]

    // State to keep track of the currently displayed team member in the mobile slider.
    const [currentIndex, setCurrentIndex] = useState(0);

    // Callback function to move to the next slide, memoized to prevent unnecessary re-renders.
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % team.length);
    }, [team.length]); // Dependency on team.length to ensure it's up-to-date.

    // Function to move to the previous slide.
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + team.length) % team.length);
    };

    // useEffect hook to handle auto-sliding for mobile view.
    useEffect(() => {
        const interval = setInterval(() => {
            // Only auto-slide on smaller screens (e.g., less than 640px width).
            if (window.innerWidth < 640) {
                nextSlide();
            }
        }, 5000); // Change slide every 5 seconds.

        // Cleanup function to clear the interval when the component unmounts or dependencies change.
        return () => clearInterval(interval);
    }, [nextSlide]); // Dependency on nextSlide to ensure the latest function is used.

    // Get the current team member to display in the mobile slider.
    const currentTeamMember = team[currentIndex];


    return (
    <section className="py-14 border-b  border-b-gray-200">
      <div className="mx-auto w-[90%] ">
        <div className="px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                Meet our <span className="text-orange-500">team</span>
            </h3>
          </div>
          <div className="mt-12 relative">
            {/* Desktop Grid View: Displays all team members in a responsive grid. Hidden on small screens. */}
            <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {
                team.map((item, idx) => (
                  <li key={idx} className="hidden sm:block">
                    <div className="w-32 h-32 mx-auto">
                      <img
                        src={item.avatar}
                        className="w-full h-full rounded-full object-cover object-center"
                        alt={item.name}
                        loading="lazy"
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
            {/* Mobile Slider View: Displays one team member at a time with navigation buttons. Hidden on larger screens. */}
            <div className="sm:hidden relative">
                <div className="w-32 h-32 mx-auto">
                    <img
                    src={currentTeamMember.avatar}
                    className="w-full h-full rounded-full object-cover object-center transition-transform duration-500 ease-in-out"
                    alt={currentTeamMember.name}
                    loading={currentIndex === 0 ? "eager" : "lazy"}
                    fetchPriority={currentIndex === 0 ? "high" : "auto"}
                    key={currentIndex} // Re-trigger animations on change
                    />
                </div>
                <div className="mt-2">
                    <h4 className="text-gray-700 font-semibold sm:text-lg">{currentTeamMember.name}</h4>
                    <p className="text-orange-600">{currentTeamMember.title}</p>
                </div>
                {/* Previous slide button */}
                <button onClick={prevSlide} className="absolute cursor-pointer top-1/2 -translate-y-1/2 left-0 p-2 bg-gray-200 rounded-full">
                    <FaChevronLeft />
                </button>
                {/* Next slide button */}
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