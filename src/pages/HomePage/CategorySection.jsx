import React, { useState } from 'react'
import WishListPopUp from '../../components/WishListPopUp';
import '../../App.css'

// images 
import dress from '../../assets/Dresses/essential-navy-dress_Pos1.png'
import set from '../../assets/Sets/Set_Black_Pos1.png'
import top from '../../assets/Tops/dark-gray-loose-fitting-high-nec_Pos2.png'
import bottom from '../../assets/Bottoms/jean-loose-salam-light-blue_Pos1.png'
import Burkini from '../../assets/Burkini/chocolate-palazzo-burkini_Pos1.png'
import Hijab from '../../assets/Hijabs/hijab-jersey-luxe-soft-ready-to_Pos1.png'

import productsData from '../../../ProductsDB.json';
import { useNavigate } from 'react-router-dom';


const CategorySection = () => {
    const [activeButton, setActiveButton] = useState('All');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Filter products based on selected category
    const filteredProducts = activeButton === 'All'
        ? productsData
        : productsData.filter(product => product.category === activeButton);

    // Get the first 9 products from filtered results
    const displayedProducts = filteredProducts.slice(0, 9);

    const handleCategoryClick = (category) => {
        navigate(`/shop?category=${category}`);
    };

    return (
        <div className='flex flex-col justify-center items-center gap-10 h-auto w-full'>
            <h2 className='text-white tracking-wider font-normal uppercase text-2xl'>Shop by Category</h2>

            <div className='h-full w-[90%] grid grid-cols-3 gap-x-0 gap-y-3 justify-items-center'>

                <div onClick={() => handleCategoryClick('Dresses')} className='group h-[70vh] w-[29vw] bg-black flex items-center justify-center !pt-14 overflow-hidden cursor-pointer relative'>
                    <div className='absolute inset-0 flex items-center justify-center z-30'>
                        <h2 className='opacity-0 text-white tracking-wider font-light text-[3rem] uppercase group-hover:opacity-100 transition-all duration-300'>Dresses</h2>
                    </div>
                    <img src={dress} className='scale-100 group-hover:blur-md group-hover:opacity-50 transition-all duration-300 ease-out group-hover:scale-135' alt="" />
                </div>
                <div onClick={() => handleCategoryClick('Sets')} className='group h-[70vh] w-[29vw] bg-black flex items-center justify-center !pt-20 overflow-hidden cursor-pointer relative'>
                    <div className='absolute inset-0 flex items-center justify-center z-30'>
                        <h2 className='opacity-0 text-white tracking-wider font-light text-[3rem] uppercase group-hover:opacity-100 transition-all duration-300'>Sets</h2>
                    </div>
                    <img src={set} className='scale-120 group-hover:blur-md group-hover:opacity-50 transition-all duration-300 ease-out group-hover:scale-150' alt="" />
                </div>
                <div onClick={() => handleCategoryClick('Tops')} className='group h-[70vh] w-[29vw] bg-black flex items-center justify-center overflow-hidden !pt-14 cursor-pointer relative'>
                    <div className='absolute inset-0 flex items-center justify-center z-30'>
                        <h2 className='opacity-0 text-white tracking-wider font-light text-[3rem] uppercase group-hover:opacity-100 transition-all duration-300'>Tops</h2>
                    </div>
                    <img src={top} className='scale-120 group-hover:blur-md !mb-10 group-hover:opacity-50 transition-all duration-300 ease-out  group-hover:scale-140' alt="" />
                </div>
                <div onClick={() => handleCategoryClick('Bottoms')} className='group h-[70vh] w-[29vw] bg-black flex items-center justify-center overflow-hidden !pt-5 cursor-pointer relative'>
                    <div className='absolute inset-0 flex items-center justify-center z-30'>
                        <h2 className='opacity-0 text-white tracking-wider font-light text-[3rem] uppercase group-hover:opacity-100 transition-all duration-300'>Bottoms</h2>
                    </div>
                    <img src={bottom} className='scale-110 group-hover:blur-md !mt-5 group-hover:opacity-50 transition-all duration-300 ease-out group-hover:scale-130 ' alt="" />
                </div>
                <div onClick={() => handleCategoryClick('Burkini')} className='group h-[70vh] w-[29vw] bg-black flex items-center justify-center overflow-hidden !pt-14 cursor-pointer relative'>
                    <div className='absolute inset-0 flex items-center justify-center z-30'>
                        <h2 className='opacity-0 text-white tracking-wider font-light text-[3rem] uppercase group-hover:opacity-100 transition-all duration-300'>Burkini</h2>
                    </div>
                    <img src={Burkini} className='scale-110 group-hover:blur-md group-hover:opacity-50 transition-all duration-300 ease-out group-hover:scale-150' alt="" />
                </div>
                <div onClick={() => handleCategoryClick('Hijabs')} className='group h-[70vh] w-[29vw] bg-black flex items-center justify-center overflow-hidden !pt-5 cursor-pointer relative'>
                    <div className='absolute inset-0 flex items-center justify-center z-30'>
                        <h2 className='opacity-0 text-white tracking-wider font-light text-[3rem] uppercase group-hover:opacity-100 transition-all duration-300'>Hijabs</h2>
                    </div>
                    <img src={Hijab} className='scale-100 group-hover:blur-md group-hover:opacity-50 transition-all duration-300 ease-out group-hover:scale-150' alt="" />
                </div>
            </div>



            {/* <div className='w-full flex justify-center'>
                <div
                    onClick={handleShopNow}
                    className="bg-transparent outline border w-[14vw] h-[6vh] border-white rounded-[30rem] z-30 flex justify-center items-center gap-2 cursor-pointer font-medium overflow-hidden duration-200 hover:outline-solid hover:outline-1 hover:outline-white "
                >
                    <p
                        className="text-white tracking-tighter transition-all duration-200 text-[0.9rem] font-light">
                            Shop Now
                    </p>
                    <div className="h-6 w-6 rounded-full flex items-center justify-center transition-all duration-200 group-hover:bg-transparent">
                        <img src={arrow} className="h-4 w-4 relative top-0.5" alt="" />
                    </div>
                </div>
            </div> */}

            <WishListPopUp isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default CategorySection;