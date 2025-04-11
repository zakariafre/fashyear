import React from "react";
import '../App.css'

const Menu = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {/* Background overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs z-80 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar Menu */}
            <div
                style={{
                    borderWidth: "1.2px",
                    borderStyle: "solid",
                    borderImage: "linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,0.5), rgba(255,255,255,0)) 1"
                }}
                className={`fixed top-0 h-full w-[30%] bg-[#303030]/0 rounded-[0rem] text-white transition-transform duration-300 z-90 overflow-hidden
                ${isOpen ? "translate-x-0" : "-translate-x-[120%]"}`}
            >
                <div className="relative flex flex-col h-full">
                    {/* Sticky close button */}
                    <div className="sticky top-5 z-20 !pl-[13%] pt-7 pb-4">
                        <button
                            className="text-white text-[0.9rem] flex font-light cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕ <span className="relative left-2">Close</span>
                        </button>
                    </div>

                    {/* fade effect */}
                    <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10">
                        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#2c2c2c] via-[#2c2c2c] to-transparent"></div> */}
                    </div>

                    {/* Scrollable content with fade effect */}
                    <div className="relative top-10 flex-1 overflow-hidden">
                        <div className="absolute inset-0 flex flex-col">
                            {/* Scrollable content */}
                            <div className="flex-1 overflow-y-auto !pl-[13%] custom-scrollbar">
                                <div className="text-2xl font-extralight !mt-10">
                                    <ul className="flex flex-col menu-list">
                                        {/* Ready to Wear Section */}
                                        <li className="text-[0.7rem] text-neutral-400 uppercase tracking-wider !pb-2 !pt-5">
                                            Ready to Wear
                                        </li>
                                        <li className="menu-item Links relative w-[70%] overflow-hidden Custom-cursor !pb-2 !pt-2 pl-4 text-lg border-b hover:border-white">
                                            <span>Dresses</span>
                                        </li>
                                        <li className="menu-item Links relative w-[70%] overflow-hidden Custom-cursor !pb-2 !pt-2 pl-4 text-lg border-b hover:border-white">
                                            <span>Sets</span>
                                        </li>
                                        <li className="menu-item Links relative w-[70%] overflow-hidden Custom-cursor !pb-2 !pt-2 pl-4 text-lg border-b hover:border-white">
                                            <span>Tops</span>
                                        </li>
                                        <li className="menu-item Links relative w-[70%] overflow-hidden Custom-cursor !pb-2 !pt-2 pl-4 text-lg border-b hover:border-white">
                                            <span>Bottoms</span>
                                        </li>
                                        <li className="menu-item Links relative w-[70%] overflow-hidden Custom-cursor !pb-2 !pt-2 pl-4 text-lg border-b hover:border-white">
                                            <span>Burkini</span>
                                        </li>
                                        <li className="menu-item Links relative w-[70%] overflow-hidden Custom-cursor !pb-2 !pt-2 pl-4 text-lg border-b hover:border-white">
                                            <span>Hijabs</span>
                                        </li>

                                        {/* Featured Section */}
                                        <li className="text-[0.7rem] text-neutral-400 uppercase tracking-wider !pb-2 !pt-14">
                                            Featured
                                        </li>
                                        <li className="menu-item Links relative w-[70%] overflow-hidden Custom-cursor !pb-2 !pt-2 pl-4 text-lg border-b hover:border-white">
                                            <span>New Arrivals</span>
                                        </li>
                                        <li className="menu-item Links relative w-[70%] overflow-hidden Custom-cursor !pb-2 !pt-2 pl-4 text-lg border-b hover:border-white">
                                            <span>Best Sellers</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Help section (now scrollable) */}
                                <div className="w-full !mt-20 !mb-30">
                                    <hr className="opacity-15 !mr-10" />
                                    <div className="flex flex-col text-xl text-neutral-400 font-light !pt-10">
                                        <h2>Can we help you?</h2>
                                        <h2 className="underline cursor-pointer hover:text-neutral-300 duration-200">+2126 154 937 32</h2>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced fade effect bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10">
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c2c] via-[#2c2c2c] to-transparent"></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;
