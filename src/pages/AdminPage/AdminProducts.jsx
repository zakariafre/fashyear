import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Filter,
    ChevronLeft,
    ChevronRight,
    X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductData from '../../../ProductsDB.json';
import AdminSidebar from '../../components/AdminSidebar';

const AdminProducts = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('all');
    
    // Load product data
    useEffect(() => {
        // In a real app, this would be an API call
        // For this example, we're using the imported JSON data
        setProducts(ProductData);
        setFilteredProducts(ProductData);
    }, []);
    
    // Apply filters
    useEffect(() => {
        let result = products;
        
        // Apply search filter
        if (searchTerm) {
            result = result.filter(product => 
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply category filter
        if (categoryFilter !== 'all') {
            result = result.filter(product => product.category === categoryFilter);
        }
        
        setFilteredProducts(result);
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, products]);
    
    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    // Get unique categories for filter
    const categories = ['all', ...new Set(products.map(product => product.category))];
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const handleAddProduct = () => {
        setIsAddModalOpen(true);
    };
    
    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsAddModalOpen(true);
    };
    
    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };
    
    const handleDeleteConfirm = () => {
        // In a real app, you would call an API to delete the product
        setProducts(products.filter(p => p.id !== selectedProduct.id));
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
    };
    
    return (
        <div className="min-h-screen bg-[#121212] text-white flex">
            {/* Admin Sidebar */}
            <AdminSidebar />
            
            {/* Main Content */}
            <div className="!ml-64 flex-1 !p-8">
                {/* Header */}
                <div className="flex justify-between items-center !mb-8">
                    <h1 className="text-2xl uppercase tracking-wide font-medium">Products</h1>
                    <div className="flex items-center !space-x-4">
                        <Link to="/" className="text-sm hover:bg-neutral-900 border border-neutral-800 text-white !px-5 !py-2 flex items-center cursor-pointer gap-2">View Store</Link>
                        <button 
                            onClick={handleAddProduct}
                            className="bg-white text-sm text-black !px-4 !py-2 flex items-center cursor-pointer gap-2"
                        >
                            Add Product
                            <Plus size={18} />
                        </button>
                    </div>
                </div>
                
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row justify-between gap-4 !mb-6">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search products..."
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
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category === 'all' ? 'All Categories' : category}
                                    </option>
                                ))}
                            </select>
                            <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                        </div>
                    </div>
                </div>
                
                {/* Product Table */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden !mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-800/50">
                                <tr>
                                    <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Product</th>
                                    <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">ID</th>
                                    <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Category</th>
                                    <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Price</th>
                                    <th className="!py-3 !px-4 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Status</th>
                                    <th className="!py-3 !px-4 text-right text-xs font-medium text-neutral-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {currentProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-neutral-800/30">
                                        <td className="!py-3 !px-4">
                                            <div className="flex items-center">
                                                <div className="h-13 w-10 flex-shrink-0 rounded overflow-hidden bg-neutral-800">
                                                    {product.img && product.img.length > 0 && (
                                                        <img 
                                                            src={product.img[0]} 
                                                            alt={product.title} 
                                                            className="h-full w-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="!ml-4">
                                                    <div className="text-sm font-medium">{product.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="!py-3 !px-4 text-sm text-neutral-400">#{product.id}</td>
                                        <td className="!py-3 !px-4 text-sm text-neutral-300 capitalize">{product.category}</td>
                                        <td className="!py-3 !px-4 text-sm text-neutral-300">MAD {product.price}</td>
                                        <td className="!py-3 !px-4">
                                            <span className="!px-2 !py-1 text-xs rounded-full bg-green-500/10 text-green-500">
                                                In Stock
                                            </span>
                                        </td>
                                        <td className="!py-3 !px-4 text-right text-sm font-medium space-x-2">
                                            <button 
                                                onClick={() => handleEditProduct(product)}
                                                className="text-blue-400 hover:text-blue-300 !px-2 !py-1"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(product)}
                                                className="text-red-400 hover:text-red-300 !px-2 !py-1"
                                            >
                                                <Trash2 size={16} />
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
                        Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
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
                                className={`w-8 h-8 flex items-center justify-center rounded ${
                                    currentPage === number + 1 
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
            
            {/* Add/Edit Product Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-2xl !p-6 !mx-4">
                        <div className="flex justify-between items-center !mb-6">
                            <h2 className="text-xl font-medium">
                                {selectedProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button 
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    setSelectedProduct(null);
                                }}
                                className="text-neutral-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form className="!space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 !mb-1">Product Name</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600"
                                        defaultValue={selectedProduct?.title || ''}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 !mb-1">Category</label>
                                    <select 
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600"
                                        defaultValue={selectedProduct?.category || ''}
                                    >
                                        {categories.filter(cat => cat !== 'all').map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 !mb-1">Price (MAD)</label>
                                    <input 
                                        type="number"
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600"
                                        defaultValue={selectedProduct?.price || ''}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 !mb-1">Status</label>
                                    <select 
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600"
                                        defaultValue="inStock"
                                    >
                                        <option value="inStock">In Stock</option>
                                        <option value="outOfStock">Out of Stock</option>
                                        <option value="limited">Limited</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 !mb-1">Description</label>
                                <textarea 
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600 h-24"
                                    defaultValue={selectedProduct?.description || ''}
                                ></textarea>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 !mb-1">Product Images</label>
                                <div className="flex flex-wrap gap-4">
                                    {/* Display existing images if editing */}
                                    {selectedProduct?.img && selectedProduct.img.map((img, index) => (
                                        <div key={index} className="w-20 h-20 relative bg-neutral-800 rounded overflow-hidden">
                                            <img src={img} alt="Product" className="w-full h-full object-cover" />
                                            <button className="absolute top-0 right-0 bg-red-500 text-white !p-1 !rounded-bl-md">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    
                                    {/* Add new image button */}
                                    <div className="w-20 h-20 border-2 border-dashed border-neutral-700 rounded flex items-center justify-center hover:border-blue-500 cursor-pointer">
                                        <Plus size={24} className="text-neutral-400" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end !space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAddModalOpen(false);
                                        setSelectedProduct(null);
                                    }}
                                    className="!px-4 !py-2 border border-neutral-700 rounded-md text-neutral-300 hover:bg-neutral-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="!px-4 !py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {selectedProduct ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-md !p-6 !mx-4">
                        <div className="text-center">
                            <div className="!mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/10 !mb-4">
                                <Trash2 size={24} className="text-red-500" />
                            </div>
                            <h3 className="text-lg font-medium text-white !mb-2">Delete Product</h3>
                            <p className="text-neutral-400 !mb-6">
                                Are you sure you want to delete "{selectedProduct?.title}"? This action cannot be undone.
                            </p>
                            <div className="flex justify-center !space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDeleteModalOpen(false);
                                        setSelectedProduct(null);
                                    }}
                                    className="!px-4 !py-2 border cursor-pointer border-neutral-700 rounded-md text-neutral-300 hover:bg-neutral-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteConfirm}
                                    className="!px-4 !py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts; 