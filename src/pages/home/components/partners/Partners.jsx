import React from 'react';
import { motion } from 'framer-motion';

const Partners = () => {
    const partners = [
        "natada.png", 
        "brix.png",
        "deggia.png"
    ];

    const duplicatedPartners = [...partners, ...partners];

    return (
        <div className='overflow-hidden bg-black py-6'>
            <div className='mx-auto w-[80%]'>
                <p className='font-medium text-sm justify-center flex text-white'> OUR PARTNERS</p>
                <motion.div
                    className='flex space-x-5 md:space-x-50 lg:space-x-60'
                    animate={{
                        x: ['0%', '-100%'],
                        transition: {
                            ease: 'linear',
                            duration: 15,
                            repeat: Infinity,
                        }
                    }}
                >
                    {
                        duplicatedPartners.map((logo, index) => (
                            <img
                                key={index}
                                src={logo}
                                alt='partner logo'
                                className="h-24 w-50 object-cover grayscale hover:grayscale-0 transition duration-300"
                            />
                        ))
                    }
                </motion.div>
            </div>
        </div>
    );
}

export default Partners;
