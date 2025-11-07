import React from "react"
import Hero from "./components/hero/Hero" // default export
import Cta from "./components/cta/Cta"
import Team from "./components/team/Team"
import { motion } from "framer-motion"
import BlogPreview from "./components/blogPreview/blogPreview"
import Partners from "./components/partners/Partners"
import YouTubeSection from "./components/youtube/Youtube"



const Home = () => {
    return (
        <>
            <title>Casted! Publications - Student Media, News, and Stories</title>
            <meta name="description" content="The official source for student stories, campus news, and social events from Casted! Publications. Discover the latest articles and amplify your voice." />
            <meta name="keywords" content="students media publications, Bells University Media, Casted! Publications, castedpub" />
            <meta name="author" content="Bells University Media, Casted! Publications" />
            <link rel="canonical" href="https://castedpub.vercel.app/" />
            <div>
                {/* Hero section - no initial animation to improve FCP */}
                <div>
                    <Hero className="flex justify-center items-center"/>
                </div>

                {/* YouTube section that fades in and slides up as it enters the viewport */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <YouTubeSection/>
                </motion.div>

                 {/* BlogPreview section with scroll-based animation */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                <BlogPreview/>
                </motion.div>

                {/* Cta section that slides in from the left as it enters the viewport */}
                <div>
                    <Cta className=""/>
                </div>

                {/* Team section that fades in as it enters the viewport */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Team/>
                </motion.div>

                <Partners/>
            </div>
        </>
    )
}

export default Home