import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WishListPopUp = ({ isOpen, setIsOpen, product }) => {



    
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    
    // Trigger when isOpen changes
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true); // Popup appears when isOpen is true
        } else {
            setTimeout(() => setIsVisible(false), 300); // After 300ms (animation duration), remove the popup from the DOM
        }
    }, [isOpen]);

    // Ensure product has valid image data
    const getProductImage = () => {
        if (!product) return '';
        
        // Handle case where product.img might be a string or an array
        if (Array.isArray(product.img)) {
            return product.img[0];
        }
        
        return product.img;
    };
    

    return (
        <>
            {/* Background overlay with smooth fade-in and fade-out */}
            {isVisible && (
                <div
                    className={`fixed inset-0 bg-black/80 z-45 transition-opacity duration-300 
                    ${isOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Wishlist Popup with smooth fade-in & zoom-in on open and fade-out & zoom-out on close */}
            {isVisible && (
                <div
                    className={`fixed top-[15%] left-[30%] w-[40%] h-[10%] overflow-hidden rounded-[0.5rem] bg-neutral-700/90 z-50 border border-neutral-400/50 
                    flex flex-col justify-center items-center text-neutral-300 font-light transition-all duration-300 
                    ${isOpen ? "opacity-100" : "opacity-0 "}`}
                >
                    <div className="flex flex-row gap-12 overflow-hidden justify-between items-center">
                        <div className="w-[10%] h-full">
                            {product && <img id={product.id} src={getProductImage()} alt={product.title || "Product"} />}
                        </div>
                        <div className="flex flex-col max-w-[90%] w-fit">
                            <h2 className="text-[0.75rem] tracking-normal">
                                {'the item has been added to your wishlist'}
                            </h2>
                            <h2 className="text-[0.7rem] tracking-normal underline underline-offset-2 cursor-pointer text-neutral-400 hover:text-neutral-200 duration-200" onClick={() => navigate('/wishlist')}>
                                Access your Wishlist
                            </h2>
                        </div>

                        <button className="text-white cursor-pointer w-[10%] h-full !mr-5" onClick={() => setIsOpen(false)}>✕</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default WishListPopUp;
