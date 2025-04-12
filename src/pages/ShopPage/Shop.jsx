import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import ShopCard from "../HomePage/CardProduct";
import WishListPopUp from "../../components/WishListPopUp";
import DownArrow from "../../assets/Icons/DownArrow.svg";
import filtersIcon from "../../assets/Icons/filters.svg";
import ContainerPIc2 from "../../assets/Icons/SetsCollection.png";
// Import the JSON file from the root directory
import productsData from "../../../ProductsDB.json";

import Filters from './Filters'
import SupportedBy from "../HomePage/SupportedBy";

import pattern from '../../assets/Icons/pattern.png'
import arrow from "../../assets/Icons/arrowTop.svg";









const Shop = () => {




    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    // Use the imported JSON data
    const initialProducts = productsData;


    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [totalFilterCount, setTotalFilterCount] = useState(() => {
        const categoryParam = searchParams.get('category');
        return categoryParam ? 1 : 0;
    });

    const [selectedCategories, setSelectedCategories] = useState(() => {
        const categoryParam = searchParams.get('category');
        return categoryParam ? [categoryParam] : [];
    });
    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    const [selectedSorting, setSelectedSorting] = useState(null);



    //useEffect hook updates the selected categories based on the category parameter
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategories([categoryParam]);
        }
    }, [searchParams]);



    // Clear All the Filter when CLear button clicked
    const clearAllFilters = () => {
        // Clear all filter states
        setSelectedCategories([]);
        setSelectedColor([]);
        setSelectedSize([]);
        setSelectedSorting(null);

        // Reset the filter count
        setTotalFilterCount(0);
    };



    // Update the filteredProducts logic in 
    const filteredProducts = initialProducts
        .filter(product => {

            // Filter by category
            const categoryMatch = selectedCategories.length === 0 ||
                (product.category && selectedCategories.includes(product.category));


            // Filter by color - check if product has color and if it matches selected colors
            const colorMatch = selectedColor.length === 0 ||
                (product.colors && product.colors.some(color =>
                    selectedColor.includes(color.name)));


            // Filter by size - handle both string and array sizes
            const sizeMatch = selectedSize.length === 0 ||
                (product.size &&
                    (Array.isArray(product.size)
                        ? product.size.some(size => selectedSize.includes(size))
                        : selectedSize.includes(product.size)));


            if (selectedSorting?.min !== undefined && selectedSorting?.max !== undefined) {
                return product.price >= selectedSorting.min && product.price <= selectedSorting.max;
            }


            return categoryMatch && colorMatch && sizeMatch;


        }).sort((a, b) => {
            if (selectedSorting?.value === 'lowToHigh') return a.price - b.price;
            if (selectedSorting?.value === 'highToLow') return b.price - a.price;
            return 0;
        });



    // Disable scroll when sidebar is open
    useEffect(() => {
        if (isFiltersOpen) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'auto'; // Enable scrolling
        }

        // Cleanup on component unmount or when isOpen changes
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isFiltersOpen]); // Triggered when isOpen changes





    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);



    const handleHomeReturn = () => {
        navigate('/');
    }











    return (
        <div className="relative min-h-screen w-full flex flex-col items-center gap-2 text-white !mt-25 ">

            <Filters
                isFiltersOpen={isFiltersOpen}
                setIsFiltersOpen={setIsFiltersOpen}
                // Pass down the current filter states
                currentCategories={selectedCategories}
                currentColors={selectedColor}
                currentSizes={selectedSize}
                currentSorting={selectedSorting}
                // Pass down the setters
                setSelectedCategories={setSelectedCategories}
                setSelectedColor={setSelectedColor}
                setSelectedSize={setSelectedSize}
                setSelectedSorting={setSelectedSorting}

                setTotalFilterCount={setTotalFilterCount}
                clearAllFilters={clearAllFilters}
            />



            {/* Filters button */}
            <div className="absolute w-full z-20 flex justify-end">

                {/* filter button */}
                <button
                    onClick={() => setIsFiltersOpen(true)}
                    className="opacity-80 group hover:opacity-100 !mr-10 cursor-pointer !px-3 font-extralight text-[0.65rem] bg-transparent duration-400 w-fit h-[4.5vh] rounded-[1.5rem] flex flex-row justify-center items-center gap-3"
                >
                    <span className="w-fit underline underline-offset-4 flex flex-row items-center justify-center font-light uppercase tracking-widest gap-1">
                        Filter
                        {totalFilterCount > 0 && (
                            <span className="text-white text-[0.65rem]">
                                ({totalFilterCount})
                            </span>
                        )}
                    </span>

                </button>
            </div>



            {/* No match Message and You might like */}
            <>
                {/* Message "No product Match filters" */}
                {filteredProducts.length === 0 ? (
                    <>
                        <div className="w-full h-[40vh] !mt-12 flex flex-col items-center justify-center gap-6 font-extralight overflow-hidden">

                            <div className="z-10 absolute flex flex-col gap-6 justify-center items-center">
                                <h3 className="text-2xl text-center text-neutral-400 font-medium tracking-tight">Oops, we're still stitching up the perfect piece for you !</h3>
                                {/* buttons */}
                                <div className="flex flex-row justify-center items-center gap-5">
                                    <button
                                        onClick={handleHomeReturn}
                                        className="!px-5 !py-2 flex flex-row gap-3 justify-center uppercase tracking-wider items-center text-[0.65rem] font-light border border-neutral-600 hover:border-neutral-300 text-neutral-200 rounded-full cursor-pointer ease-in-out duration-200"
                                    >
                                        <p>Return to Home</p>
                                        <img src={arrow} className="h-3.5 !mt-0.5 " alt="" />

                                    </button>

                                    <button
                                        onClick={clearAllFilters}
                                        className="!px-5 !py-2 text-xs font-light uppercase tracking-wider text-[0.65rem] border  border-neutral-700  bg-neutral-700 rounded-full cursor-pointer hover:bg-neutral-800 ease-in-out duration-200"
                                    >
                                        Browse All Products
                                    </button>

                                </div>

                            </div>
                            <div className='w-full relative '>
                                <img src={pattern} draggable="false" alt="pattern" className='relative inset-0 z-3 opacity-[4%] scale-100 filter brightness-100 contrast-0 saturate-0 ' />
                            </div>
                        </div>

                        {/* you might like */}
                        <div className="w-full !mx-auto !px-10 !mt-10 !mb-10 font-light tracking-wider flex flex-col justify-center items-center uppercase text-xl">
                            <h2 className="!mb-4">You might like these</h2>

                            <div className="w-full !mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-18 gap-x-6 place-items-center">
                                {initialProducts.slice(0, 6).map((product) => (
                                    <ShopCard
                                        key={product.id}
                                        id={product.id}
                                        img={product.img[0]}
                                        title={product.title}
                                        price={product.price}
                                        setIsOpen={setIsOpen}
                                    />
                                ))}
                            </div>

                        </div>
                    </>
                ) : (
                    <div className="container !mx-auto !px-10 !mt-12 !mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-18 gap-x-6 place-items-center">
                            {filteredProducts.map((product) => (
                                <ShopCard
                                    key={product.id}
                                    id={product.id}
                                    img={product.img[0]}
                                    title={product.title}
                                    price={product.price}
                                    setIsOpen={setIsOpen}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </>




            <div className="flex flex-col w-full !mt-18 gap-10">
                <hr className="opacity-5" />
            </div>

            {/* Wishlist Popup */}
            <WishListPopUp isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default Shop;
