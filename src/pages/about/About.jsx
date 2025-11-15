// Import React library for building UI components
import React from "react";
// Import motion from framer-motion for animations
import { motion } from "framer-motion";

// Define the About component
const About = () => {
  // Define animation variants for sections
  const sectionVariants = {
    // Initial state (hidden)
    hidden: { opacity: 0, y: 50 },
    // Animation state (visible)
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Render the About page
  return (

    <div className=" bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed ">
      {/*  Main container with padding and text styling */}
      <div className="py-24  md:py-32 mx-auto w-[80%] text-gray-800">
        {/* Inner container with max-width */}
        <div className="mx-auto w-[90%] md:w-[80%] max-w-6xl">
          {/* Main Heading */}
          {/* Animated heading section */}
          <motion.div
            className="text-center mb-16"
            // Initial animation state
            initial={{ opacity: 0, y: -50 }}
            // Animate to this state
            animate={{ opacity: 1, y: 0 }}
            // Animation transition properties
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Page title */}
            <h1 className="text-4xl md:text-5xl font-medium text-gray-900">
              About <span className="text-orange-500">CASTED!</span>
            </h1>
            {/* Subtitle */}
            <p className="mt-4 text-lg text-gray-600 italic">The spark that ignited a revolution.</p>
          </motion.div>

          {/* Origin Story Section */}
          {/* Animated section for the origin story */}
          <motion.section
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
            // Animation variants
            variants={sectionVariants}
            // Initial animation state
            initial="hidden"
            // Animate when in view
            whileInView="visible"
            // Viewport settings for the animation
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Text content for the origin story */}
            <div className="prose prose-lg  max-w-none">
              <h2 className="text-3xl font-semibold text-gray-900">The Spark</h2>
              <p>
                You know, few times in one’s life, an idea comes about creating a spark that ignites a chain reaction — changing one’s life and the surrounding environment. The birth of CASTED! is one such case.
              </p>
              <p>
                Around February 2024, a conversation between two friends about shows like <strong>Bridgerton</strong> and <strong> Gossip Girl </strong> sparked a realization: our campus needed a voice, an entity to stir excitement and intrigue, much like Lady Whistledown or Gossip Girl.
              </p>
              <p>
                That idea evolved into what we have today — the entity striving to fill that gap and meet the need for its kind on campus.
              </p>
            </div>
            {/* Image for the origin story (hidden on small screens) */}
            <div className="hidden md:block">
              <img src="/slider1.webp" alt="Campus event" className="rounded-lg shadow-xl object-cover w-full h-96" />
            </div>
          </motion.section>

          {/* Who We Are Section */}
          {/* Animated section for "Who We Are" */}
          <motion.section
            className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl shadow-amber-600 mb-20"
            // Animation variants
            variants={sectionVariants}
            // Initial animation state
            initial="hidden"
            // Animate when in view
            whileInView="visible"
            // Viewport settings for the animation
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Text content for "Who We Are" */}
            <div className="prose prose-lg max-w-none text-center">
              <h2 className="text-3xl font-medium text-gray-900">Who Are We?</h2>
              <p className="text-xl italic text-orange-600">
                "We’re not just another dusty publication. We’re the dynamic, student-run mini-magazine rewriting the rules. A riot of perspectives. A chorus of voices. A powerhouse of change."
              </p>
              <p>
                CASTED! is a student media publication that aims to tell the stories of students on campus. We platform experiences, amplify voices, and capture stories that matter. We’re not just ink on paper; we’re the megaphone for every student with something to say.
              </p>
              <p>
                We attend and cover every event on campus, from sports to dinners, capturing memories with the best photography and content creation. We make a star out of every attendee and preserve moments so they’ll always remain tangible and immortal.
              </p>
            </div>
          </motion.section>

          {/* Join Us Section */}
          {/* Animated section for "Join Us" */}
          <motion.section
            className="text-center"
            // Animation variants
            variants={sectionVariants}
            // Initial animation state
            initial="hidden"
            // Animate when in view
            whileInView="visible"
            // Viewport settings for the animation
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Join the Revolution</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to rock the boat? We're looking for passionate students to join our crew and become guardians of the campus galaxy.
            </p>
            {/* Grid for different roles */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Writers card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:shadow-amber-500  transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-orange-500">Writers</h3>
                <p className="mt-2 text-gray-600">Calling all wordsmiths, storytellers, and truth-seekers! Let’s craft narratives that crackle with energy and resonate with every reader.</p>
              </div>
              {/* Designers card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:shadow-amber-500 transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-orange-500">Designers</h3>
                <p className="mt-2 text-gray-600">Are pixels your paintbrush? Help us transform ideas into visual feasts that leap off the page and straight into hearts.</p>
              </div>
              {/* Creators & Photographers card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:shadow-amber-500  transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-orange-500">Creators & Photographers</h3>
                <p className="mt-2 text-gray-600">Is the lens your third arm? Join us to bring events to life, frame memories, and create engaging content that sparks excitement.</p>
              </div>
            </div>
            {/* Call to action */}
            <p className="mt-12 text-lg text-gray-700">Drop us a line — and let’s make magic happen.</p>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

// Export the About component as the default export
export default About;
