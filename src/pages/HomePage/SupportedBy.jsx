import React from 'react'
import SupportedBySectionCards from './SupportedBySectionCards';
import icon1 from '../../assets/Icons/icon1.png'
import icon2 from '../../assets/Icons/icon2.png'
import icon3 from '../../assets/Icons/icon3.png'


const SupportedBy = () => {

    return (
        <div className='h-[50vh] w-full flex flex-col gap-10 text-white'>
            <h2 className='tracking-tighter font-extralight text-3xl relative left-6'>We Supported By</h2>

            <div className=' flex flex-row gap-3 justify-center'>
                <SupportedBySectionCards img={icon1} title="Cash on Delivery" description="Offer a cash-on-delivery option to give you more confidence and convenience while shopping." />
                <SupportedBySectionCards img={icon3} title="Express Delivery" description="We are supported by top-tier logistics companies to ensure fast and safe delivery worldwide"/>
                <SupportedBySectionCards img={icon2} title="Easy Returns"  description="We offer secure transactions, buyer protection, and an easy 14-day return policy"/>
            </div>
        </div>
    )
}

export default SupportedBy;