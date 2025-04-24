import React from 'react'
import { Link } from 'react-router-dom'
import fashyear from '../assets/Icons/1.png'
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

const AdminNav = () => {

    const { currentUser, logout } = useAuth();


    return (
        <div>

            <div className="w-full h-16 flex items-center justify-center !z-200">
                <div className="w-[95%] h-15 fixed top-4 !px-5 border bg-neutral-900/80 backdrop-blur-sm  border-neutral-800 rounded-xl flex items-center justify-between">
                    <span className='flex items-center gap-2 '>
                        <Link to="/admin">
                            <img src={fashyear} alt="Fashyear" className="h-6" />
                        </Link>
                    </span>
                    <div className="">
                        <div className="flex items-center bg-neutral-800 rounded-lg !py-1 !px-3">
                            <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center">
                                <User size={18} className="text-neutral-300" />
                            </div>
                            <div className="!ml-3">
                                <p className="text-xs text-neutral-400">{currentUser?.email || 'admin@fashyear.com'}</p>
                                <div className="text-sm font-normal flex flex-row items-center gap-1 text-white"> <div className='h-1 w-1 bg-green-400 rounded-full'></div> <div>{currentUser?.name || 'Admin'}</div> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminNav