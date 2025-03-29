import React from 'react';
import menuIcon from '../assets/Icons/menu.svg'
import searchIcon from '../assets/Icons/search.svg'
import heartIcon from '../assets/Icons/heart.svg'
import cartIcon from '../assets/Icons/cart.svg'
import logo1 from '../assets/Icons/1.png'
import { motion } from "motion/react"
import '../App.css'

const Navbar = ({}) => {
  return (
    <motion.nav
      initial={{ filter: "blur(6px)", opacity: 0, y: -20 }}
      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="shadow-neutral-800/40 shadow-lg z-50 fixed top-5 left-1/2 transform -translate-x-1/2 w-[80%] rounded-[1.5rem] h-[10vh] flex items-center justify-center backdrop-blur-[15px] mx-auto "

    >
      <div className="bg-white/[12%] w-full h-[10vh] rounded-[1.5rem] flex items-center justify-center"
        style={{
          borderWidth: "1.4px",
          borderStyle: "solid",
          borderImage: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.25), rgba(255,255,255,0)) 1"
        }}
      >
        <div className='flex flex-row gap-5 text-[0.8rem] w-[30%] h-[100%] justify-center '>
          {/* Menu logo & text */}
          <div className='flex flex-row items-center text-white cursor-pointer'>
            <img src={menuIcon} alt="" className='drop-shadow-sm shadow-neutral-950 h-[80%] relative top-1 ' />
            <p className='drop-shadow-sm shadow-neutral-950 font-extralight'>Menu</p>
          </div>

          {/* Search logo & text */}
          <div className='flex flex-row gap-1 items-center text-white cursor-pointer'>
            <img src={searchIcon} alt="" className=' drop-shadow-sm shadow-neutral-950 h-[60%] relative top-0.5' />
            <p className='drop-shadow-sm shadow-neutral-950 font-extralight'>Search</p>
          </div>
        </div>


        {/* fashyear Logo */}
        <div className='w-[40%] h-[100%]  flex justify-center items-center'>
          <img src={logo1} className=' h-[50%] cursor-pointer'draggable="false" />
        </div>


        {/* Heart logo & Cart icon */}

        <div className='flex flex-row gap-8 items-center  w-[30%] h-[100%] justify-center ' >
          <img src={heartIcon} alt="" className=' h-[30%] relative cursor-pointer' />
          <img src={cartIcon} alt="" className='h-[50%] relative top-[0.100rem] cursor-pointer' />

        </div>


      </div>
    </motion.nav>


  );
};

export default Navbar;
