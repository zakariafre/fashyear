import React from 'react';
import fyIcon from '../assets/Icons/1.png';

const Footer = () => {
    return (
        <footer className="w-full bg-transparent text-[#A1A1A1] flex flex-col">
            <hr className='border-neutral-800 w-[97%] mx-auto' />
            
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 gap-y-8">
                {/* Main Footer Sections */}
                <div className="grid grid-cols-4 w-full place-items-center !py-10">
                    {/* ACCOUNT Section */}
                    <div className="flex flex-col">
                        <h3 className="text-white text-sm tracking-widest font-light !mb-6">ACCOUNT</h3>
                        <ul className="flex flex-col !space-y-2 tracking-wider text-[0.8rem]">
                            <li><a href="/login" className="hover:underline underline-offset-2 duration-150">LOG IN</a></li>
                            <li><a href="/login" className="hover:underline underline-offset-2 duration-150"></a></li>
                            <li><a href="/login" className="hover:underline underline-offset-2 duration-150"> </a></li>
                        </ul>
                    </div>

                    {/* COMPANY Section */}
                    <div className="flex flex-col">
                        <h3 className="text-white text-sm tracking-widest font-light !mb-6">COMPANY</h3>
                        <ul className="flex flex-col !space-y-2 tracking-wider text-[0.8rem]">
                            <li><a href="/about" className="hover:underline underline-offset-2">ABOUT US</a></li>
                            <li><a href="/our-story" className="hover:underline underline-offset-2">OUR STORY</a></li>
                            <li><a href="/our-story" className="hover:underline underline-offset-2"></a></li>
                        </ul>
                    </div>

                    {/* CONNECT Section */}
                    <div className="flex flex-col">
                        <h3 className="text-white text-sm tracking-widest font-light !mb-6">CONNECT</h3>
                        <ul className="flex flex-col !space-y-2 tracking-wider text-[0.8rem]">
                            <li><a href="https://instagram.com" className="hover:underline underline-offset-2">INSTAGRAM</a></li>
                            <li><a href="https://facebook.com" className="hover:underline underline-offset-2">FACEBOOK</a></li>
                            <li><a href="https://twitter.com" className="hover:underline underline-offset-2">X / TWITTER</a></li>
                        </ul>
                    </div>

                    {/* GET HELP Section */}
                    <div className="flex flex-col">
                        <h3 className="text-white text-sm tracking-widest font-light !mb-6">GET HELP</h3>
                        <ul className="flex flex-col !space-y-2 tracking-wider text-[0.8rem]">
                            <li><a href="/help" className="hover:underline underline-offset-2 duration-150">HELP CENTER</a></li>
                            <li><a href="/returns" className="hover:underline underline-offset-2 duration-150">RETURN POLICY</a></li>
                            <li><a href="/shipping" className="hover:underline underline-offset-2 duration-150">SHIPPING INFO</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="w-full border-t border-neutral-800 grid grid-rows-2 place-items-center gap-y-10 !py-8">
                    <div className="flex flex-row gap-x-24 text-[0.7rem]">
                        <span className='text-neutral-300'>© 2025 ALL RIGHTS RESERVED.</span>
                        <a href="/privacy" className="tracking-widest hover:underline underline-offset-2 duration-150">PRIVACY POLICY</a>
                        <a href="/terms" className="tracking-widest hover:underline underline-offset-2 duration-150">TERMS OF SERVICE</a>
                        <a href="/privacy/do-not-sell" className="tracking-widest hover:underline underline-offset-2 duration-150">DO NOT SELL OR SHARE MY PERSONAL INFORMATION</a>
                    </div>

                    <div className='flex justify-center items-center'>
                        <img src={fyIcon} alt="fyIcon" className='h-9' draggable={false} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;