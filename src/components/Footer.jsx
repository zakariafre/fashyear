import React from 'react'
import BflyIcon from '../assets/Icons/4.png'
import FyLogo from '../assets/Icons/1.png'

const Footer = () => {
    return (
        <div className='max-w-full h-[50vh] flex items-center flex-col'>
            <hr className='text-neutral-700 relative bottom-[10%] w-[95%]' />
            <img className=' absolute max-w-[70%] mx-auto !mt-[3%] opacity-[2%] ' src={FyLogo} alt="" draggable="false" />

            <div className='flex flex-col gap-10 !ml-5 !mb-10 font-light'>
                <img className=' max-w-[15%] mx-auto opacity-75' src={BflyIcon} alt="" draggable="false"/>
                <h2 className='w-[35%] text-2xl text-[#A1A1A1] leading-7 tracking-tighter select-none '><span className='text-white'>Elevating everyday style</span> with timeless elegance and modern sophistication</h2>
                <p className='absolute bottom-6 text-neutral-500 text-xs '>@ 2025 fashyear Inc. All rights reserved.</p>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Footer