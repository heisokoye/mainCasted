import React from "react"
import Hero from "./components/hero/Hero" // default export
import blogPreview from "./components/blogPreview/blogPreview"

const Home = () => {
    return (
        <div className= "mx-auto w-[90%]">
            <Hero className="flex justify-center items-center"/>
            <blogPreview/>
        </div>
    )
}

export default Home