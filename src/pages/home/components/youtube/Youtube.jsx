import React from "react";
import { motion } from "framer-motion";

const YouTubeSection = () => {
  const videos = [
    {
      id: "DYr2L-CAFpw",
      title: "CASTED! Team 2025/2026",
      description: "we are back 😁",
    },
    {
      id: "GHlRPtH1XAQ",
      title: "Bells University NACOS Induction",
      description: "Best moments from last month.",
    },
    {
      id: "a89nFPK2uPE",
      title: "Bells University Engineering Induction",
      description: "Best moments from last month",
    },

  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="border-b border-gray-300">
    <section className="py-20 mx-auto w-[80%]">
      <h2 className="text-2xl font-medium mb-6 flex justify-center gap-2">
        <div> Campus in </div> 
        <div className="text-orange-500">Motion</div>
      </h2>

      <motion.div 
        className="grid sm:grid-cols-2 md:grid-cols-1  lg:grid-cols-3 gap-12"
        variants={containerVariants}
      >
        {videos.map((video, index) => (
          <motion.div 
            key={video.id} 
            variants={itemVariants}
            className="backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?controls=1`} // add controls
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-t-2xl"
                fetchpriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-gray-600 italic mt-1">{video.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
    </div>
  );
};

export default YouTubeSection;
