import React from 'react'
import icon1 from '../assets/Icons/icon1.png'
import icon2 from '../assets/Icons/icon2.png'
import icon3 from '../assets/Icons/icon3.png'
import SpotlightCard from './SpotlightCard'
import '../App.css'



const SupportedBySectionCards = (props) => {
  return (
    <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.3)" className='custom-spotlight-card cursor-pointer w-[25vw] h-[30vh] bg-white/15 rounded-[1rem] flex flex-col gap-3 !pt-5 !pl-5 card-border'>
      <img src={props.img} className='max-w-[15%] mx-auto relative' alt="" />
      <h2 className='relative text-[1.6rem] tracking-tighter'> {props.title} </h2>
      <p className='relative text-[0.6rem] text-neutral-300 w-[80%]'> {props.description} </p>
    </SpotlightCard>


  )
}

export default SupportedBySectionCards