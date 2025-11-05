import React from 'react';
import "./Partners.css"
/**
 * Partners component displays a horizontally scrolling list of partner logos.
 * It uses Framer Motion for the continuous scroll animation.
 */
const Partners = () => {
    // Array of partner logo image filenames. These are expected to be in the public directory.
    const partners = [
        "natada.png", 
        "brix.png",
        "deggia.png"
    ];


    return (
        <div className='overflow-hidden bg-black py-6'>
            <div className='mx-auto w-[80%]'>
                <p className='font-medium text-sm justify-center flex text-white'> OUR PARTNERS</p>
                {/* 
                 * motion.div from Framer Motion is used to animate the horizontal scrolling.
                 * The 'x' property animates from 0% to -100% to move the logos leftwards.
                 * The 'transition' property defines a linear animation, with a duration of 5 seconds,
                 * and set to repeat infinitely to create a continuous loop.
                 */}
                <div className='flex space-x-5 md:space-x-50  animate-scrollLeft lg:space-x-60'>
                    {
                        partners.map((logo, index) => (
                            <img
                                key={index} // Using index as key is acceptable here because the list is static and items do not change order.
                                src={logo} // The image source, assuming images are in the public folder.
                                alt='partner logo'
                                className="h-24 w-50 object-cover grayscale hover:grayscale-0 transition duration-300"
                            />
                        ))
                    }
                    {
                        partners.map((logo, index) => (
                            <img
                                key={index} // Using index as key is acceptable here because the list is static and items do not change order.
                                src={logo} // The image source, assuming images are in the public folder.
                                alt='partner logo'
                                className="h-24 w-50 object-cover grayscale hover:grayscale-0 transition duration-300"
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Partners;
