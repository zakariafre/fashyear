import React, { useState, useEffect } from "react";
import arrow from "../../assets/Icons/arrowTop.svg";
import Plus from '../../assets/Icons/plusIcon.png'
import { useNavigate } from "react-router-dom";
import productData from '../../../ProductsDB.json'
import { useCart } from "../../context/CartContext";

const CardProduct = ({ img, title, price, setIsOpen, id, onWishlistChange }) => {



    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        return wishlist.some(item => item.id === id);
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [selectSizeOpen, setSelectSizeOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState('Size');


    // Find the product data to get all images
    const product = productData.find(p => p.id === id);
    const defaultImage = Array.isArray(img) ? img[0] : img;
    const hoverImage = product?.img?.[1] || defaultImage;

    const handleCardClick = (e) => {
        e.stopPropagation();
        navigate(`/product/${id}`);
    };

    const toggleLike = (e) => {
        e.stopPropagation();
        if (isLoading) return;
        setIsLoading(true);

        setTimeout(() => {
            const newLikedState = !isLiked;
            setIsLiked(newLikedState);

            // Update localStorage
            const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
            if (newLikedState) {
                if (!wishlist.some(item => item.id === id)) {
                    // Add product to wishlist
                    wishlist.push(product);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    localStorage.setItem('lastWishlistedProduct', id);
                    
                    // Dispatch custom event for Navbar and other components
                    window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
                        detail: { wishlist: wishlist } 
                    }));
                    
                    // Call onWishlistChange callback if provided (for real-time updates)
                    if (onWishlistChange) {
                        onWishlistChange(wishlist);
                    }
                    
                    // Only if on wishlist page and no callback, do a page reload
                    if (window.location.pathname === '/wishlist' && !onWishlistChange) {
                        setTimeout(() => {
                            setIsOpen(false);
                            window.location.reload();
                            window.scrollTo(0, 0);
                        }, 200);
                    }
                    
                    setIsOpen(true);
                    setTimeout(() => setIsOpen(false), 10000);
                }
            } else {
                // Remove product from wishlist
                const updatedWishlist = wishlist.filter(item => item.id !== id);
                localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
                
                // Dispatch custom event for Navbar and other components
                window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
                    detail: { wishlist: updatedWishlist } 
                }));
                
                // Call onWishlistChange callback if provided (for real-time updates)
                if (onWishlistChange) {
                    onWishlistChange(updatedWishlist);
                } 
                // Only if on wishlist page and no callback, do a page reload
                else if (window.location.pathname === '/wishlist') {
                    setTimeout(() => {
                        window.location.reload();
                    }, 200);
                }
            }

            setIsLoading(false);
        }, 1000);
    };




    // handle size open and close
    const handleSizeOpen = () => {
        setSelectSizeOpen(true);
    };

    const handleSizeClose = () => {
        setSelectSizeOpen(false);
    };




    // size selection
    const availableSizes = product.size;
    const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const handleSizeSelect = (e, size) => {
        e.stopPropagation();
        if (availableSizes.includes(size)) {
            setSelectedSize(size);
        }
    };



    // handle add to bag
    const handleAddToCart = (size) => {
        addToCart(product, size);
    };



    return (
        <div className="flex flex-col cursor-pointer" onClick={handleCardClick}>
            <div
                className="group relative bg-black  h-[60vh] w-[22vw] flex justify-center items-center overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Wishlist Icon */}
                <div className="absolute top-3 right-4 z-30 w-4 h-4" onClick={toggleLike}>
                    {isLoading && (
                        <svg className="absolute top-0 right-1 animate-spin" width="10" height="10" viewBox="0 0 50 50">
                            <circle cx="25" cy="25" r="20" fill="none" stroke="#212121" strokeWidth="4" strokeDasharray="120" strokeDashoffset="20" strokeLinecap="round" />
                        </svg>
                    )}

                    {!isLoading && (
                        <svg className="absolute inset-0 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"
                            fill={isLiked ? "#212121" : "none"} stroke="#212121" strokeWidth="5">
                            <path d="M50 91s-36-27-42-51c-5-19 9-36 27-36 10 0 19 6 23 15 4-9 13-15 23-15 18 0 32 17 27 36-6 24-42 51-42 51z" />
                        </svg>
                    )}
                </div>

                {/* Add to cart button */}
                <div
                    onClick={(e) => { handleSizeOpen(); e.stopPropagation(); }}
                    className="opacity-0 group-hover:opacity-100 h-10 w-[90%] bg-white border border-[#212121]/30 absolute bottom-2 z-30 flex justify-center items-center gap-2 cursor-pointer font-medium overflow-hidden">
                    <p className="text-[rgb(33,33,33)] text-[0.8rem] font-light uppercase tracking-wider">Quick add</p>
                    <div className="h-5 w-5 rounded-full absolute right-4 flex items-center justify-center">
                        <img src={Plus} className="h-5 w-5 relative" alt="" />
                    </div>
                </div>


                {/* Size selector */}
                {selectSizeOpen && (
                    <div
                        className="opacity-100 h-26 w-[90%] !py-3 bg-white absolute border border-[#212121]/30 bottom-2 z-30 flex flex-col justify-center items-center gap-2 cursor-pointer font-light overflow-hidden"
                        onMouseLeave={handleSizeClose}
                    >
                        <p className="text-[rgb(33,33,33)] bg-[#212121]/0 w-full text-center !py-1 text-[0.7rem] font-light uppercase tracking-wider">Select Size</p>
                        <div className="w-full h-full grid grid-cols-5 place-items-center text-[0.7rem] font-light">
                            {allSizes.map((size) => (
                                <div
                                    key={size}
                                    onClick={(e) => {
                                        if (!availableSizes.includes(size)) return e.stopPropagation();
                                        handleSizeSelect(e, size);
                                        handleAddToCart(size);
                                        setSelectSizeOpen(false);
                                    }}
                                    className={`transition-colors duration-200 cursor-pointer ${availableSizes.includes(size) ? '' : 'opacity-50 line-through decoration-black'}`} >
                                    <div className="w-10 h-10 hover:border text-black hover:border-neutral-300 hover:bg-[#212121]/10 duration-0 transition-all ease-in-out flex justify-center items-center">
                                        <span className=""> {size} </span>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                )}
                {/* Card Images */}
                <img
                    src={defaultImage}
                    className={`relative z-3 top-8 scale-115 transition-all duration-100 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                    alt=""
                    draggable="false"
                />
                <img
                    src={hoverImage}
                    className={`absolute z-3 top-8 scale-115 transition-all duration-100 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    alt=""
                    draggable="false"
                />
            </div>
            <div className="text-white w-full uppercase tracking-wider font-extralight text-[0.7rem] !mt-1">
                <h2>{title}</h2>
                <p className="font-light text-neutral-400">{price}<span> DH</span></p>
            </div>
        </div>
    );
};

export default CardProduct;
