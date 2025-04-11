import React from 'react';
import fyIcon from '../assets/Icons/1.png';





const Footer = () => {
    return (
        <footer className="w-full bg-transparent text-[#A1A1A1] !pt-4 !pb-8">
            <div className="max-w-7xl !mx-auto !px-4">
                {/* Main Footer Sections */}
                <div className="flex flex-row justify-around items-center !mb-12">
                    {/* ACCOUNT Section */}
                    <div>
                        <h3 className="text-white text-sm tracking-widest font-light !mb-10">ACCOUNT</h3>
                        <ul className="!space-y-2 tracking-wider text-[0.8rem]">
                            <li><a href="/login" className="hover:underline underline-offset-2 duration-150">LOG IN</a></li>
                            <li><a href="/signin" className="hover:underline underline-offset-2 duration-150">SIGN IN</a></li>
                        </ul>
                    </div>

                    {/* COMPANY Section */}
                    <div>
                        <h3 className="text-white text-sm tracking-widest font-light !mb-10">COMPANY</h3>
                        <ul className="!space-y-2 tracking-wider text-[0.8rem]">
                            <li><a href="/about" className="hover:underline ">ABOUT</a></li>
                            <li><a href="/our-story" className="hover:underline ">OUR STORY</a></li>
                        </ul>
                    </div>

                    {/* CONNECT Section */}
                    <div>
                        <h3 className="text-white text-sm tracking-widest font-light !mb-10">CONNECT</h3>
                        <ul className="!space-y-2 tracking-wider text-[0.8rem]">
                            <li><a href="https://instagram.com" className="hover:underline ">INSTAGRAM</a></li>
                            <li><a href="https://facebook.com" className="hover:underline ">FACEBOOK</a></li>
                            <li><a href="https://twitter.com" className="hover:underline ">X / TWITTER</a></li>
                        </ul>
                    </div>

                    {/* GET HELP Section */}
                    <div>
                        <h3 className="text-white text-sm tracking-widest font-light !mb-10">GET HELP</h3>
                        <ul className="!space-y-2 tracking-wider text-[0.8rem]">
                            <li><a href="/help" className="hover:underline underline-offset-2 duration-150">HELP CENTER</a></li>
                            <li><a href="/returns" className="hover:underline underline-offset-2 duration-150">RETURN POLICY</a></li>
                            <li><a href="/shipping" className="hover:underline underline-offset-2 duration-150">SHIPPING INFO</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className=" w-full h-auto !pt-12 border-t flex flex-col justify-center items-center border-neutral-800">
                    <div className="flex flex-row items-center justify-around gap-x-26 gap-y-10 text-[0.7rem]">
                        <span className='text-neutral-300'>© 2025 ALL RIGHTS RESERVED.</span>
                        <a href="/privacy" className="tracking-widest hover:underline underline-offset-2 duration-150">PRIVACY POLICY</a>
                        <a href="/terms" className="tracking-widest hover:underline underline-offset-2 duration-150">TERMS OF SERVICE</a>
                        <a href="/privacy/do-not-sell" className="tracking-widest hover:underline underline-offset-2 duration-150">DO NOT SELL OR SHARE MY PERSONAL INFORMATION</a>
                    </div>

                    <div className='!mt-14'>
                        <img src={fyIcon} alt="fyIcon" className='h-9' draggable={false} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;