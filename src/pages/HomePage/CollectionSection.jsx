import React from 'react'
import Button from '../../components/Button'
import CollectionPic1 from '../../assets/Icons/Collection.png'
import CollectionPic2 from '../../assets/Icons/Collection2.png'
import '../../App.css'


const CollectionSection = () => {
    return (
        <div className=' h-[80vh] w-full flex flex-row gap-2 '>
            {/* Card 1 */}
            <div className='Custom-cursor h-full w-[60%] bg-white rounded-[5%] overflow-hidden'>
                <img className='scale-125 relative bottom-14' src={CollectionPic1} alt="" />
            </div>

            <div className=' h-full w-[40%] flex flex-col gap-7 '>
                <h2 className='text-[4.5rem] tracking-tighter text-white leading-[4rem]'>Winter <br /> Collection </h2>
                <Button text="Discover" HeightNumber={5.5} WidthNumber={10} />
                {/* Card 2 */}
                <div className='Custom-cursor h-[60%] bg-white rounded-[8%] overflow-hidden'>
                <img className='scale-105 relative bottom-14' src={CollectionPic2} alt="" />
                </div>
            </div>

        </div>
    )
}

export default CollectionSection