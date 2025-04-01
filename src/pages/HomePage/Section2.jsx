import React from 'react';
import { useState, useEffect, useRef } from "react";
import '../../app.css';
import fyIcon from '../../assets/Icons/5.svg';
import Sectionpic from '../../assets/Icons/Spic.png'
import Sectionpic2 from '../../assets/Icons/heroImg2.webp'
import Magnet from '../../components/Magnet';
import Logo from '../../assets/Icons/4.png'




const Section2 = () => {
    return (
        <div className=" w-full h-[50vh] flex flex-col justify-center items-center !mt-12  text-white text-center tracking-tighter text-[2.5rem] leading-[3.5rem]">
            <div className='absolute'>
            <Magnet
                wrapperClassName="relative"
                innerClassName="w-full h-full"
                magnetStrength={12} 
                paddingTop={200}    
                paddingRight={650} 
                paddingBottom={300} 
                paddingLeft={650}   
                activeTransition="transform 0.6s ease-out"
                inactiveTransition="transform 2s cubic-bezier(0.18, 0.89, 0.32, 1.28)" 
            >
                <div className='cursor-pointer w-[7rem] h-[4rem] rounded-[30rem] overflow-hidden relative right-[10vw] bottom-[8rem]'>
                    <img
                        src={Sectionpic}
                        alt=""
                        className='relative bottom-5 transition-transform duration-300 group-hover:scale-110'
                        draggable="false"
                    />
                </div>
            </Magnet>

            <Magnet
             wrapperClassName="relative"
             innerClassName="w-full h-full"
             magnetStrength={12} 
             paddingTop={80}    
             paddingRight={600} 
             paddingBottom={300} 
             paddingLeft={600}   
             activeTransition="transform 0.6s ease-out"
             inactiveTransition="transform 2s cubic-bezier(0.18, 0.89, 0.32, 1.28)"  // Bouncy return
            >
            <div className='cursor-pointer w-[4rem] h-[6rem] rounded-[30rem] overflow-hidden relative left-[12vw] top-[14vh]'>
                    <img
                        src={Sectionpic2}
                        alt=""
                        className='relative scale-110 transition-transform duration-300 group-hover:scale-110'
                        draggable="false"
                    />
                </div>
            </Magnet>

            <Magnet
             wrapperClassName="relative"
             innerClassName="w-full h-full"
             magnetStrength={12} 
             paddingTop={80}    
             paddingRight={600} 
             paddingBottom={300} 
             paddingLeft={600}   
             activeTransition="transform 0.6s ease-out"
             inactiveTransition="transform 2s cubic-bezier(0.18, 0.89, 0.32, 1.28)"  // Bouncy return
            >
            <div className=' cursor-pointer w-[4rem] h-[4rem] -rotate-12 flex justify-center items-center bg-[#262626] rounded-[30rem] overflow-hidden relative right-[24vw] top-[14vh]'>
                    <img
                        src={Logo}
                        alt=""
                        className='relative scale-90 transition-transform duration-300 group-hover:scale-110'
                        draggable="false"
                    />
                </div>
            </Magnet>
            </div>

            
            <p className='cursor-pointer' >
                Fashyear – Elevating Modest Fashion for Every <br /> Season. Styles evolve{' '}
                <span
                    id='customSpan'
                    className="span inline-flex items-center gap-5 border border-white font-medium rounded-[30rem] text-[2.5rem] leading-[3rem] relative"
                >
                    <img className="h-6" src={fyIcon} alt="icon" />
                    with trends
                </span>{' '}
                yet remain <br /> timeless, inspired by the essence of elegance <br /> and self-expression.
            </p>


        </div>
    );
};

export default Section2;