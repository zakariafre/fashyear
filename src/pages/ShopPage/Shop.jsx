import React from 'react'
import { useState } from 'react'
import CardProduct from '../HomePage/CardProduct'
import filtersIcon from '../../assets/Icons/filters.svg'
import WishListPopUp from '../../Pop-ups/WishListPopUp'
import Dress1 from '../../assets/Dresses/1.png'
import Dress2 from '../../assets/Dresses/2.png'
import Dress3 from '../../assets/Dresses/6.png'
import Top1 from '../../assets/Tops/1.png'
import Top2 from '../../assets/Tops/3.png'
import Top3 from '../../assets/Tops/2.png'
import Bottom1 from '../../assets/Bottoms/1.png'
import Bottom2 from '../../assets/Bottoms/2.png'
import ContainerPIc from '../../assets/Icons/lgPic.png'
import arrow from '../../assets/Icons/arrowTop.svg'

const Shop = () => {


    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className='relative min-h-screen top-[20vh] w-full flex flex-col gap-10 text-white !mb-20 '>

            {/* filters button */}
            <div className=' w-full flex justify-end'>
                <button className='font-extralight text-sm bg-transparent border border-neutral-400 w-[10vw] h-[5vh] rounded-[1.5rem] flex flex-row justify-center items-center gap-3 hover:outline-solid hover:outline-1 hover:outline-neutral-300'>
                    <p>Filters</p>
                    <img className='h-4' src={filtersIcon} alt="" />
                </button>
            </div>


            {/* Image Container */}
            <div className='w-full h-[80vh] text-2xl font-light flex flex-col items-center gap-5'>
                <div className='h-[90%] bg-black rounded-[1rem] overflow-hidden'>
                    <h2>Fall-Winter 2025</h2>
                    <img className='relative bottom-[5rem]' src={ContainerPIc} alt="" />

                </div>
            </div>


            {/* Products Cards 6 */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-8 justify-items-center gap-x-8'>
                <CardProduct img={Dress2} title="Black brocade dress" price={489.00} setIsOpen={setIsOpen} />
                <CardProduct img={Top2} title="Taupe down jacket" price={529.00} setIsOpen={setIsOpen} />
                <CardProduct img={Top3} title="Black faux leather down jacket" price={449.00} setIsOpen={setIsOpen} />

                <CardProduct img={Bottom2} title="Blue denim jeans skirt" price={249.00} setIsOpen={setIsOpen} />
                <CardProduct img={Top3} title="Black faux leather down jacket" price={449.00} setIsOpen={setIsOpen} />
                <CardProduct img={Dress3} title="Mocha pearl dress" price={499.00} setIsOpen={setIsOpen} />



            </div>

            {/* View more Button */}
            <div className='w-full flex justify-center'>
                <div
                    className="bg-transparent outline-0 border w-[14vw] h-[6vh] border-white rounded-[30rem] z-30 flex justify-center items-center gap-2 cursor-pointer font-medium overflow-hidden duration-200 hover:outline-solid hover:outline-1 hover:outline-white "
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


            {/* Image Container */}
            <div className='w-full h-[80vh] text-2xl font-light flex flex-col items-center gap-5 !mt-10'>
                <h2 className=''>Fall Dresses 2025</h2>
                <div className='h-[90%] bg-black rounded-[1rem] overflow-hidden'>
                    <h2>Fall-Winter 2025</h2>
                    <img className='relative bottom-[5rem]' src={ContainerPIc} alt="" />

                </div>
            </div>


            {/* Products Cards 6 */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-8 justify-items-center gap-7'>
                <CardProduct img={Dress1} title="Essential gray dress" price={349.00} setIsOpen={setIsOpen} />
                <CardProduct img={Top1} title="Beige faux leather trench coat" price={399.00} setIsOpen={setIsOpen} />
                <CardProduct img={Bottom1} title="Cream fleece casual pants" price={499.00} setIsOpen={setIsOpen} />

                <CardProduct img={Bottom2} title="Blue denim jeans skirt" price={249.00} setIsOpen={setIsOpen} />
                <CardProduct img={Top3} title="Black faux leather down jacket" price={449.00} setIsOpen={setIsOpen} />
                <CardProduct img={Dress3} title="Mocha pearl dress" price={499.00} setIsOpen={setIsOpen} />

            </div>
            <WishListPopUp isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default Shop