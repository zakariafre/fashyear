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
        <div className="w-64 !ml-8 text-sm bg-neutral-900 border border-neutral-800 rounded-xl min-h-[84%] fixed">


            <nav className="!px-4 !pt-6">
                <ul className="!space-y-2">
                    <li>
                        <Link
                            to="/admin"
                            className={`flex items-center ${isActive('/admin') ? 'text-black bg-neutral-300 duration-200' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'} !px-4 !py-2 rounded`}
                        >
                            <LayoutDashboard size={18} className="!mr-3" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/products"
                            className={`flex items-center ${isActive('/admin/products') ? 'text-black bg-neutral-300 duration-200' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'} !px-4 !py-2 rounded`}
                        >
                            <Package size={18} className="!mr-3" />
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/orders"
                            className={`flex items-center ${isActive('/admin/orders') ? 'text-black bg-neutral-300 duration-200' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'} !px-4 !py-2 rounded`}
                        >
                            <ShoppingBag size={18} className="!mr-3" />
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/users"
                            className={`flex items-center ${isActive('/admin/users') ? 'text-black bg-neutral-300 duration-200' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'} !px-4 !py-2 rounded`}
                        >
                            <Users size={18} className="!mr-3" />
                            Customers
                        </Link>
                    </li>
                </ul>

                <div className="!space-y-2 !mt-60">
                    <Link
                        to="/admin/settings"
                        className={`flex items-center ${isActive('/admin/settings') ? 'text-black bg-neutral-300 duration-200' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'} !px-4 !py-2 rounded`}
                    >
                        <Settings size={18} className="!mr-3" />
                        Settings
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center cursor-pointer text-red-400 hover:text-red-300 !px-4 !py-2 rounded hover:bg-red-900/20 w-full"
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