import React from 'react';
import set1 from '../../assets/Sets/Set_White_Pos3.png'
import set2 from '../../assets/Sets/Set_Brown_Pos2.png'

import dress1 from '../../assets/Dresses/essential-taupe-dress_Pos1.png'
import dress2 from '../../assets/Dresses/minimalist-two-tone-black-and-be_Pos3.png'




const NewArrival = (props) => {
    return (

        <>
            <div className='h-auto w-full flex flex-col gap-[1px]'>

                <div className="h-[100vh] w-full cursor-pointer">

                    <div className='absolute w-full !mt-[22%] z-30 font-light tracking-widest flex flex-col justify-center items-center gap-6 uppercase text-black' >
                        <h2 className='text-2xl font-normal '>new sets arrival</h2>
                        <button className='uppercase text-xs relative group cursor-pointer'>
                            <span>shop now</span>
                            <span className='absolute bottom-0 right-0 w-full h-[1px] bg-black transition-all duration-300 group-hover:w-0'></span>
                            <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 delay-300 group-hover:w-full'></span>
                        </button>
                    </div>

                    <div className="h-full w-full flex flex-row justify-center items-center gap-[1px] overflow-hidden">


                        <div className='h-full w-full '>
                            <img src={set1} alt="New Set Front View" />
                        </div>

                        <div className='h-full w-full'>
                            <img src={set2} alt="New Set Back View" />
                        </div>

                    </div>

                </div>





                <div className="h-[100vh] w-full cursor-pointer">

                    <div className='absolute w-full !mt-[22%] z-30 font-light tracking-widest flex flex-col justify-center items-center gap-6 uppercase text-black' >
                        <h2 className='text-2xl font-normal '>new dresses arrival</h2>
                        <button className='uppercase text-xs relative group cursor-pointer'>
                            <span>shop now</span>
                            <span className='absolute bottom-0 right-0 w-full h-[1px] bg-black transition-all duration-300 group-hover:w-0'></span>
                            <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 delay-300 group-hover:w-full'></span>
                        </button>
                    </div>

                    <div className="h-full w-full flex flex-row justify-center items-center gap-[1px] overflow-hidden">


                        <div className='h-full w-full '>
                            <img src={dress1} alt="New Set Front View" />
                        </div>

                        <div className='h-full w-full'>
                            <img src={dress2} alt="New Set Back View" />
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default NewArrival;