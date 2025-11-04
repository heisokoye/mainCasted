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
      description: "Best moments from last week.",
    },
    {
        id: "a89nFPK2uPE",
        title: "Bells University Engineering Induction",
        description: "Best moments from last week"
    },
    {
        id: "vteKS91ne9U",
        title: "🎉 Bells Sports Fest",
        description: "The Ultimate Inter-school showdown 🏀⚽🏐🔥"
    }
  ];

  // Animation variants for the container to stagger children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  // Animation variants for each video item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="py-20 mx-auto w-[80%]">
      <h2 className="text-2xl font-medium mb-6 flex  justify-center gap-2"> <div> Campus in </div> <div className="text-orange-600">Motion</div> </h2>

      <motion.div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-12"
        variants={containerVariants}
      >
        {videos.map((video) => (
          <motion.div key={video.id} variants={itemVariants}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden" fetchpriority="high"
          >
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                credentialless
                sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
                className="w-full h-full rounded-t-2xl"
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
  );
};

export default YouTubeSection;