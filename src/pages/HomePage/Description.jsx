import React from 'react'
import Pattern from '../../assets/Icons/pattern.png'



const Description = () => {
  return (
    <div className='w-full flex justify-center items-center h-[40vh] rounded-[5rem] overflow-hidden text-white tracking-tighter font-light text-[1.1rem]'>
      <p className='absolute z-30 text-neutral-400'>Fashyear is more than just a clothing brand—it's a celebration of timeless style, where fashion meets simplicity. <br /> Dedicated to the modern, modest woman who values both style and comfort, our pieces are designed to <br /> seamlessly combine elegant, modest fashion with timeless sophistication. Each garment is carefully crafted to make <br /> you feel confident while staying true to your values of modesty and elegance.</p>
      <div className='w-full relative '>
      <img src={Pattern} alt="" className='relative inset-0 z-3 opacity-[7%] scale-130 filter brightness-100 contrast-0 saturate-0 '/>
      </div>


    </div>
  )
}

export default Description