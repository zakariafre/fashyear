import React from "react";
import Logo from '../assets/Icons/1.png'


const Show = () => {
    return (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center border-2 border-red-700">
            <img className="h-[20rem]" src={Logo} alt="" />
        </div>
    );
}



export default Show ;