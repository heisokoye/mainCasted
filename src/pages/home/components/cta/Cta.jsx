import React from 'react'
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

const Cta = () => {
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

  return (
    <div className='bg-white relative z-10 border-b-gray-200 border-b'>
      <section className='mx-auto w-[80%]  text-black max-w-full py-[4rem] lg:flex'>
        <div className="max-w-screen-2xl mx-auto px-4 w-full text-gray-600 gap-12 md:px-10 lg:flex">
          <div className="max-w-md">
              <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                  Let’s connect
              </h3>
              <p className="mt-3">
                 Connect to enjoy latest updates, event coverages, interviews and a lot more.
              </p>
          </div>
            <div>
              <ul className="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0">
                {
                  contactMethods.map((item, idx) => (
                    <li key={idx} className="space-y-3  py-6 md:max-w-sm md:py-0  lg:px-12 lg:max-w-none">
                      <div className="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700">
                          {item.icon}
                      </div>
                      <h4 className="text-gray-800 text-lg font-medium xl:text-xl">
                          {item.title}
                      </h4>
                      <p>
                          {item.desc}
                      </p>
                      <a href={item.link.href} target="_blank" rel="noopener noreferrer"className="flex items-center gap-1 text-sm text-amber-600 duration-150 hover:text-amber-400 font-medium">
                          {item.link.name}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                          </svg>
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
        </div>
      </section>
  </div>
  )
}

export default Cta