import React, { useState } from 'react'
import CategoryBtn from './CategoryBtn'
import CardProduct from './CardProduct';
import Dress1 from '../../assets/Dresses/1.png'
import Dress2 from '../../assets/Dresses/2.png'
import Dress3 from '../../assets/Dresses/6.png'
import Top1 from '../../assets/Tops/1.png'
import Top2 from '../../assets/Tops/3.png'
import Top3 from '../../assets/Tops/2.png'
import Bottom1 from '../../assets/Bottoms/1.png'
import Bottom2 from '../../assets/Bottoms/2.png'
import Button from '../../components/Button'
import arrow from '../../assets/Icons/arrowTop.svg'



const CategorySection = () => {
    const [activeButton, setActiveButton] = useState('All');

    return (
        <div className='flex flex-col gap-12 h-auto w-full '>
            <h2 className='text-white tracking-tighter font-extralight text-3xl relative left-8'>Shop by Category</h2>
            <div className='flex flex-row flex-wrap justify-evenly gap-2'>
                <CategoryBtn
                    text="All"
                    isActive={activeButton === 'All'}
                    onClick={() => setActiveButton('All')}
                />
                <CategoryBtn
                    text="Sets"
                    isActive={activeButton === 'Sets'}
                    onClick={() => setActiveButton('Sets')}
                />
                <CategoryBtn
                    text="Tops"
                    isActive={activeButton === 'Tops'}
                    onClick={() => setActiveButton('Tops')}
                />
                <CategoryBtn
                    text="Bottoms"
                    isActive={activeButton === 'Bottoms'}
                    onClick={() => setActiveButton('Bottoms')}
                />
                <CategoryBtn
                    text="Dresses"
                    isActive={activeButton === 'Dresses'}
                    onClick={() => setActiveButton('Dresses')}
                />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-8 justify-items-center'>

                <CardProduct img={Dress1} title="Essential gray dress" price={349.00} />
                <CardProduct img={Top1} title="Beige faux leather trench coat" price={399.00} />
                <CardProduct img={Bottom1} title="Cream fleece casual pants" price={499.00} />

                <CardProduct img={Dress2} title="Black brocade dress" price={489.00} />
                <CardProduct img={Top2} title="Taupe down jacket" price={529.00} />
                <CardProduct img={Top3} title="Black faux leather down jacket" price={449.00} />

                <CardProduct img={Bottom2} title="Blue denim jeans skirt" price={249.00} />
                <CardProduct img={Top3} title="Black faux leather down jacket" price={449.00} />
                <CardProduct img={Dress3} title="Mocha pearl dress" price={499.00} />

            </div>

            <div className='w-full flex justify-center'>
                <div
                    className="bg-transparent outline border w-[14vw] h-[6vh] border-white rounded-[30rem] z-30 flex justify-center items-center gap-2 cursor-pointer font-medium overflow-hidden duration-200 hover:outline-solid hover:outline-1 hover:outline-white "
                >
                    <p
                        className="text-white tracking-tighter transition-all duration-200 text-[0.9rem] font-light">
                            View more
                    </p>
                    <div className="h-6 w-6 rounded-full flex items-center justify-center transition-all duration-200 group-hover:bg-transparent">
                        <img src={arrow} className="h-4 w-4 relative top-0.5" alt="" />
                    </div>
                </div>
            </div>


        </div>
    )

}

export default CategorySection;