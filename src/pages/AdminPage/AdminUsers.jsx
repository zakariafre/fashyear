import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Filter,
    Mail,
    User as UserIcon,
    UserPlus,
    MoreHorizontal,
    XCircle,
    UserX,
    Shield,
    ShieldOff,
    Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNav from '../../components/AdminNav';



const AdminUsers = () => {
    const { currentUser } = useAuth();

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [roleFilter, setRoleFilter] = useState('all');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);

    // Mock user data
    useEffect(() => {
        // In a real app, this would be an API call
        const mockUsers = [
            { id: 1, name: 'Sarah Ahmed', email: 'sarah@example.com', role: 'User', status: 'Active', orders: 3, totalSpent: 189.99, joinDate: '2023-01-15' },
            { id: 2, name: 'Mohammed Ali', email: 'mohammed@example.com', role: 'User', status: 'Active', orders: 5, totalSpent: 345.50, joinDate: '2023-02-20' },
            { id: 3, name: 'Fatima Zahra', email: 'fatima@example.com', role: 'User', status: 'Active', orders: 2, totalSpent: 119.99, joinDate: '2023-03-10' },
            { id: 4, name: 'Nour El Houda', email: 'nour@example.com', role: 'User', status: 'Active', orders: 4, totalSpent: 459.98, joinDate: '2023-04-05' },
            { id: 5, name: 'Yasmine Khan', email: 'yasmine@example.com', role: 'User', status: 'Active', orders: 1, totalSpent: 78.50, joinDate: '2023-05-12' },
            { id: 6, name: 'Amir Hassan', email: 'amir@example.com', role: 'User', status: 'Inactive', orders: 1, totalSpent: 225.95, joinDate: '2023-06-18' },
            { id: 7, name: 'Leila Mahmoud', email: 'leila@example.com', role: 'User', status: 'Active', orders: 3, totalSpent: 259.90, joinDate: '2023-07-22' },
            { id: 8, name: 'Karim Yousef', email: 'karim@example.com', role: 'User', status: 'Active', orders: 6, totalSpent: 520.75, joinDate: '2023-08-14' },
            { id: 9, name: 'Samira Idris', email: 'samira@example.com', role: 'User', status: 'Active', orders: 2, totalSpent: 199.99, joinDate: '2023-09-25' },
            { id: 10, name: 'Hassan Ahmed', email: 'hassan@example.com', role: 'User', status: 'Active', orders: 4, totalSpent: 379.98, joinDate: '2023-10-30' },
            { id: 11, name: 'Zainab Farouk', email: 'zainab@example.com', role: 'User', status: 'Active', orders: 8, totalSpent: 645.90, joinDate: '2023-11-05' },
            { id: 12, name: 'Omar Kareem', email: 'omar@example.com', role: 'User', status: 'Active', orders: 1, totalSpent: 99.99, joinDate: '2023-12-15' },
            { id: 13, name: 'Admin User', email: 'admin@fashyear.com', role: 'Admin', status: 'Active', orders: 0, totalSpent: 0, joinDate: '2023-01-01' }
        ];

        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
    }, []);

    // Apply filters
    useEffect(() => {
        let result = users;

        // Apply search filter
        if (searchTerm) {
            result = result.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply role filter
        if (roleFilter !== 'all') {
            result = result.filter(user => user.role === roleFilter);
        }

        setFilteredUsers(result);
        setCurrentPage(1);
    }, [searchTerm, roleFilter, users]);

    // Calculate pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Get role options for filter
    const roleOptions = ['all', 'Admin', 'User'];

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
        setIsDropdownOpen(null);
    };

    const handleDeleteConfirm = () => {
        // In a real app, you would call an API to delete the user
        setUsers(users.filter(u => u.id !== selectedUser.id));
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const handleToggleRole = (userId) => {
        // In a real app, you would call an API to update the user role
        setUsers(users.map(user => {
            if (user.id === userId) {
                return { ...user, role: user.role === 'Admin' ? 'User' : 'Admin' };
            }
            return user;
        }));
        setIsDropdownOpen(null);
    };

    const handleToggleDropdown = (userId) => {
        setIsDropdownOpen(isDropdownOpen === userId ? null : userId);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setIsDropdownOpen(null);
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <AdminNav />
            <div className="min-h-screen bg-[#121212] text-white !mt-7 flex">
                {/* Admin Sidebar */}
                <AdminSidebar />

                {/* Main Content */}
                <div className="!ml-72 flex-1 !px-10 !py-2">
                    {/* Header */}
                    <div className="flex justify-between items-center !mb-8">
                        <h1 className="text-2xl font-light">Customers</h1>
                        <div className="flex items-center !space-x-2">
                            <Link to="/" className="text-sm rounded-lg flex-row bg-white border border-neutral-800 text-black !px-5 !py-2 flex items-center cursor-pointer gap-2">
                                <Home size={18} />
                                <span className="text-sm">View Store</span>
                            </Link>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 !mb-6">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search by name or email..."
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
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                >
                                    {roleOptions.map((role, index) => (
                                        <option key={index} value={role}>
                                            {role === 'all' ? 'All Roles' : role}
                                        </option>
                                    ))}
                                </select>
                                <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                            </div>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden !mb-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-neutral-800/50">
                                    <tr>
                                        <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Customer</th>
                                        <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Email</th>
                                        <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Role</th>
                                        <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Joined</th>
                                        <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Orders</th>
                                        <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Total Spent</th>
                                        <th className="!py-3 !px-4 text-right text-xs font-medium text-neutral-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-800">
                                    {currentUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-neutral-800/30">
                                            <td className="!py-3 !px-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8 bg-neutral-800 rounded-full flex items-center justify-center">
                                                        <UserIcon size={16} className="text-neutral-400" />
                                                    </div>
                                                    <div className="!ml-3">
                                                        <div className="text-sm font-medium">{user.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="!py-3 !px-4 text-sm">{user.email}</td>
                                            <td className="!py-3 !px-4">
                                                <span className={`!px-2 !py-1 text-xs rounded-full ${user.role === 'Admin'
                                                        ? 'bg-purple-500/10 text-purple-500'
                                                        : 'bg-blue-500/10 text-blue-500'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="!py-3 !px-4 text-sm">{user.joinDate}</td>
                                            <td className="!py-3 !px-4 text-sm">{user.orders}</td>
                                            <td className="!py-3 !px-4 text-sm">
                                                {user.totalSpent > 0 ? `MAD ${user.totalSpent.toFixed(2)}` : '-'}
                                            </td>
                                            <td className="!py-3 !px-4 text-right relative">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleDropdown(user.id);
                                                    }}
                                                    className="text-neutral-400 hover:text-white !p-1"
                                                >
                                                    <MoreHorizontal size={18} />
                                                </button>

                                                {isDropdownOpen === user.id && (
                                                    <div
                                                        className="absolute right-6 !mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg z-10"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <div className="!py-1">
                                                            <button
                                                                onClick={() => handleToggleRole(user.id)}
                                                                className="w-full text-left !px-4 !py-2 text-sm text-neutral-300 hover:bg-neutral-700 flex items-center"
                                                            >
                                                                {user.role === 'Admin' ? (
                                                                    <>
                                                                        <ShieldOff size={16} className="!mr-2 text-red-400" />
                                                                        Remove Admin
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Shield size={16} className="!mr-2 text-purple-400" />
                                                                        Make Admin
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(user)}
                                                                className="w-full text-left !px-4 !py-2 text-sm text-red-400 hover:bg-neutral-700 flex items-center"
                                                                disabled={user.email === 'admin@fashyear.com'}
                                                            >
                                                                <UserX size={16} className="!mr-2" />
                                                                Delete Account
                                                            </button>
                                                            <button
                                                                className="w-full text-left !px-4 !py-2 text-sm text-neutral-300 hover:bg-neutral-700 flex items-center"
                                                            >
                                                                <Mail size={16} className="!mr-2" />
                                                                Email Customer
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
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
                            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} customers
                        </div>
                        <div className="flex space-x-2">
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
                                className={`p-2 rounded ${currentPage === totalPages ? 'text-neutral-600 cursor-not-allowed' : 'text-neutral-300 hover:bg-neutral-800'}`}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && selectedUser && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-md !p-6 !mx-4">
                            <div className="text-center">
                                <div className="!mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/10 !mb-4">
                                    <UserX size={24} className="text-red-500" />
                                </div>
                                <h3 className="text-lg font-medium text-white !mb-2">Delete Customer Account</h3>
                                <p className="text-neutral-400 !mb-6">
                                    Are you sure you want to delete the account for "{selectedUser.name}"? This action cannot be undone and will remove all customer data.
                                </p>
                                <div className="flex justify-center !space-x-4">
                                    <button
                                        onClick={() => setIsDeleteModalOpen(false)}
                                        className="!px-4 !py-2 border border-neutral-700 rounded-md text-neutral-300 hover:bg-neutral-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteConfirm}
                                        className="!px-4 !py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminUsers; 