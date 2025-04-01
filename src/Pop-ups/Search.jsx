import React, { useState, useEffect, useRef } from 'react';
import Logo from '../assets/Icons/1.png';
import SearchIcon from '../assets/Icons/Search.svg';
import ArrowTopRIght from '../assets/Icons/arrowTop.svg';
import '../App.css';

const Search = ({ isSearchOpen, setIsSearchOpen, products }) => {
    const [query, setQuery] = useState("");
    const contentRef = useRef(null);
    const [height, setHeight] = useState("0px");

    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (isSearchOpen) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight("0px");
        }
    }, [isSearchOpen, query, filteredProducts]);


    // Search bar Closing 
    const handleMouseMove = (event) => {
        if (!contentRef.current) return;

        const rect = contentRef.current.getBoundingClientRect();
        const buffer = 5; // 1rem (16px) as the safe distance

        const isTooLeft = event.clientX < rect.left - buffer;
        const isTooRight = event.clientX > rect.right + buffer;
        const isTooBottom = event.clientY > rect.bottom + buffer;

        if (isTooLeft || isTooRight || isTooBottom) {
            setIsSearchOpen(false);
        }
    };

    return (
        <>
            {/* Background black blured Layer  */}
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 transition-opacity duration-400 overflow-hidden"
                    onClick={() => setIsSearchOpen(false)}
                ></div>
            )}

            {/* Search PopUp */}
            <div
                style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderImage: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.4), rgba(255,255,255,0)) 1",
                    maxHeight: height, // Dynamically changing height
                }}
                className={`fixed top-5 w-[80%] rounded-[1.5rem] bg-[#303030]/90 z-60 flex flex-col justify-start items-center gap-7 !pt-25 !pb-6 duration-300 overflow-hidden
                ${isSearchOpen ? "translate-y-0 " : "-translate-y-[115%] opacity-0"}
                transition-all ease-in-out`}
                ref={contentRef}
                onMouseLeave={handleMouseMove}
            >

                {/* Input */}
                <div className='w-full h-[6vh] !pl-5 flex flex-row justify-center items-center text-white font-light text-[0.85rem]'>
                    <img className='h-[90%] relative left-9 top-0.5' src={SearchIcon} alt="" draggable="false" />
                    <input className='w-[60%] h-[6vh] rounded-[0.8rem] !pl-10 border border-neutral-400 duration-200 placeholder:font-light placeholder:text-neutral-400 outline-none focus:border-neutral-100' placeholder='Search for ...' type="text"
                        value={query} onChange={(e) => setQuery(e.target.value)} name="Search" id="" />
                    <p className='text-white text-[0.75rem] relative right-14 cursor-pointer hover:text-neutral-300 duration-200' onClick={() => setQuery("")}>Clear</p>
                </div>

                {/* Trending Searches */}
                {query === "" && (
                    <div className='w-[56%] h-[50%] flex flex-col gap-3 text-neutral-400 text-xs cursor-default'>
                        Trending Searches
                        <ul className='flex flex-col gap-1 w-full text-white font-medium cursor-pointer'>
                            {["Essential gray dress", "Blue denim jeans skirt", "Mocha pearl dress", "Cream fleece casual pants"].map((item, index) => (
                                <span key={index} className='group relative right-3 leading-6 border-0 rounded-[0.5rem] flex flex-row items-center gap-3 !pl-3 !pt-1 hover:bg-neutral-800 duration-75'>
                                    <img className='relative h-[0.8rem] rotate-45 opacity-75 group-hover:opacity-100 group-hover:rotate-0 duration-200' src={ArrowTopRIght} alt="" draggable="false" />
                                    {item}
                                </span>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Search Results */}
                {query !== "" && (
                    <div className='w-[56%] h-[50%] flex flex-col gap-3 text-neutral-400 text-xs cursor-default'>
                        Search Results
                        {filteredProducts.length > 0 ? (
                            <ul className='flex flex-col gap-1 w-full text-white font-medium cursor-pointer'>
                                {filteredProducts.map((product) => (
                                    <span key={product.id} className='group relative right-3 leading-6 border-0 rounded-[0.5rem] flex flex-row items-center gap-3 !pl-3 !pt-1 hover:bg-neutral-800 duration-75'>
                                        <img className='relative h-[0.8rem] rotate-45 opacity-75 group-hover:opacity-100 group-hover:rotate-0 duration-200' src={ArrowTopRIght} alt="" draggable="false" />
                                        <li>{product.name}</li>
                                    </span>
                                ))}
                            </ul>
                        ) : (
                            <p className='text-neutral-300'>No products found.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Search;
