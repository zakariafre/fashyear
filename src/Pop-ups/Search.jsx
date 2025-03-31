import React from 'react'
import Logo from '../assets/Icons/1.png'
import SearchIcon from '../assets/Icons/Search.svg'
import ArrowTopRIght from '../assets/Icons/arrowTop.svg'



const Search = () => {

    return (
        <>
            <div
                className="fixed hidden inset-0 bg-black/70 backdrop-blur-xs z-50 transition-opacity duration-300 overflow-hidden"
            ></div>


            <div className='absolute hidden inset-0 w-[100vw] h-[60vh] bg-[#303030] z-60 overflow-hidden flex flex-col justify-start items-center gap-7 !pt-9'>
                <img className='h-[9%]' src={Logo} alt="" draggable="false" />

                <div className='w-full h-[6vh] !pl-5 flex flex-row justify-center items-center text-white font-light text-[0.85rem]'>
                    <img className='h-[90%] relative left-9 top-0.5' src={SearchIcon} alt="" />
                    <input className='w-[60%] h-[6vh] rounded-[0.8rem] !pl-10 border border-neutral-400 duration-200 placeholder:font-light placeholder:text-neutral-100 outline-none focus:border-neutral-100' placeholder='Search Fashyear.com' type="text" name="Search" id="" />
                    <p className='text-white text-[0.75rem] relative right-14 cursor-pointer hover:text-neutral-300 duration-200'>Clear</p>
                </div>

                <div className='w-[56%] h-[50%] flex flex-col gap-3 text-neutral-400 text-xs cursor-default'>
                    Trending Searches


                    <ul className='flex flex-col gap-1 w-full text-white font-light cursor-pointer '>

                        <span className='group relative right-3 leading-6 border-0 rounded-[0.5rem] flex flex-row items-center gap-3 !pl-3 !pt-1 hover:bg-neutral-800 duration-75'>
                            <img className='relative h-[0.8rem] rotate-45 opacity-75 group-hover:opacity-100 group-hover:rotate-0 duration-200' src={ArrowTopRIght} alt="" />
                            <li className=''>Essential gray dress</li>
                        </span>

                        <span className='group relative right-3 leading-6 border-0 rounded-[0.5rem] flex flex-row items-center gap-3 !pl-3 !pt-1 hover:bg-neutral-800 duration-75'>
                            <img className='relative h-[0.8rem] rotate-45 opacity-75 group-hover:opacity-100 group-hover:rotate-0 duration-200' src={ArrowTopRIght} alt="" />
                            <li className=''>Blue denim jeans skirt</li>
                        </span>

                        <span className='group relative right-3 leading-6 border-0 rounded-[0.5rem] flex flex-row items-center gap-3 !pl-3 !pt-1 hover:bg-neutral-800 duration-75'>
                            <img className='relative h-[0.8rem] rotate-45 opacity-75 group-hover:opacity-100 group-hover:rotate-0 duration-200' src={ArrowTopRIght} alt="" />
                            <li className=''>Mocha pearl dress</li>
                        </span>

                        <span className='group relative right-3 leading-6 border-0 rounded-[0.5rem] flex flex-row items-center gap-3 !pl-3 !pt-1 hover:bg-neutral-800 duration-75'>
                            <img className='relative h-[0.8rem] rotate-45 opacity-75 group-hover:opacity-100 group-hover:rotate-0 duration-200' src={ArrowTopRIght} alt="" />
                            <li className=''>Cream fleece casual pants</li>
                        </span>
                    </ul>
                </div>
            </div>
        </>

    )

}


export default Search