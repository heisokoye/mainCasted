import React, { useState, useEffect, useCallback } from "react";
import { FaImages, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Photo Gallery component displays event photos in a mobile-friendly gallery view.
 * This component is only visible on mobile devices.
 */
const PhotoGallery = () => {
  // Sample photos data - in production, this would come from Firebase
  const [photos] = useState([
    {
      id: 1,
      src: "/slider1.jpg",
      alt: "Campus Event 1",
      event: "Campus Sports Day",
      date: "December 2024"
    },
    {
      id: 2,
      src: "/Tolu.webp",
      alt: "Campus Event 2",
      event: "Student Leadership Summit",
      date: "November 2024"
    },
    {
      id: 3,
      src: "/seyi.webp",
      alt: "Campus Event 3",
      event: "Cultural Night",
      date: "October 2024"
    },
    {
      id: 4,
      src: "/Adex.jpg",
      alt: "Campus Event 4",
      event: "Tech Innovation Fair",
      date: "September 2024"
    },
    {
      id: 5,
      src: "/orangeLogo.webp",
      alt: "Campus Event 5",
      event: "Welcome Week",
      date: "August 2024"
    },
    {
      id: 6,
      src: "/iskeel.png",
      alt: "Campus Event 6",
      event: "Graduation Ceremony",
      date: "July 2024"
    },
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Open lightbox
  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  // Navigate to previous photo
  const previousPhoto = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : photos.length - 1;
      setSelectedPhoto(photos[newIndex]);
      return newIndex;
    });
  }, [photos]);

  // Navigate to next photo
  const nextPhoto = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < photos.length - 1 ? prevIndex + 1 : 0;
      setSelectedPhoto(photos[newIndex]);
      return newIndex;
    });
  }, [photos]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") previousPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, closeLightbox, previousPhoto, nextPhoto]);

  return (
    <section className="py-14 border-b border-gray-200 md:hidden lg:hidden">
      <div className="mx-auto w-[90%]">
        <div className="px-4 text-center md:px-8">
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaImages className="text-orange-500 text-2xl" />
              <h3 className="text-gray-800 text-3xl font-semibold">
                Photo <span className="text-orange-500">Gallery</span>
              </h3>
            </div>
            <p className="text-gray-600 mt-2">Capturing campus moments</p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 gap-3">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="relative aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => openLightbox(photo, index)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <p className="text-sm font-semibold truncate">{photo.event}</p>
                    <p className="text-xs text-gray-200">{photo.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <button className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 shadow-md">
            View All Photos
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            aria-label="Close lightbox"
          >
            <FaTimes size={24} />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              previousPhoto();
            }}
            className="absolute left-4 z-10 p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            aria-label="Previous photo"
          >
            <FaChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 z-10 p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            aria-label="Next photo"
          >
            <FaChevronRight size={24} />
          </button>

          {/* Photo Container */}
          <div
            className="relative max-w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            {/* Photo Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
              <p className="text-white font-semibold text-lg mb-1">{selectedPhoto.event}</p>
              <p className="text-gray-300 text-sm">{selectedPhoto.date}</p>
              <p className="text-gray-400 text-xs mt-2">
                {currentIndex + 1} of {photos.length}
              </p>
            </div>
          </div>

          {/* Swipe Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? "w-6 bg-orange-500" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;

