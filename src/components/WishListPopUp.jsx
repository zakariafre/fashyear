import React, { useEffect, useState } from "react";

const WishListPopUp = ({ isOpen, setIsOpen }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Trigger when isOpen changes
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true); // Popup appears when isOpen is true
        } else {
            setTimeout(() => setIsVisible(false), 300); // After 300ms (animation duration), remove the popup from the DOM
        }
    }, [isOpen]);

    return (
        <>
            {/* Background overlay with smooth fade-in and fade-out */}
            {isVisible && (
                <div
                    className={`fixed inset-0 bg-black/80 z-45 transition-opacity duration-300 
                    ${isOpen ? "opacity-100" : "opacity-0"}`}
                ></div>
            )}

            {/* Wishlist Popup with smooth fade-in & zoom-in on open and fade-out & zoom-out on close */}
            {isVisible && (
                <div
                    className={`fixed top-[12%] left-[35%] w-[30%] h-[9%] rounded-[1rem] bg-neutral-700/90 z-50 border border-neutral-400/50 
                    flex flex-col justify-center items-center text-neutral-300 font-light transition-all duration-300 
                    ${isOpen ? "opacity-100" : "opacity-0 "}`}
                >
                    <div className="flex flex-row gap-12 justify-center items-center">
                        <div>
                            <h2 className="text-[0.75rem]">The item has been added to your wishlist</h2>
                            <h2 className="text-[0.7rem] underline cursor-pointer hover:text-neutral-400 duration-200">
                                Access your Wishlist
                            </h2>
                        </div>

                        <button className="text-white cursor-pointer" onClick={() => setIsOpen(false)}>✕</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default WishListPopUp;
