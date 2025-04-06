import React from "react";
import '../App.css'




const SidebarMenu = ({ isOpen, setIsOpen }) => {



    return (
        <>
            {/* Background overlay (optional) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-xs z-80 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)} // Click outside to close menu
                ></div>
            )}



            {/* Sidebar Menu */}
            <div
                style={{
                    borderWidth: "1.2px",
                    borderStyle: "solid",
                    borderImage: "linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,0.5), rgba(255,255,255,0)) 1"
                }}
                className={`fixed top-3 left-10 h-[96%] w-[25%] bg-[#303030]/90 rounded-[1rem] text-white transition-transform duration-300 z-90 
                ${isOpen ? "translate-x-0" : "-translate-x-[120%]"
                    }`}
            >

                <div className="relative flex flex-col gap-14 !pl-[13%] top-7 ">

                    {/* Close button */}
                    <button
                        className="text-white  text-[0.9rem]  flex font-light cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        ✕ <a className=" relative left-2">Close</a>
                    </button>


                    <div className="text-2xl font-light">
                        <ul className="flex flex-col">
                            <li className="group Links relative w-[80%] overflow-hidden Custom-cursor !pb-3 !pt-5 border-b transition-all duration-500 hover:border-b hover:border-white">
                                <span className="inline-block transition-transform duration-400 group-hover:translate-x-5">Home</span>
                            </li>
                            <li className="group Links relative w-[80%] overflow-hidden Custom-cursor !pb-3 !pt-5 border-b transition-all duration-500 hover:border-b hover:border-white">
                                <span className="inline-block transition-transform duration-400 group-hover:translate-x-5">Shop</span>
                            </li>
                            <li className="group Links relative w-[80%] overflow-hidden Custom-cursor !pb-3 !pt-5 border-b transition-all duration-500 hover:border-b hover:border-white">
                                <span className="inline-block transition-transform duration-400 group-hover:translate-x-5">About fashyear</span>
                            </li>
                            {/* <li className="group Links relative w-[80%] overflow-hidden Custom-cursor !pb-3 !pt-5 border-b transition-all duration-500 hover:border-b hover:border-white">
                                <span className="inline-block transition-transform duration-500 group-hover:translate-x-5">Blog</span>
                            </li> */}
                        </ul>
                    </div>

                    <div className=" top-10 right-5 relative flex flex-col justify-center">
                        <hr className="opacity-30" />
                        <div className="flex flex-col text-xl text-neutral-400 font-light relative top-10 left-5">
                            <h2 className="">Can we help you ?</h2>
                            <h2 className=" underline cursor-pointer hover:text-neutral-300 duration-200">+2126 154 937 32</h2>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default SidebarMenu;
