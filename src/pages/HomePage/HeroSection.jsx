import React from "react";
import { useState, useEffect } from "react";
import Button from '../../components/Button';
import HeroCardImg from '../../assets/Icons/heroImg.webp';
import HeroCardImg2 from '../../assets/Icons/heroImg2.webp';
import hero from '../../assets/Icons/hero2.png'
import ShinyText from "../../components/ShinyText";
import '../../App.css'
import '../../index.css'
import { useNavigate } from 'react-router-dom';




const Hero = ({ text, disabled = false, speed = 5, className = '' }) => {

    const animationDuration = `${speed}s`;
    const navigate = useNavigate();

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

    const handleShopNow = () => {
        navigate('/shop');
    };


    return (
        <div className="relative h-[100vh] w-full flex flex-col text-white z-1">

            <div className="h-full w-full flex items-center justify-center gap-10 overflow-hidden cursor-pointer ">
                <img src={hero} className="opacity-80 scale-100" draggable="false" alt="" />

                <div className="absolute flex flex-col justify-center items-center !mt-40 gap-2 z-30">
                    <h2 className="uppercase text-[2rem] font-light text-white tracking-wider">new in: hijabs</h2>

                    <h2 className="uppercase text-[0.7rem] font-light text-white tracking-wider underline cursor-pointer">Shop now</h2>
                </div>

            </div>


        </div>



    )
};

export default Hero;