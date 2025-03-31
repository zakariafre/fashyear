import React from "react";
import arrow from "../assets/Icons/arrowTop.svg";

const Btn = ({ text, HeightNumber, WidthNumber}) => {

  return (

    <div
      className="group border border-white bg-white rounded-[30rem] z-40 flex justify-center items-center gap-2 cursor-pointer font-medium overflow-hidden duration-200 hover:bg-transparent"
      style={{ width: `${WidthNumber}vw`, height: `${HeightNumber}vh` }}
    >
      <p 
      className="text-[rgb(33,33,33)] tracking-tighter transition-all duration-200 text-[0.9rem] group-hover:text-white group-hover:font-light">
        {text}
      </p>
      <div className="h-6 w-6 bg-[#212121] rounded-full flex items-center justify-center transition-all duration-200 group-hover:bg-transparent">
        <img src={arrow} className="h-4 w-4 relative top-0.5" alt="" />
      </div>
    </div>
  );
};

export default Btn;
