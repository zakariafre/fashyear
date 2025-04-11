import React from 'react';
import BflyIcon from '../assets/Icons/4.png';

const Footer = () => {
    return (
        <footer className="w-full !mt-auto border-t border-neutral-800 bg-transparent text-[#A1A1A1] !pt-12 !pb-8">
            <div className="container !mx-auto !px-6">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row justify-between items-start">
                    {/* Left Section - Tagline */}
                    <div className="!mb-12 md:!mb-0 md:w-[40%]">
                        <img src={BflyIcon} alt="" className="h-16 !mb-8" />
                        <h2 className="text-2xl w-[90%] leading-tight tracking-tight">
                            <span className="text-white">Elevating everyday style</span> with timeless elegance and modern sophistication
                        </h2>
                    </div>

                    {/* Right Section - Links */}
                    <div className="grid grid-cols-3 gap-20 !mt-5 w-full md:w-auto">
                        {/* FOLLOW */}
                        <div>
                            <h3 className="font-bold text-sm !mb-4">FOLLOW</h3>
                            <ul className="space-y-2 text-sm flex flex-col gap-2">
                                {['Instagram', 'Facebook', 'X / Twitter'].map(item => (
                                    <li key={item} className="hover:underline text-xs cursor-pointer transition-colors">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* PAGES */}
                        <div>
                            <h3 className="font-bold text-sm !mb-4">PAGES</h3>
                            <ul className="space-y-2 text-sm flex flex-col gap-2">
                                {['Home', 'Ready to wear', 'About'].map(item => (
                                    <li key={item} className="hover:underline cursor-pointer text-xs transition-colors">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CONTACT */}
                        <div>
                            <h3 className="font-bold text-sm !mb-4">CONTACT</h3>
                            <ul className="space-y-2 text-sm flex flex-col gap-2">
                                <li className="hover:underline cursor-pointer text-xs transition-colors">
                                    Reach Us
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="!mt-18 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs order-2 md:order-1 md:mt-0">
                        © 2025 fashyear Inc. All rights reserved.
                    </p>
                    <ul className="flex space-x-6 flex-row gap-5 text-xs order-1 md:order-2">
                        {['Terms of Services', 'Privacy Policy', 'Cookies'].map(item => (
                            <li key={item} className="hover:text-neutral-500 cursor-pointer transition-colors">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;