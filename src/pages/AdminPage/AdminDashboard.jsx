import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    TrendingUp,
    DollarSign,
    ShoppingCart,
    ShoppingBag,
    Users,
    Bell
} from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard = () => {
    const { currentUser, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(3);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Mock data for dashboard
    const dashboardData = {
        totalSales: 25890,
        totalOrders: 124,
        totalCustomers: 87,
        pendingOrders: 18,
        revenue: {
            today: 1290,
            yesterday: 980,
            growth: 31.6
        },
        recentOrders: [
            { id: 'ORD-001', customer: 'Sarah Ahmed', date: '2023-12-28', total: 189.99, status: 'Delivered' },
            { id: 'ORD-002', customer: 'Mohammed Ali', date: '2023-12-27', total: 245.50, status: 'Processing' },
            { id: 'ORD-003', customer: 'Fatima Zahra', date: '2023-12-27', total: 119.99, status: 'Processing' },
            { id: 'ORD-004', customer: 'Nour El Houda', date: '2023-12-26', total: 359.98, status: 'Shipped' },
            { id: 'ORD-005', customer: 'Yasmine Khan', date: '2023-12-25', total: 78.50, status: 'Delivered' }
        ],
        topProducts: [
            { id: 1, name: 'Classic Hijab Set', sold: 28, revenue: 5319.72 },
            { id: 2, name: 'Summer Collection Set', sold: 23, revenue: 2759.77 },
            { id: 3, name: 'Modest Cardigan', sold: 19, revenue: 1235.50 },
            { id: 4, name: 'Elegant Abaya', sold: 17, revenue: 3059.83 }
        ]
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white flex">
            {/* Admin Sidebar */}
            <AdminSidebar />
            
            {/* Main Content */}
            <div className="!ml-64 flex-1 !p-8">
                {/* Header */}
                <div className="flex justify-between items-center !mb-8">
                    <h1 className="text-2xl uppercase tracking-wide font-medium">Dashboard</h1>
                    <div className="flex items-center !space-x-4">
                        <Link to="/" className="text-sm bg-white border border-neutral-800 text-black !px-5 !py-2 flex items-center cursor-pointer gap-2">View Store</Link>
                        <div className="relative">
                            <Bell size={20} className="text-neutral-400 hover:text-white cursor-pointer" />
                            {notifications > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[0.7rem] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                                    {notifications}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 !mb-8">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg !p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-neutral-400">Total Sales</p>
                                <p className="text-2xl font-semibold !mt-1">MAD {dashboardData.totalSales.toLocaleString()}</p>
                            </div>
                            <div className="bg-green-500/10 !p-3 rounded-md">
                                <DollarSign size={20} className="text-green-500" />
                            </div>
                        </div>
                        <div className="!mt-4 flex items-center text-xs">
                            <span className="text-green-500 flex items-center">
                                <TrendingUp size={14} className="!mr-1" /> +12.5%
                            </span>
                            <span className="text-neutral-400 !ml-2">from last month</span>
                        </div>
                    </div>
                    
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg !p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-neutral-400">Total Orders</p>
                                <p className="text-2xl font-semibold !mt-1">{dashboardData.totalOrders}</p>
                            </div>
                            <div className="bg-blue-500/10 !p-3 rounded-md">
                                <ShoppingCart size={20} className="text-blue-500" />
                            </div>
                        </div>
                        <div className="!mt-4 flex items-center text-xs">
                            <span className="text-green-500 flex items-center">
                                <TrendingUp size={14} className="!mr-1" /> +8.2%
                            </span>
                            <span className="text-neutral-400 ml-2">from last month</span>
                        </div>
                    </div>
                    
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg !p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-neutral-400">Total Customers</p>
                                <p className="text-2xl font-semibold !mt-1">{dashboardData.totalCustomers}</p>
                            </div>
                            <div className="bg-purple-500/10 !p-3 rounded-md">
                                <Users size={20} className="text-purple-500" />
                            </div>
                        </div>
                        <div className="!mt-4 flex items-center text-xs">
                            <span className="text-green-500 flex items-center">
                                <TrendingUp size={14} className="!mr-1" /> +5.8%
                            </span>
                            <span className="text-neutral-400 !ml-2">from last month</span>
                        </div>
                    </div>
                    
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg !p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-neutral-400">Pending Orders</p>
                                <p className="text-2xl font-semibold mt-1">{dashboardData.pendingOrders}</p>
                            </div>
                            <div className="bg-amber-500/10 !p-3 rounded-md">
                                <ShoppingBag size={20} className="text-amber-500" />
                            </div>
                        </div>
                        <div className="!mt-4 flex items-center text-xs">
                            <span className="text-red-500 flex items-center">
                                <TrendingUp size={14} className="!mr-1 rotate-180" /> -2.3%
                            </span>
                            <span className="text-neutral-400 !ml-2">from last month</span>
                        </div>
                    </div>
                </div>
                
                {/* Revenue Chart */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg !p-6 !mb-8">
                    <div className="flex justify-between items-center !mb-6">
                        <h2 className="text-lg font-medium">Revenue Overview</h2>
                        <select className="bg-neutral-800 border border-neutral-700 text-sm rounded-md !px-3 !py-1.5 focus:outline-none">
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>
                    <div className="flex items-end h-64 border-b border-neutral-800 !mb-4">
                        {/* Mock chart bars - In a real app you would use a charting library */}
                        <div className="flex-1 flex items-end justify-center">
                            <div className="w-10 bg-neutral-800 rounded-t" style={{ height: '40%' }}></div>
                        </div>
                        <div className="flex-1 flex items-end justify-center">
                            <div className="w-10 bg-neutral-800 rounded-t" style={{ height: '60%' }}></div>
                        </div>
                        <div className="flex-1 flex items-end justify-center">
                            <div className="w-10 bg-neutral-800 rounded-t" style={{ height: '45%' }}></div>
                        </div>
                        <div className="flex-1 flex items-end justify-center">
                            <div className="w-10 bg-neutral-800 rounded-t" style={{ height: '80%' }}></div>
                        </div>
                        <div className="flex-1 flex items-end justify-center">
                            <div className="w-10 bg-neutral-800 rounded-t" style={{ height: '65%' }}></div>
                        </div>
                        <div className="flex-1 flex items-end justify-center">
                            <div className="w-10 bg-blue-500/80 rounded-t" style={{ height: '75%' }}></div>
                        </div>
                        <div className="flex-1 flex items-end justify-center">
                            <div className="w-10 bg-blue-500 rounded-t" style={{ height: '90%' }}></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-neutral-400 text-xs">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </div>
                
                {/* Recent Orders and Top Products */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg !p-6">
                        <div className="flex justify-between items-center !mb-6">
                            <h2 className="text-lg font-medium">Recent Orders</h2>
                            <Link to="/admin/orders" className="text-xs text-blue-400 hover:underline">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-neutral-400 text-xs border-b border-neutral-800">
                                        <th className="text-left !py-3">Order ID</th>
                                        <th className="text-left !py-3">Customer</th>
                                        <th className="text-left !py-3">Status</th>
                                        <th className="text-right !py-3">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboardData.recentOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-neutral-800/50 text-sm">
                                            <td className="!py-3">{order.id}</td>
                                            <td className="!py-3">{order.customer}</td>
                                            <td className="!py-3">
                                                <span className={`!px-2 !py-1 rounded-full text-xs ${
                                                    order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                                                    order.status === 'Processing' ? 'bg-amber-500/10 text-amber-500' :
                                                    'bg-blue-500/10 text-blue-500'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="!py-3 text-right">MAD {order.total.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* Top Products */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg !p-6">
                        <div className="flex justify-between items-center !mb-6">
                            <h2 className="text-lg font-medium">Top Products</h2>
                            <Link to="/admin/products" className="text-xs text-blue-400 hover:underline">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-neutral-400 text-xs border-b border-neutral-800">
                                        <th className="text-left !py-3">Product</th>
                                        <th className="text-center !py-3">Sold</th>
                                        <th className="text-right !py-3">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboardData.topProducts.map((product) => (
                                        <tr key={product.id} className="border-b border-neutral-800/50 text-sm">
                                            <td className="!py-3">{product.name}</td>
                                            <td className="!py-3 text-center">{product.sold}</td>
                                            <td className="!py-3 text-right">MAD {product.revenue.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 