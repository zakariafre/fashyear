import React, { useState } from "react";
import { useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import '../../App.css'



const Filters = ({
    isFiltersOpen,
    setIsFiltersOpen,

    currentCategories,
    currentColors,
    currentSizes,
    currentSorting,

    setSelectedCategories,
    setSelectedColor,
    setSelectedSize,
    setSelectedSorting,

    setTotalFilterCount
}) => {

    const categories = ["Sets", "Dresses", "Tops", "Bottoms"];

    // States
    const [localSelectedCategories, setLocalSelectedCategories] = useState(currentCategories || []);
    const [localSelectedColor, setLocalSelectedColor] = useState(currentColors || []);
    const [localSelectedSize, setLocalSelectedSize] = useState(currentSizes || []);
    const [localSelectedSorting, setLocalSelectedSorting] = useState(currentSorting || null);

    const [openSections, setOpenSections] = useState({});



    // clear all button
    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedColor([]);
        setSelectedSize([]);
        setSelectedSorting(null);
        setOpenSections(false);

        setLocalSelectedCategories([]);
        setLocalSelectedColor([]);
        setLocalSelectedSize([]);
        setLocalSelectedSorting(null);
    };


    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };



    const handleSizeChange = (size) => {
        setLocalSelectedSize(prev =>
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size]
        );
    };



    // Replace the existing function with:
    const handleCategoryChange = (category) => {
        setLocalSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };



    // Price Sorting 
    const priceRanges = [
        { label: "Price: Low to High", value: "lowToHigh" },
        { label: "Price: High to Low", value: "highToLow" },
        { label: "Under 399 DH", min: 0, max: 399 },
        { label: "399 DH to 499 DH", min: 399, max: 499 },
        { label: "+ 499 DH", min: 499, max: Infinity }
    ];



    // Update the handler to work with single selection
    const handleSortingChange = (range) => {
        setLocalSelectedSorting(prev =>
            prev === range ? "" : range
        );
    };



    const handleColorChange = (color) => {
        setLocalSelectedColor(prev =>
            prev.includes(color)
                ? prev.filter(c => c !== color)
                : [...prev, color]
        );
    };


    // Calculate filter count
    const totalFilterCount =
        localSelectedColor.length +
        localSelectedSize.length +
        localSelectedCategories.length +
        (localSelectedSorting ? 1 : 0);



    // Update parent's count when it changes
    useEffect(() => {
        setTotalFilterCount(totalFilterCount);
    }, [totalFilterCount, setTotalFilterCount]);




    useEffect(() => {
        setTotalFilterCount(totalFilterCount);
    }, [totalFilterCount, setTotalFilterCount]);



    // Sync local state when props change
    useEffect(() => {
        setLocalSelectedCategories(currentCategories || []);
    }, [currentCategories]);

    useEffect(() => {
        setLocalSelectedColor(currentColors || []);
    }, [currentColors]);

    useEffect(() => {
        setLocalSelectedSize(currentSizes || []);
    }, [currentSizes]);

    useEffect(() => {
        setLocalSelectedSorting(currentSorting || null);
    }, [currentSorting]);



    // Apply filter on Click to "Show Products" button
    const applyFilters = () => {
        setSelectedCategories(localSelectedCategories);
        setSelectedColor(localSelectedColor);
        setSelectedSize(localSelectedSize);
        setSelectedSorting(localSelectedSorting);
        setIsFiltersOpen(false);
        setOpenSections(false);
    };



    const colors = [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#ffffff" },
        { name: "Brown", value: "#8B4513" },
        { name: "Beige", value: "#F5F5DC" },
        { name: "Gray", value: "#808080" }
    ];






    return (
        <>
            {isFiltersOpen && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-xs z-80 transition-opacity duration-300"
                    onClick={() => setIsFiltersOpen(false)}
                ></div>
            )}

            <div
                style={{
                    borderWidth: "1.2px",
                    borderStyle: "solid",
                    borderImage: "linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,0.5), rgba(255,255,255,0)) 1"
                }}
                className={`fixed top-3 right-4 h-[96%] w-[45%] bg-[#303030]/90 rounded-[1rem] overflow-y-hidden text-white transition-transform duration-300 z-90 flex flex-col 
                ${isFiltersOpen ? "translate-x-0" : "translate-x-[120%]"}
              `}
            >
                {/* header */}
                <div className="sticky z-50 top-0 bg-neutral-700 w-full h-12 flex flex-row justify-between items-center font-light tracking-tight !pl-[13%] !pr-[13%] !mt-10">
                    <a className="relative text-sm">Filter By</a>

                    <div className="flex items-center gap-4">
                        {/* Show Clear button only if filters are active */}
                        {(
                            localSelectedColor.length > 0 ||
                                localSelectedCategories.length > 0 ||
                                localSelectedSize.length > 0 ||
                                localSelectedSorting ? 1 : ""
                            // Add more conditions if needed
                        ) && (
                                <button
                                    onClick={() => clearAllFilters()}
                                    className="text-gray-300 hover:text-white text-xs flex items-center gap-1 transition-colors underline underline-offset-4 cursor-pointer"
                                >
                                    Clear All
                                </button>
                            )}

                        <button
                            className="text-white text-[0.9rem] w-8 h-8 flex justify-center items-center font-light cursor-pointer hover:bg-white/10 rounded-full transition-colors"
                            onClick={() => setIsFiltersOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                </div>




                {/* filers */}
                <div className="flex-1 overflow-y-auto gap-5 !pb-5 !pl-[13%] !pr-[13%] !pt-14 font-extralight ">


                    {/* Category Filter */}
                    <div className="flex flex-col">
                        <button
                            className="flex justify-between items-center w-full text-sm cursor-pointer !pt-5 !pb-6"
                            onClick={() => toggleSection("category")}
                        >
                            <div className="flex items-center gap-2">
                                Categories
                                {localSelectedCategories.length > 0 && (
                                    <span className="text-xs text-gray-400">({localSelectedCategories.length})</span>
                                )}
                            </div>
                            <ChevronDown className={`transition-transform ${openSections["category"] ? "rotate-180" : ""}`} size={16} />
                        </button>
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openSections["category"] ? "max-h-52 opacity-100" : "max-h-0 opacity-100"
                                }`}
                        >
                            <div className="!pb-7 flex flex-col gap-4 text-[0.7rem] text-gray-300">
                                {categories.map((categoryOption) => (
                                    <label key={categoryOption} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localSelectedCategories.includes(categoryOption)}
                                            onChange={() => {
                                                const newCategories = localSelectedCategories.includes(categoryOption)
                                                    ? localSelectedCategories.filter(c => c !== categoryOption)
                                                    : [...localSelectedCategories, categoryOption];
                                                setLocalSelectedCategories(newCategories);
                                            }}
                                            className="hidden"
                                        />
                                        <span className="w-4 h-4 border border-gray-500 rounded-[0.2rem] flex items-center justify-center">
                                            {localSelectedCategories.includes(categoryOption) &&
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3 w-3 text-white duration-200"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.293a1 1 0 011.414-1.414L8.5 11.672l6.793-6.793a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>}
                                        </span>
                                        {categoryOption}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <hr className="opacity-25" />
                    </div>



                    {/* Color Filter */}
                    <div className="flex flex-col">
                        <button
                            className="flex justify-between items-center w-full text-sm !pt-5 !pb-5 cursor-pointer "
                            onClick={() => toggleSection("color")}
                        >
                            <div className="flex items-center gap-2">
                                Color
                                {localSelectedColor.length > 0 && (
                                    <span className="text-xs text-gray-400">({localSelectedColor.length})</span>
                                )}
                            </div>
                            <ChevronDown className={`transition-transform ${openSections["color"] ? "rotate-180" : ""}`} size={16} />
                        </button>
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openSections["color"] ? "max-h-80 opacity-100" : "max-h-0 opacity-100"
                                }`}
                        >
                            <div className="!pb-7 flex flex-wrap gap-6 h-full ">
                                {colors.map((color) => (
                                    <div
                                        onClick={() => handleColorChange(color.name)}
                                        className={`flex flex-col border border-neutral-600 !p-2 gap-1 rounded-[0.3rem] text-[0.6rem] cursor-pointer ${localSelectedColor.includes(color.name) ? "text-white border-white transition-all duration-100 ease-in" : "text-neutral-500 transition-all duration-100 ease-in hover:border-neutral-500"}`}>
                                        <div
                                            key={color.value}
                                            className={`w-20 h-20 rounded-[0.2rem]`}
                                            style={{ backgroundColor: color.value }}
                                            title={color.name}
                                        >
                                        </div>
                                        <span className="!ml-0.5"> {color.name} </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr className="opacity-25" />
                    </div>


                    {/* Size Filter */}
                    <div className="flex flex-col">
                        <button
                            className="flex justify-between items-center w-full text-sm cursor-pointer !pt-5 !pb-6"
                            onClick={() => toggleSection("size")}
                        >
                            <div className="flex items-center gap-2">
                                Size
                                {localSelectedSize.length > 0 && (
                                    <span className="text-xs text-gray-400">({localSelectedSize.length})</span>
                                )}
                            </div>
                            <ChevronDown className={`transition-transform ${openSections["size"] ? "rotate-180" : ""}`} size={16} />
                        </button>
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openSections["size"] ? "max-h-52 opacity-100" : "max-h-0 opacity-100"
                                }`}
                        >
                            <div className="!pb-7 flex flex-col gap-4 text-[0.7rem] text-gray-300">
                                {["S", "M", "L", "XL", "XXL"].map((sizeOption) => (
                                    <label key={sizeOption} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localSelectedSize.includes(sizeOption)}
                                            onChange={() => handleSizeChange(sizeOption)}
                                            className="hidden"
                                        />
                                        <span className="w-4 h-4 border border-gray-500 rounded-[0.2rem] flex items-center justify-center">
                                            {localSelectedSize.includes(sizeOption) &&
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3 w-3 text-white duration-200"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.293a1 1 0 011.414-1.414L8.5 11.672l6.793-6.793a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>}
                                        </span>
                                        {sizeOption}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <hr className="opacity-25" />
                    </div>


                    {/* Price Sorting Filter */}
                    <div className="flex flex-col">
                        <button
                            className="flex justify-between items-center w-full text-sm !pt-5 !pb-5 cursor-pointer"
                            onClick={() => toggleSection("sorting")}
                        >
                            <div className="flex items-center gap-2">
                                Sort By
                                {localSelectedSorting && (
                                    <span className="text-xs text-gray-400">(1)</span>
                                )}
                            </div>
                            <ChevronDown className={`transition-transform ${openSections["sorting"] ? "rotate-180" : ""}`} size={16} />
                        </button>
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openSections["sorting"] ? "max-h-52 opacity-100" : "max-h-0 opacity-100"
                                }`}
                        >
                            <div className="!pb-7 flex flex-col gap-4 text-[0.7rem] text-gray-300">
                                {priceRanges.map((range) => (
                                    <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            checked={!localSelectedSorting ? false : localSelectedSorting.label === range.label}
                                            onChange={() => handleSortingChange(range)}
                                            className="hidden"
                                        />
                                        <span className="w-4 h-4 border border-gray-500 rounded-full flex items-center justify-center">
                                            {localSelectedSorting?.label === range.label && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </span>
                                        {range.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>


                </div>


                {/* Show Products button */}
                <div className="flex-none sticky bottom-0 bg-[#404040] h-[15%] w-full flex justify-center items-center shadow-2xl shadow-black z-50">
                    <button
                        onClick={applyFilters}
                        disabled={!(
                            localSelectedColor.length > 0 ||
                            localSelectedCategories.length > 0 ||
                            localSelectedSize.length > 0 ||
                            localSelectedSorting !== ""
                        )}
                        className={`
                        ${(
                                localSelectedColor.length > 0 ||
                                localSelectedCategories.length > 0 ||
                                localSelectedSize.length > 0 ||
                                localSelectedSorting !== ""
                            )
                                ? "bg-white hover:bg-transparent text-black hover:text-white cursor-pointer"
                                : "bg-white text-black cursor-pointer"
                            }
      border border-neutral-400 text-sm duration-300 h-[40%] w-[70%] tracking-tight font-light rounded-full
    `}
                    >
                        Show Products
                    </button>
                </div>
            </div>
        </>
    );
}

export default Filters;