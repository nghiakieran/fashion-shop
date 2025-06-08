import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { motion } from 'framer-motion';
const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero left side */}
      <div className='w-full sm:w-1/2 py-10 sm:py-0 flex justify-center items-center'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='font-prata text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</motion.h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Hero right side */}
      <img src={assets.hero_img} alt="hero_img" className='w-full sm:w-1/2' />
    </div>
  )
}

export default Hero
