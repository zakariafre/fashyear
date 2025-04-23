import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Filter,
    Eye,
    XCircle,
    CheckCircle2,
    Truck,
    AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const AdminOrders = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [statusFilter, setStatusFilter] = useState('all');
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Mock order data
    useEffect(() => {
        // In a real app, this would be an API call
        const mockOrders = [
            {
                id: 'ORD-001', customer: 'Sarah Ahmed', email: 'sarah@example.com', date: '2023-12-28', total: 189.99, status: 'Delivered', paymentStatus: 'Paid', items: [
                    { id: 1, name: 'Classic Hijab Set', price: 189.99, quantity: 1 }
                ]
            },
            {
                id: 'ORD-002', customer: 'Mohammed Ali', email: 'mohammed@example.com', date: '2023-12-27', total: 245.50, status: 'Processing', paymentStatus: 'Paid', items: [
                    { id: 2, name: 'Summer Collection Set', price: 119.99, quantity: 1 },
                    { id: 3, name: 'Modest Cardigan', price: 65.50, quantity: 2 }
                ]
            },
            {
                id: 'ORD-003', customer: 'Fatima Zahra', email: 'fatima@example.com', date: '2023-12-27', total: 119.99, status: 'Processing', paymentStatus: 'Paid', items: [
                    { id: 4, name: 'Summer Collection Set', price: 119.99, quantity: 1 }
                ]
            },
            {
                id: 'ORD-004', customer: 'Nour El Houda', email: 'nour@example.com', date: '2023-12-26', total: 359.98, status: 'Shipped', paymentStatus: 'Paid', items: [
                    { id: 5, name: 'Elegant Abaya', price: 179.99, quantity: 2 }
                ]
            },
            {
                id: 'ORD-005', customer: 'Yasmine Khan', email: 'yasmine@example.com', date: '2023-12-25', total: 78.50, status: 'Delivered', paymentStatus: 'Paid', items: [
                    { id: 6, name: 'Modest Scarf', price: 39.25, quantity: 2 }
                ]
            },
            {
                id: 'ORD-006', customer: 'Amir Hassan', email: 'amir@example.com', date: '2023-12-24', total: 225.95, status: 'Cancelled', paymentStatus: 'Refunded', items: [
                    { id: 7, name: 'Premium Prayer Set', price: 225.95, quantity: 1 }
                ]
            },
            {
                id: 'ORD-007', customer: 'Leila Mahmoud', email: 'leila@example.com', date: '2023-12-23', total: 159.90, status: 'Delivered', paymentStatus: 'Paid', items: [
                    { id: 8, name: 'Casual Hijab Set', price: 79.95, quantity: 2 }
                ]
            },
            {
                id: 'ORD-008', customer: 'Karim Yousef', email: 'karim@example.com', date: '2023-12-22', total: 320.75, status: 'Delivered', paymentStatus: 'Paid', items: [
                    { id: 9, name: 'Winter Collection Set', price: 189.99, quantity: 1 },
                    { id: 10, name: 'Warm Scarf', price: 45.99, quantity: 1 },
                    { id: 11, name: 'Gloves', price: 84.77, quantity: 1 }
                ]
            },
            {
                id: 'ORD-009', customer: 'Samira Idris', email: 'samira@example.com', date: '2023-12-21', total: 149.99, status: 'Pending', paymentStatus: 'Awaiting Payment', items: [
                    { id: 12, name: 'Everyday Abaya', price: 149.99, quantity: 1 }
                ]
            },
            {
                id: 'ORD-010', customer: 'Hassan Ahmed', email: 'hassan@example.com', date: '2023-12-20', total: 279.98, status: 'Shipped', paymentStatus: 'Paid', items: [
                    { id: 13, name: 'Luxury Prayer Set', price: 279.98, quantity: 1 }
                ]
            },
            {
                id: 'ORD-011', customer: 'Zainab Farouk', email: 'zainab@example.com', date: '2023-12-19', total: 345.90, status: 'Delivered', paymentStatus: 'Paid', items: [
                    { id: 14, name: 'Premium Collection Bundle', price: 345.90, quantity: 1 }
                ]
            },
            {
                id: 'ORD-012', customer: 'Omar Kareem', email: 'omar@example.com', date: '2023-12-18', total: 99.99, status: 'Processing', paymentStatus: 'Paid', items: [
                    { id: 15, name: 'Everyday Hijab Set', price: 99.99, quantity: 1 }
                ]
            }
        ];

        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
    }, []);

    // Apply filters
    useEffect(() => {
        let result = orders;

        // Apply search filter
        if (searchTerm) {
            result = result.filter(order =>
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            result = result.filter(order => order.status === statusFilter);
        }

        setFilteredOrders(result);
        setCurrentPage(1);
    }, [searchTerm, statusFilter, orders]);

    // Calculate pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    // Get status options for filter
    const statusOptions = ['all', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        // In a real app, you would call an API to update the order status
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        }));

        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };

    // Function to render status badge with appropriate colors
    const renderStatusBadge = (status) => {
        let bgColor, textColor;

        switch (status) {
            case 'Delivered':
                bgColor = 'bg-green-500/10';
                textColor = 'text-green-500';
                break;
            case 'Processing':
                bgColor = 'bg-amber-500/10';
                textColor = 'text-amber-500';
                break;
            case 'Shipped':
                bgColor = 'bg-blue-500/10';
                textColor = 'text-blue-500';
                break;
            case 'Pending':
                bgColor = 'bg-purple-500/10';
                textColor = 'text-purple-500';
                break;
            case 'Cancelled':
                bgColor = 'bg-red-500/10';
                textColor = 'text-red-500';
                break;
            default:
                bgColor = 'bg-neutral-500/10';
                textColor = 'text-neutral-500';
        }

        return <span className={`!px-2 !py-1 rounded-full text-xs ${bgColor} ${textColor}`}>{status}</span>;
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white flex">
            {/* Admin Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="!ml-64 flex-1 !p-8">
                {/* Header */}
                <div className="flex justify-between items-center !mb-8">
                    <h1 className="text-2xl font-light">Orders</h1>
                    <div className="flex items-center !space-x-4">
                        <Link to="/" className="text-sm bg-white border border-neutral-800 text-black !px-5 !py-2 flex items-center cursor-pointer gap-2">
                            View Store
                        </Link>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row justify-between gap-4 !mb-6">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search by order ID, customer name or email..."
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !pl-10 !pr-4 focus:outline-none focus:border-blue-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <select
                                className="bg-neutral-800 border border-neutral-700 rounded-md !py-2 !pl-10 !pr-4 focus:outline-none appearance-none cursor-pointer"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                {statusOptions.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status === 'all' ? 'All Statuses' : status}
                                    </option>
                                ))}
                            </select>
                            <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden !mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-800/50">
                                <tr>
                                    <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Order ID</th>
                                    <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Customer</th>
                                    <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Date</th>
                                    <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Status</th>
                                    <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Total</th>
                                    <th className="!py-3 !px-4 text-right text-xs font-medium text-neutral-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {currentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-neutral-800/30">
                                        <td className="!py-3 !px-4 font-medium">{order.id}</td>
                                        <td className="!py-3 !px-4">
                                            <div>
                                                <div className="text-sm">{order.customer}</div>
                                                <div className="text-xs text-neutral-400">{order.email}</div>
                                            </div>
                                        </td>
                                        <td className="!py-3 !px-4 text-sm">{order.date}</td>
                                        <td className="!py-3 !px-4">
                                            {renderStatusBadge(order.status)}
                                        </td>
                                        <td className="!py-3 !px-4 text-sm">MAD {order.total.toFixed(2)}</td>
                                        <td className="!py-3 !px-4 text-right">
                                            <button
                                                onClick={() => handleViewDetails(order)}
                                                className="text-blue-400 hover:text-blue-300 cursor-pointer !px-2 !py-1"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center">
                    <div className="text-sm text-neutral-400">
                        Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
                    </div>
                    <div className="flex !space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`!p-2 rounded ${currentPage === 1 ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-300 hover:bg-neutral-800'}`}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {[...Array(totalPages).keys()].map(number => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number + 1)}
                                className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === number + 1
                                        ? 'bg-white text-black'
                                        : 'text-neutral-300 hover:bg-neutral-800'
                                    }`}
                            >
                                {number + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`!p-2 rounded ${currentPage === totalPages ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-300 hover:bg-neutral-800'}`}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            {isDetailsModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto !p-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-4xl mx-auto">
                        <div className="!p-6">
                            <div className="flex justify-between items-center !mb-6">
                                <h2 className="text-xl font-medium">Order Details</h2>
                                <button
                                    onClick={() => setIsDetailsModalOpen(false)}
                                    className="text-neutral-400 hover:text-white"
                                >
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 !mb-8">
                                <div>
                                    <h3 className="text-sm font-medium uppercase text-neutral-400 !mb-2">Order Information</h3>
                                    <div className="bg-neutral-800/30 !p-4 rounded-lg">
                                        <div className="flex justify-between !mb-2">
                                            <span className="text-neutral-400">Order ID:</span>
                                            <span>{selectedOrder.id}</span>
                                        </div>
                                        <div className="flex justify-between !mb-2">
                                            <span className="text-neutral-400">Date:</span>
                                            <span>{selectedOrder.date}</span>
                                        </div>
                                        <div className="flex justify-between !mb-2">
                                            <span className="text-neutral-400">Status:</span>
                                            <span>{renderStatusBadge(selectedOrder.status)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-400">Payment:</span>
                                            <span>{selectedOrder.paymentStatus}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium uppercase text-neutral-400 !mb-2">Customer Information</h3>
                                    <div className="bg-neutral-800/30 !p-4 rounded-lg">
                                        <div className="!mb-2">
                                            <div className="font-medium">{selectedOrder.customer}</div>
                                            <div className="text-neutral-400 text-sm">{selectedOrder.email}</div>
                                        </div>
                                        <div className="text-sm">
                                            <div className="text-neutral-400">Address would go here in a real application</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-sm font-medium uppercase text-neutral-400 !mb-2">Order Items</h3>
                            <div className="bg-neutral-800/30 rounded-lg overflow-hidden !mb-8">
                                <table className="w-full">
                                    <thead className="bg-neutral-800/80">
                                        <tr>
                                            <th className="!py-2 !px-4 text-left text-xs font-medium text-neutral-300">Product</th>
                                            <th className="!py-2 !px-4 text-center text-xs font-medium text-neutral-300">Quantity</th>
                                            <th className="!py-2 !px-4 text-right text-xs font-medium text-neutral-300">Price</th>
                                            <th className="!py-2 !px-4 text-right text-xs font-medium text-neutral-300">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-800">
                                        {selectedOrder.items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="!py-3 !px-4">{item.name}</td>
                                                <td className="!py-3 !px-4 text-center">{item.quantity}</td>
                                                <td className="!py-3 !px-4 text-right">MAD {item.price.toFixed(2)}</td>
                                                <td className="!py-3 !px-4 text-right">MAD {(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-neutral-800/50">
                                        <tr>
                                            <td colSpan="3" className="!py-3 !px-4 text-right font-medium">Total:</td>
                                            <td className="!py-3 !px-4 text-right font-medium">MAD {selectedOrder.total.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div>
                                    <h3 className="text-sm font-medium !mb-2">Update Order Status</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdateStatus(selectedOrder.id, 'Processing')}
                                            className="text-xs bg-neutral-800 hover:bg-neutral-700 !px-3 !py-2 rounded flex items-center"
                                        >
                                            <AlertCircle size={14} className="!mr-1 text-amber-500" />
                                            Processing
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(selectedOrder.id, 'Shipped')}
                                            className="text-xs bg-neutral-800 hover:bg-neutral-700 !px-3 !py-2 rounded flex items-center"
                                        >
                                            <Truck size={14} className="!mr-1 text-blue-500" />
                                            Shipped
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(selectedOrder.id, 'Delivered')}
                                            className="text-xs bg-neutral-800 hover:bg-neutral-700 !px-3 !py-2 rounded flex items-center"
                                        >
                                            <CheckCircle2 size={14} className="!mr-1 text-green-500" />
                                            Delivered
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(selectedOrder.id, 'Cancelled')}
                                            className="text-xs bg-neutral-800 hover:bg-neutral-700 !px-3 !py-2 rounded flex items-center"
                                        >
                                            <XCircle size={14} className="!mr-1 text-red-500" />
                                            Cancelled
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsDetailsModalOpen(false)}
                                    className="!px-4 !py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;