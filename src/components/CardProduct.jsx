import React, { useState } from 'react';
import arrow from '../assets/Icons/arrowTop.svg'


const CardProduct = (props) => {

    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleLike = () => {
        if (isLoading) return; // Prevent multiple clicks during animation
        setIsLoading(true);

        setTimeout(() => {
            setIsLiked(!isLiked);
            setIsLoading(false);
        }, 1000); // Delay effect (1s)
    };

    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col gap-1 cursor-pointer'>
                {/***** Card Box ******/}
                <div className="group relative w-[22vw] h-[55vh] bg-black flex rounded-[4%] justify-center items-center overflow-hidden  ">

                    {/* wishlist icon */}
                    <div className="absolute top-3 right-4 z-30 w-4 h-4" onClick={toggleLike}>
                        {/* Loading Circle */}
                        {isLoading && (
                            <svg
                                className="absolute top-0 right-1 animate-spin"
                                width="10"
                                height="10"
                                viewBox="0 0 50 50"
                            >
                                <circle
                                    cx="25"
                                    cy="25"
                                    r="20"
                                    fill="none"
                                    stroke="#212121"
                                    strokeWidth="4"
                                    strokeDasharray="120"
                                    strokeDashoffset="20"
                                    strokeLinecap="round"
                                />
                            </svg>
                        )}

                        {/* Heart Icon */}
                        {!isLoading && (
                            <svg
                                className="absolute inset-0 transition-all duration-300"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 120 100"
                                fill={isLiked ? "#212121" : "none"}
                                stroke="#212121"
                                strokeWidth="5"
                            >
                                <path d="M50 91s-36-27-42-51c-5-19 9-36 27-36 10 0 19 6 23 15 4-9 13-15 23-15 18 0 32 17 27 36-6 24-42 51-42 51z" />
                            </svg>
                        )}
                    </div>


                    {/* Add to cart button */}
                    <div
                        className="opacity-0 group-hover:opacity-100 h-[5vh] w-[10vw] bg-white rounded-[30rem] absolute bottom-2 right-2 z-30 flex justify-center items-center gap-2 cursor-pointer font-medium overflow-hidden duration-400 ease-in-out "
                    >
                        <p className="text-[rgb(33,33,33)] text-[0.8rem] tracking-tighter">
                            ADD TO CART
                        </p>
                        <div className="h-6 w-6 bg-[#212121] rounded-full flex items-center justify-center">
                            <img src={arrow} className="h-4 w-4 relative top-0.5  " alt="" />
                        </div>
                    </div>

                    {/* Card Image */}
                    <img src={props.img} className='relative z-3 top-8 scale-110 transition-all duration-200' alt="" />
                </div>
                <div className='text-white font-extralight text-[0.7rem]'>
                    <h2>{props.title}</h2>
                    <p className=' font-light text-neutral-400'>{props.price}<span>.00 DH</span></p>
                </div>
            </div>
        </div>

    )

}

export default CardProduct;