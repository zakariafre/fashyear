import React from "react";
import { useState, useEffect } from "react";
import Button from '../../components/Button';
import HeroCardImg from '../../assets/Icons/heroImg.webp';
import HeroCardImg2 from '../../assets/Icons/heroImg2.webp';
import ShinyText from "../../components/ShinyText";
import '../../App.css'
import '../../index.css'



const Hero = ({ text, disabled = false, speed = 5, className = '' }) => {

    const animationDuration = `${speed}s`;

    useEffect(() => {
        const card = document.querySelector('.Custom-cursor');
        if (!card) return;
      
        const updateCursorPos = (e) => {
          card.style.setProperty('--mouse-x', `${e.clientX}px`);
          card.style.setProperty('--mouse-y', `${e.clientY}px`);
        };
      
        card.addEventListener('mousemove', updateCursorPos);
        return () => card.removeEventListener('mousemove', updateCursorPos);
      }, []);

    return (
        <div className=" relative h-[80vh] top-[20vh] w-full flex flex-col gap-[4%]  text-white z-1  ">

            {/* Main text of the hero  */}
            <div className="text-4xl font-light tracking-tighter leading-9">
                <ShinyText text="Clothes That Reflect your" speed={2} />
                <br />
                <span className="span font-benton text-neutral-300 text-[2.8rem] tracking-normal">
                    Unique personality
                </span>
            </div>



            {/* Button Component*/}
            <Button text="Shop now" HeightNumber={6} WidthNumber={10.5} />

            <div className="flex flex-row gap-10">
                {/* Hero card design */}
                <div className=" border-[0.03rem] border-neutral-700 relative bg-center bg-cover h-[53vh] w-[33vw] rounded-[5%] overflow-hidden cursor-pointer ">
                    {/* Image behind */}
                    <img src={HeroCardImg} alt="" className=" w-full h-full object-cover z-0 " />
                    {/* Gradient overlay on top */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-70"></div>

                    {/* Circle on the top of the layer */}
                    <div className="group absolute left-[82%] top-3.5 z-20 hover:scale-105 transition-all duration-300 ">
                        <div className="h-12 w-12 rounded-full bg-black/20 backdrop-blur-[1.5px] flex items-center justify-center group-hover:bg-neutral-900/30 transition-all">
                            <svg className="h-7 relative top-0.5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 125"
                                style={{ enableBackground: 'new 0 0 100 100' }}
                                xmlSpace="preserve"
                            >
                                <path
                                    fill="#1C1C1C"
                                    d="M89.36,71.228l0.001-57.241c0-1.849-1.499-3.347-3.347-3.347l-57.242,0c-0.888,0-1.739,0.353-2.367,0.98L26.1,11.925  
                                    c-2.109,2.109-0.615,5.714,2.367,5.714h48.946L11.512,83.539c-1.307,1.307-1.307,3.426,0,4.734l0.216,0.216  
                                    c1.307,1.307,3.426,1.307,4.734,0l65.901-65.901l-0.001,48.945c0,2.982,3.605,4.475,5.714,2.367l0.305-0.305  
                                    C89.007,72.967,89.36,72.116,89.36,71.228z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="absolute z-20 left-10 bottom-5 text-4xl">
                        <p className="font-benton span ">Elegance<br />Self-expression.</p>
                    </div>
                </div>


                {/* Hero card design */}
                <div
                    className="Custom-cursor absolute top-0 right-0 h-[77vh] w-[46vw] bg-black rounded-[5%] overflow-hidden border-[0.03rem] border-neutral-700 ">
                    {/* Image behind */}
                    <img src={HeroCardImg2} alt="" className="w-full h-full object-cover z-0 scale-x-[-1] grayscale-30" />
                    {/* Gradient overlay on top */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-10 opacity-70"></div>
                    {/* Text */}
                    <div className="absolute z-20 left-10 bottom-6 flex flex-col ">
                        <p className="span text-4xl tracking-tight relative bottom-1.5">Girl's Top</p>
                        <p className="font-extralight text-lg tracking-tighter relative bottom-1.5">Mysterious everyday</p>
                        <Button className="Custom-cursor relative top-2" text="Discover" HeightNumber={5.5} WidthNumber={10} />
                    </div>
                </div>


            </div>



        </div>



    )
};

export default Hero;