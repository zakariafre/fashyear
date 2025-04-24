import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    User,
    ShoppingBag,
    Heart,
    CreditCard,
    MapPin,
    Settings,
    LogOut,
    Edit3,
    Check,
    X
} from 'lucide-react';

const Profile = () => {
    const { currentUser, isAuthenticated, logout, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });

    // Redirect if not logged in
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            // Populate form data with current user info
            setFormData({
                name: currentUser.name || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                address: currentUser.address || '',
                city: currentUser.city || '',
                state: currentUser.state || '',
                zipCode: currentUser.zipCode || '',
                country: currentUser.country || ''
            });
        }
    }, [isAuthenticated, navigate, currentUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Mock order history data
    const mockOrders = [
        {
            id: 'ORD-001',
            date: '2023-12-15',
            status: 'Delivered',
            total: 239.99,
            items: [
                { id: 1, name: 'Classic Hijab Set', price: 189.99, quantity: 1 },
                { id: 2, name: 'Modest Cardigan', price: 50.00, quantity: 1 }
            ]
        },
        {
            id: 'ORD-002',
            date: '2023-11-20',
            status: 'Processing',
            total: 119.99,
            items: [
                { id: 3, name: 'Summer Collection Set', price: 119.99, quantity: 1 }
            ]
        },
        {
            id: 'ORD-003',
            date: '2023-11-20',
            status: 'Processing',
            total: 159.99,
            items: [
                { id: 4, name: 'Summer Collection Set', price: 119.99, quantity: 1 },
                { id: 5, name: 'Modest Cardigan', price: 190.99, quantity: 2 }
            ]
        }
    ];

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen w-full !mt-26 flex justify-center bg-[#121212] text-white">
            <div className="w-full !mx-30">
                <div className="w-full flex flex-col gap-8">
                    <div className="flex flex-row items-center text-center gap-2">
                                <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
                                    <User size={20} className="text-neutral-300" />
                                </div>
                                <h2 className="text-2xl font-normal"> {currentUser.name || 'User'} </h2>
                            </div>
                    {/* top bar */}
                    <div className="w-full border border-neutral-800 rounded-lg bg-neutral-900">
                        <div className="flex flex-row justify-center gap-6">
                            <nav className="flex flex-row gap-2 cursor-pointer">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`flex items-center gap-3 !py-4 cursor-pointer !px-4 text-left text-sm ${activeTab === 'profile' ? 'border-b border-neutral-400 duration-200 ease-out text-white' : 'border-b border-transparent text-neutral-400 duration-200 ease-out hover:text-neutral-200'}`}
                                >
                                    <User size={16} />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`flex items-center gap-3 !py-4 cursor-pointer !px-4 text-left text-sm ${activeTab === 'orders' ? 'border-b border-neutral-400 duration-200 ease-out text-white' : 'border-b border-transparent text-neutral-400 duration-200 ease-out hover:text-neutral-200'}`}
                                >
                                    <ShoppingBag size={16} />
                                    <span>Orders</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('wishlist')}
                                    className={`flex items-center gap-3 !py-4 cursor-pointer !px-4 text-left text-sm ${activeTab === 'wishlist' ? 'border-b border-neutral-400 duration-200 ease-out text-white' : 'border-b border-transparent text-neutral-400 duration-200 ease-out hover:text-neutral-200'}`}
                                >
                                    <Heart size={16} />
                                    <span>Wishlist</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('payment')}
                                    className={`flex items-center gap-3 !py-4 cursor-pointer !px-4 text-left text-sm ${activeTab === 'payment' ? 'border-b border-neutral-400 duration-200 ease-out text-white' : 'border-b border-transparent text-neutral-400 duration-200 ease-out hover:text-neutral-200'}`}
                                >
                                    <CreditCard size={16} />
                                    <span>Payment Methods</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('addresses')}
                                    className={`flex items-center gap-3 !py-4 cursor-pointer !px-4 text-left text-sm ${activeTab === 'addresses' ? 'border-b border-neutral-400 duration-200 ease-out text-white' : 'border-b border-transparent text-neutral-400 duration-200 ease-out hover:text-neutral-200'}`}
                                >
                                    <MapPin size={16} />
                                    <span>Addresses</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`flex items-center gap-3 !py-4 cursor-pointer !px-4 text-left text-sm ${activeTab === 'settings' ? 'border-b border-neutral-400 duration-200 ease-out text-white' : 'border-b border-transparent text-neutral-400 duration-200 ease-out hover:text-neutral-200'}`}
                                >
                                    <Settings size={16} />
                                    <span>Account Settings</span>
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 !py-4 !px-4 text-left text-sm text-red-500 hover:text-red-400"
                                >
                                    <LogOut size={16} />
                                    <span>Log-out</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 rounded-lg border border-neutral-700 !p-6 !mb-10">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className='!px-20 !py-5 flex flex-col justify-center gap-6'>
                                <div className="flex justify-between items-center !mb-6">
                                    <h2 className="text-xl font-light text-white">Personal Information</h2>
                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center rounded-sm gap-2 !py-2 !px-3 bg-white border border-neutral-700 text-black text-xs hover:bg-neutral-200 cursor-pointer"
                                        >
                                            <Edit3 size={14} />
                                            <span>Edit Profile</span>
                                        </button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-neutral-400">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="h-10 bg-neutral-800 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3 !py-2"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-neutral-400">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="h-10 bg-neutral-800 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3 !py-2"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-neutral-400">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="h-10 bg-neutral-800 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3 !py-2"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-neutral-400">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="h-10 bg-neutral-800 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3 !py-2"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-neutral-400">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="h-10 bg-neutral-800 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3 !py-2"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-neutral-400">State/Province</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="h-10 bg-neutral-800 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3 !py-2"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-neutral-400">ZIP/Postal Code</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="h-10 bg-neutral-800 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3 !py-2"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-neutral-400">Country</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="h-10 bg-neutral-800 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3 !py-2"
                                            />
                                        </div>
                                        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="!py-2 !px-4 rounded-sm border border-neutral-700 text-neutral-300 text-sm hover:bg-neutral-800 cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="!py-2 !px-4 rounded-sm bg-neutral-300 hover:bg-white text-black text-sm cursor-pointer"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-1 !px-4 !py-1 border-b border-neutral-800">
                                            <label className="text-xs text-neutral-400">Full Name</label>
                                            <p className="font-light">{formData.name || 'Not provided'}</p>
                                        </div>
                                        <div className="flex flex-col gap-1 !px-4 !py-1 border-b border-neutral-800">
                                            <label className="text-xs text-neutral-400">Email Address</label>
                                            <p className="font-light">{formData.email}</p>
                                        </div>
                                        <div className="flex flex-col gap-1 !px-4 !py-1 border-b border-neutral-800">
                                            <label className="text-xs text-neutral-400">Phone Number</label>
                                            <p className="font-light">{formData.phone || 'Not provided'}</p>
                                        </div>
                                        <div className="flex flex-col gap-1 !px-4 !py-1 border-b border-neutral-800">
                                            <label className="text-xs text-neutral-400">Address</label>
                                            <p className="font-light">{formData.address || 'Not provided'}</p>
                                        </div>
                                        <div className="flex flex-col gap-1 !px-4 !py-1 border-b border-neutral-800">
                                            <label className="text-xs text-neutral-400">City</label>
                                            <p className="font-light">{formData.city || 'Not provided'}</p>
                                        </div>
                                        <div className="flex flex-col gap-1 !px-4 !py-1 border-b border-neutral-800">
                                            <label className="text-xs text-neutral-400">State/Province</label>
                                            <p className="font-light">{formData.state || 'Not provided'}</p>
                                        </div>
                                        <div className="flex flex-col gap-1 !px-4 !py-1 border-b border-neutral-800">
                                            <label className="text-xs text-neutral-400">ZIP/Postal Code</label>
                                            <p className="font-light">{formData.zipCode || 'Not provided'}</p>
                                        </div>
                                        <div className="flex flex-col gap-1 !px-4 !py-1 border-b border-neutral-800">
                                            <label className="text-xs text-neutral-400">Country</label>
                                            <p className="font-light">{formData.country || 'Not provided'}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className='!px-20 !py-5 flex flex-col justify-center gap-6'>
                                <h2 className="text-xl font-light">Order History</h2>

                                {mockOrders.length > 0 ? (
                                    <div className="flex flex-col gap-6">
                                        {mockOrders.map(order => (
                                            <div key={order.id} className="bg-white/2 rounded-md border border-neutral-800 !p-4">
                                                <div className="flex justify-between items-start !mb-4">
                                                    <div>
                                                        <h3 className="text-sm font-medium">Order <span className="text-neutral-300 font-light">#{order.id}</span></h3>
                                                        <p className="text-xs text-neutral-400">Placed on {order.date}</p>
                                                    </div>
                                                    <div className="text-xs rounded-full bg-neutral-800 !px-3 !py-1">
                                                        {order.status}
                                                    </div>
                                                </div>

                                                <div className="border-t border-neutral-800 !my-3 !pt-3">
                                                    {order.items.map(item => (
                                                        <div key={item.id} className="flex justify-between text-sm !py-2">
                                                            <div className="flex items-center gap-2">
                                                                <span>{item.name}</span>
                                                                <span className="text-neutral-400">x {item.quantity}</span>
                                                            </div>
                                                            <span>MAD {item.price.toFixed(2)}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-between border-t border-neutral-800 !pt-3 !mt-3">
                                                    <span className="font-medium">Total</span>
                                                    <span className="font-medium">MAD {order.total.toFixed(2)}</span>
                                                </div>

                                                <div className="!mt-4 w-full flex justify-center">
                                                    <button className="text-xs cursor-pointer bg-white hover:bg-neutral-200 text-black border border-neutral-700 !py-2 w-full">
                                                        View Order Details
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center !py-8 text-neutral-400">
                                        <ShoppingBag size={32} className="!mx-auto !mb-4 opacity-50" />
                                        <p>You haven't placed any orders yet.</p>
                                        <button
                                            onClick={() => navigate('/shop')}
                                            className="!mt-4 !py-2 !px-4 bg-neutral-300 hover:bg-white text-black text-sm"
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Wishlist Tab */}
                        {activeTab === 'wishlist' && (
                            <div className='!px-20 !py-5 flex flex-col justify-center gap-6'>
                                <h2 className="text-xl font-light">Your Wishlist</h2>
                                <div className="text-center !py-2 text-neutral-400">
                                    <Heart size={32} className="!mx-auto !mb-4 opacity-50" />
                                    <p>Your wishlist is empty</p>
                                    <button
                                        onClick={() => navigate('/shop')}
                                        className="!mt-4 rounded-sm cursor-pointer !py-2 !px-4 bg-neutral-300 hover:bg-white text-black text-sm"
                                    >
                                        Browse Products
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Payment Methods Tab */}
                        {activeTab === 'payment' && (
                            <div className='!px-20 !py-5 flex flex-col justify-center gap-6'>
                                <h2 className="text-xl font-light">Payment Methods</h2>
                                <div className="text-center !py-2 text-neutral-400">
                                    <CreditCard size={32} className="!mx-auto !mb-4 opacity-50" />
                                    <p>You haven't saved any payment methods yet.</p>
                                    <button className="!mt-4 rounded-sm cursor-pointer !py-2 !px-4 bg-neutral-300 hover:bg-white text-black text-sm">
                                        Add Payment Method
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Addresses Tab */}
                        {activeTab === 'addresses' && (
                            <div className='!px-20 !py-5 flex flex-col justify-center gap-6'>
                                <h2 className="text-xl font-light">Saved Addresses</h2>
                                <div className="text-center !py-2 text-neutral-400">
                                    <MapPin size={32} className="!mx-auto !mb-4 opacity-50" />
                                    <p>You haven't saved any addresses yet.</p>
                                    <button className="!mt-4 rounded-sm cursor-pointer !py-2 !px-4 bg-neutral-300 hover:bg-white text-black text-sm">
                                        Add New Address
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <div className='!px-20 !py-5 flex flex-col justify-center gap-6'>
                                <h2 className="text-xl font-light">Account Settings</h2>

                                <div className="flex flex-col gap-6">
                                    <div className="border border-neutral-800 bg-neutral-900 rounded-lg !p-4">
                                        <h3 className="text-sm font-medium !mb-4">Password</h3>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm">Change your password</p>
                                                <p className="text-xs text-neutral-400 !mt-1">Last updated: Never</p>
                                            </div>
                                            <button className="text-xs cursor-pointer border rounded-sm border-neutral-700 !py-2 !px-3 hover:bg-neutral-800">
                                                Change Password
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border border-neutral-800 bg-neutral-900 rounded-lg !p-4">
                                        <h3 className="text-sm font-medium !mb-4">Notifications</h3>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm">Email notifications</p>
                                                <p className="text-xs text-neutral-400 !mt-1">Receive updates about your orders and account</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="border border-red-800/60 rounded-lg !p-4">
                                        <h3 className="text-sm font-medium !mb-2 text-red-500">Danger Zone</h3>
                                        <p className="text-xs text-neutral-400 !mb-4">These actions are irreversible</p>

                                        <button className="text-xs border rounded-sm cursor-pointer border-red-800 text-red-500 !py-2 !px-3 hover:bg-red-900/20">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 