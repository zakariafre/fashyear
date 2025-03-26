import React from 'react'
import CardProduct from './CardProduct'
import Dress1 from '../assets/Dresses/1.png'
import Dress2 from '../assets/Dresses/2.png'
import Dress3 from '../assets/Dresses/6.png'
import Top1 from '../assets/Tops/1.png'
import Top2 from '../assets/Tops/3.png'
import Top3 from '../assets/Tops/2.png'
import Bottom1 from '../assets/Bottoms/1.png'
import Bottom2 from '../assets/Bottoms/2.png'
import Button from './Button'

const BestSeller = () => {

    return (
        <div className='flex flex-col gap-6 h-auto w-full '>
            <h2 className='text-white tracking-tighter font-extralight text-3xl relative left-8'>Loved by Many</h2>

            <div className='relative left-[67vw]'>
                <Button text="View more" HeightNumber={5.5} WidthNumber={10} />

            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-8 justify-items-center'>

                <CardProduct img={Dress1} title="Essential gray dress" price={349.00} />
                <CardProduct img={Top1} title="Beige faux leather trench coat" price={399.00} />
                <CardProduct img={Bottom1} title="Cream fleece casual pants" price={499.00} />

            </div>

            


        </div>  
    )
}

export default BestSeller