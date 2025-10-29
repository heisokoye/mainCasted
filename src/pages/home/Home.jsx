import React from "react"
import Hero from "./components/hero/Hero" // default export
import Cta from "./components/cta/Cta"
import Team from "./components/team/Team"
import { motion } from "framer-motion"



const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero section with a gentle fade-in and slide-down effect on load */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <Hero className="flex justify-center items-center"/>
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
                <Team className="pt-[20rem]"/>
            </motion.div>
        </motion.div>
    )
}

export default Home