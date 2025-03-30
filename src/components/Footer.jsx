import React from 'react'
import BflyIcon from '../assets/Icons/4.png'
import FyLogo from '../assets/Icons/1.png'

const Footer = () => {
    return (
        <div className='max-w-full h-[50vh] flex items-center flex-col'>
            <hr className='text-neutral-800 relative bottom-[10%] w-[90%]' />
            <img className=' absolute max-w-[70%] mx-auto !mt-[3%] opacity-[2%] ' src={FyLogo} alt="" draggable="false" />

            <div className='flex flex-col gap-10 font-light'>
                <img className=' max-w-[15%] mx-auto relative left-10 opacity-75' src={BflyIcon} alt="" draggable="false" />
                <h2 className='w-[35%] text-2xl relative left-10 text-[#A1A1A1] leading-7 tracking-tighter select-none '><span className='text-white'>Elevating everyday style</span> with timeless elegance and modern sophistication</h2>
                <p className='absolute left-[13%] bottom-[0.5%] text-neutral-500 text-xs '>@ 2025 fashyear Inc. All rights reserved.</p>
                <ul className='flex flex-row gap-10 text-neutral-500 cursor-pointer text-xs absolute bottom-[0.5%] right-[15%]'>
                    <li>Terms of Services</li>
                    <li>Privacy Policy </li>
                    <li>Cookies</li>
                </ul>
            </div>
            
            <div className=' text-[#A1A1A1] absolute right-[15%] bottom-[3.5%] flex flex-col gap-3'>
                <ul className='flex flex-row gap-20 font-bold '>
                    <li>FOLLOW
                        <ul className='flex flex-col relative top-5 gap-2 font-light cursor-pointer '>
                            <li className=' hover:text-neutral-200 duration-200'>Instagram</li>
                            <li className=' hover:text-neutral-200 duration-200'>Facebook</li>
                            <li className=' hover:text-neutral-200 duration-200'>X (Twitter)</li>
                        </ul>
                    </li>
                    <li>PAGES
                        <ul className='flex flex-col relative top-5 gap-2 font-light cursor-pointer'>
                            <li className=' hover:text-neutral-200 duration-200'>Home</li>
                            <li className=' hover:text-neutral-200 duration-200'>Shop</li>
                            <li className=' hover:text-neutral-200 duration-200'>About</li>
                        </ul>
                    </li>
                    <li>CONTACT
                        <ul className='flex flex-col relative top-5 gap-2 font-light cursor-pointer'>
                            <li className=' hover:text-neutral-200 duration-200'>Reach Us</li>
                        </ul>
                    </li>
                </ul>
            </div>


        </div>
    )
}

export default Footer