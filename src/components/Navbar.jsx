import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import menuIcon from '../assets/Icons/menu.svg'
import searchIcon from '../assets/Icons/search.svg'
import heartIcon from '../assets/Icons/heart.svg'
import accountIcon from '../assets/Icons/account.svg'
import cartIcon from '../assets/Icons/cart.svg'
import logo1 from '../assets/Icons/1.png'
import { motion } from "motion/react"
import Menu from './Menu'










import '../App.css'

const Navbar = ({ isOpen, setIsOpen, isSearchOpen, setIsSearchOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };


  return (
    <>

      <motion.nav
        initial={{ filter: "blur(10px)", opacity: 0, y: -40 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0, ease: "easeIn" }}
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-[10vh] flex items-center justify-center backdrop-blur-[0px] mx-auto transition-all duration-300 
          ${isOpen ? "backdrop-blur-md z-30" : "z-50"}
          ${isSearchOpen ? "backdrop-blur-xs z-80" : "z-50"} 
          ${isScrolled ? 'bg-neutral-900/30 backdrop-blur-md duration-100 ease-linear ' : 'duration-100 ease-linear'}`}
      >
        <div className={`bg-neutral-900/0 w-full h-[10vh] flex items-center justify-center`}

          style={{
            borderWidth: "1.3px",
            borderStyle: "solid",
            borderImage: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.25), rgba(255,255,255,0)) 1"
          }}
        >
          <div className='flex flex-row gap-5 text-[0.8rem] w-[20%] h-[100%] justify-start '>

            {/* Menu logo & text */}
            <div
              className='flex flex-row items-center text-white cursor-pointer'
              onClick={() => { setIsOpen(true); setIsSearchOpen(false) }} // Open the sidebar menu
            >
              <img src={menuIcon} alt="Menu" className='h-[80%] relative top-1 ' />
              <p className='font-light tracking-widest uppercase'>Menu</p>
            </div>


            {/* Search logo & text */}
            <div
              className='flex flex-row gap-1 items-center text-white cursor-pointer'
              onClick={() => setIsSearchOpen(true)}
            >
              <img src={searchIcon} alt="" className='h-[60%] filter brightness-200 relative top-0.5' />
              <p className='font-light tracking-widest uppercase'>Search</p>
            </div>
          </div>


          {/* fashyear Logo */}
          <div className='w-[40%] h-[100%]  flex justify-center items-center'>
            <img src={logo1} className=' h-[45%] cursor-pointer' draggable="false" onClick={handleLogoClick} />
          </div>


          {/* Heart logo & Cart icon */}

          <div className='flex flex-row gap-5 text-[0.8rem] items-center w-[20%] h-full justify-end ' >
            <div
              className='flex flex-row items-center text-white gap-3 cursor-pointer'>
              <img src={heartIcon} alt="" className='h-5 relative cursor-pointer' />
            </div>

            <div
              className='flex flex-row items-center text-white gap-3 cursor-pointer'>
              <img src={accountIcon} alt="" className='h-5 relative brightness-200 cursor-pointer' />
            </div>

            <div
              className='flex flex-row items-center text-white gap-3 cursor-pointer'>
              <img src={cartIcon} alt="" className='h-8 relative cursor-pointer' />
            </div>
          </div>


        </div>
      </motion.nav>



    </>
  );
};

export default Navbar;
