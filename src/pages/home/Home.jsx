import React from "react"
import Hero from "./components/hero/Hero" // default export
import BlogPreview from "./components/blogPreview/blogPreview"
import Cta from "./components/cta/Cta"
import Team from "./components/team/Team"



const Home = () => {
    return (
        <div>
            <Hero className="flex justify-center items-center"/>
           <Cta className=""/>
           <Team className="pt-[20rem]"/>
        </div>
    )
}

export default Home