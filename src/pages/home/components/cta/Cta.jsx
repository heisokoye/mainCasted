// Import React and necessary icons from react-icons
import React from 'react'
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
// Import motion from framer-motion for animations
import { motion } from "framer-motion";

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

// Animation variants for the items
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

// Define the Cta component
const Cta = () => {
  // Array of contact methods
  const contactMethods = [
    {
      icon: <FaWhatsapp className="w-6 h-6" />,
      title: "Join our community",
      desc: "Connect to stay updated with the latest news.",
      link: {
          name: "Join our Whatsapp Channel",
          href: "https://whatsapp.com/channel/0029Vb56767I1rckrGeYrs1E"
      },
    },

    {
      icon: <FaInstagram className="w-6 h-6" />,
      title: "Follow us on Instagram",
      desc: "Stay updated with our latest posts and stories.",
      link: {
          name: "Follow Now",
          href: "https://www.instagram.com/casted_publications?igsh=NHVjMWl2aWZ5MW1h"
      },
    },

    {
      icon: <FaYoutube className="w-6 h-6" />,
      title: "Subscribe to our YouTube channel",
      desc: "Watch our latest videos and tutorials.",
      link:{
        name: "Subscribe Now",
        href: "https://youtube.com/@castedpublications"
      }

    }
  ]

  // Render the Cta component
  return (
    <div className=' relative z-10 border-b border-gray-300 lg:h-[50vh] flex items-center'>
      <motion.section 
        className='mx-auto w-[80%]  text-black max-w-full py-16 lg:flex'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="px-4 w-full text-gray-600 gap-12 md:px-10 lg:flex">
          <motion.div className="max-w-md" variants={itemVariants}>
              <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                  Let’s connect
              </h3>
              <p className="mt-3">
                 Connect to enjoy latest updates, event coverages, interviews and a lot more.
              </p>
          </motion.div>
            <div>
              <ul className="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0">
                {
                  contactMethods.map((item) => (
                    <motion.li key={item.title} className="space-y-3  py-6 md:max-w-sm md:py-0  lg:px-12 lg:max-w-none" variants={itemVariants}>
                      <div className="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700" aria-hidden="true">
                          {item.icon}
                      </div>
                      <h4 className="text-gray-800 text-lg font-medium xl:text-xl">
                          {item.title}
                      </h4>
                      <p>
                          {item.desc}
                      </p>
                      <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-amber-600 duration-150 hover:text-amber-400 font-medium">
                          {item.link.name}
                          <span className="sr-only">(opens in a new tab)</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                          </svg>
                      </a>
                    </motion.li>
                  ))
                }
              </ul>
            </div>
        </div>
      </motion.section>
  </div>
  )
}

// Export the Cta component as the default export
export default Cta;