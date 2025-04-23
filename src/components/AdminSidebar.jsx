import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Package,
    User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import fashyear from '../assets/Icons/1.png';

const AdminSidebar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path;
    };
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    return (
        <div className="w-64 bg-neutral-900 border-r border-neutral-800 min-h-screen fixed">
            <span className='flex items-center border-b border-neutral-800 !p-4 gap-2'>
                        <Link to="/">
                            <img src={fashyear} alt="Fashyear" className="h-4" />
                        </Link>
                        <span className='text-sm font-medium uppercase tracking-widest text-neutral-300'>| Admin </span>
                    </span>
            
            <div className="!p-4 border-b border-neutral-800">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
                        <User size={20} className="text-neutral-300" />
                    </div>
                    <div className="!ml-3">
                        <p className="text-sm font-medium">{currentUser?.name || 'Admin'}</p>
                        <p className="text-xs text-neutral-400">{currentUser?.email || 'admin@fashyear.com'}</p>
                    </div>
                </div>
            </div>
            
            <nav className="!p-4">
                <ul className="!space-y-1">
                    <li>
                        <Link 
                            to="/admin" 
                            className={`flex items-center ${isActive('/admin') ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'} !px-4 !py-2 rounded`}
                        >
                            <LayoutDashboard size={18} className="!mr-3" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admin/products" 
                            className={`flex items-center ${isActive('/admin/products') ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'} !px-4 !py-2 rounded`}
                        >
                            <Package size={18} className="!mr-3" />
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admin/orders" 
                            className={`flex items-center ${isActive('/admin/orders') ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'} !px-4 !py-2 rounded`}
                        >
                            <ShoppingBag size={18} className="!mr-3" />
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admin/users" 
                            className={`flex items-center ${isActive('/admin/users') ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'} !px-4 !py-2 rounded`}
                        >
                            <Users size={18} className="!mr-3" />
                            Customers
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admin/settings" 
                            className={`flex items-center ${isActive('/admin/settings') ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'} !px-4 !py-2 rounded`}
                        >
                            <Settings size={18} className="!mr-3" />
                            Settings
                        </Link>
                    </li>
                </ul>
                
                <div className="!pt-8">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center text-red-400 hover:text-red-300 !px-4 !py-2 rounded hover:bg-red-900/20 w-full"
                    >
                        <LogOut size={18} className="!mr-3" />
                        Log Out
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default AdminSidebar; 