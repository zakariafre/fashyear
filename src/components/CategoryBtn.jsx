import React from 'react';
import fyIcon from '../assets/Icons/5.svg';

const CategoryBtn = ({ text, isActive, onClick }) => {
    return (
        <button
            id='customSpan2'
            onClick={onClick}
            className={` cursor-pointer transition-all duration-200 ease-in-out inline-flex items-center span gap-5 border font-medium rounded-[30rem] text-[1.5rem] leading-[2rem]
             ${isActive ? 'bg-white text-[#1C1C1C]' : 'text-white border-white'}`}
        >
            <img
                className={`h-4 transition-all duration-500 ease-in-out ${isActive ? 'filter brightness-[20%] ' : ''}`}
                src={fyIcon}
                alt="icon"
            />
            {text}
        </button>
    );
};

export default CategoryBtn;