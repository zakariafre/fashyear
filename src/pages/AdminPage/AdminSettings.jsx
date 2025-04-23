import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Save,
    Globe,
    CreditCard,
    Mail,
    Bell,
    Smartphone,
    ShieldCheck,
    RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';

const AdminSettings = () => {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('general');
    const [saveSuccess, setSaveSuccess] = useState(false);
    
    
    // General settings form state
    const [generalSettings, setGeneralSettings] = useState({
        siteName: 'Fashyear',
        siteDescription: 'Modern modest fashion for the modern woman',
        contactEmail: 'contact@fashyear.com',
        phoneNumber: '+212 555-123456',
        address: 'Rue Mohammed V, Casablanca, Morocco',
        currency: 'MAD'
    });
    
    // Payment settings form state
    const [paymentSettings, setPaymentSettings] = useState({
        enableCashOnDelivery: true,
        enableCreditCard: true,
        enablePaypal: false,
        enableStripe: true,
        taxRate: 20,
        shipping: {
            domestic: 30,
            international: 150
        }
    });
    
    // Notification settings form state
    const [notificationSettings, setNotificationSettings] = useState({
        orderConfirmation: true,
        orderShipped: true,
        orderDelivered: true,
        lowStockAlert: true,
        newUserRegistration: true,
        marketingEmails: false
    });
    
    const handleGeneralChange = (e) => {
        const { name, value } = e.target;
        setGeneralSettings({
            ...generalSettings,
            [name]: value
        });
    };
    
    const handlePaymentChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setPaymentSettings({
                ...paymentSettings,
                [name]: checked
            });
        } else if (name.includes('shipping.')) {
            const shippingKey = name.split('.')[1];
            setPaymentSettings({
                ...paymentSettings,
                shipping: {
                    ...paymentSettings.shipping,
                    [shippingKey]: parseFloat(value)
                }
            });
        } else {
            setPaymentSettings({
                ...paymentSettings,
                [name]: type === 'number' ? parseFloat(value) : value
            });
        }
    };
    
    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotificationSettings({
            ...notificationSettings,
            [name]: checked
        });
    };
    
    const handleSaveSettings = (e) => {
        e.preventDefault();
        // In a real app, you would save these settings to a backend
        console.log('Saving settings...');
        console.log('General:', generalSettings);
        console.log('Payment:', paymentSettings);
        console.log('Notifications:', notificationSettings);
        
        // Show success message temporarily
        setSaveSuccess(true);
        setTimeout(() => {
            setSaveSuccess(false);
        }, 3000);
    };
    
    return (
        <div className="min-h-screen bg-[#121212] text-white flex">
            {/* Admin Sidebar */}
            <AdminSidebar />
            
            {/* Main Content */}
            <div className="!ml-64 flex-1 !p-8">
                {/* Header */}
                <div className="flex justify-between items-center !mb-8">
                    <h1 className="text-2xl font-light">Settings</h1>
                    <div className="flex items-center !space-x-4">
                        <Link to="/" className="text-sm text-neutral-400 hover:text-white">View Store</Link>
                    </div>
                </div>
                
                {/* Settings Tabs */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden !mb-8">
                    <div className="flex border-b border-neutral-800">
                        <button
                            className={`!px-6 !py-3 text-sm font-medium ${activeTab === 'general' 
                                ? 'text-white border-b-2 border-blue-500' 
                                : 'text-neutral-400 hover:text-white'}`}
                            onClick={() => setActiveTab('general')}
                        >
                            General
                        </button>
                        <button
                            className={`!px-6 !py-3 text-sm font-medium ${activeTab === 'payment' 
                                ? 'text-white border-b-2 border-blue-500' 
                                : 'text-neutral-400 hover:text-white'}`}
                            onClick={() => setActiveTab('payment')}
                        >
                            Payment
                        </button>
                        <button
                            className={`!px-6 !py-3 text-sm font-medium ${activeTab === 'notifications' 
                                ? 'text-white border-b-2 border-blue-500' 
                                : 'text-neutral-400 hover:text-white'}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            Notifications
                        </button>
                    </div>
                </div>
                
                {/* Settings Form */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
                    <div className="!p-6">
                        <form onSubmit={handleSaveSettings}>
                            {/* General Settings */}
                            {activeTab === 'general' && (
                                <div>
                                    <div className="flex items-center !mb-6">
                                        <Globe size={20} className="text-blue-500 !mr-2" />
                                        <h2 className="text-lg font-medium">General Settings</h2>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 !gap-6 !mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-300 !mb-1">Site Name</label>
                                            <input 
                                                type="text"
                                                name="siteName"
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600"
                                                value={generalSettings.siteName}
                                                onChange={handleGeneralChange}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-300 !mb-1">Contact Email</label>
                                            <input 
                                                type="email"
                                                name="contactEmail"
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600"
                                                value={generalSettings.contactEmail}
                                                onChange={handleGeneralChange}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-300 !mb-1">Phone Number</label>
                                            <input 
                                                type="text"
                                                name="phoneNumber"
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600"
                                                value={generalSettings.phoneNumber}
                                                onChange={handleGeneralChange}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-300 !mb-1">Currency</label>
                                            <select 
                                                name="currency"
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600"
                                                value={generalSettings.currency}
                                                onChange={handleGeneralChange}
                                            >
                                                <option value="MAD">MAD - Moroccan Dirham</option>
                                                <option value="USD">USD - US Dollar</option>
                                                <option value="EUR">EUR - Euro</option>
                                                <option value="GBP">GBP - British Pound</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="!mb-6">
                                        <label className="block text-sm font-medium text-neutral-300 !mb-1">Site Description</label>
                                        <textarea 
                                            name="siteDescription"
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600 h-24"
                                            value={generalSettings.siteDescription}
                                            onChange={handleGeneralChange}
                                        />
                                    </div>
                                    
                                    <div className="!mb-6">
                                        <label className="block text-sm font-medium text-neutral-300 !mb-1">Store Address</label>
                                        <textarea 
                                            name="address"
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600 h-24"
                                            value={generalSettings.address}
                                            onChange={handleGeneralChange}
                                        />
                                    </div>
                                </div>
                            )}
                            
                            {/* Payment Settings */}
                            {activeTab === 'payment' && (
                                <div>
                                    <div className="flex items-center !mb-6">
                                        <CreditCard size={20} className="text-blue-500 !mr-2" />
                                        <h2 className="text-lg font-medium">Payment Settings</h2>
                                    </div>
                                    
                                    <div className="!mb-6">
                                        <h3 className="text-sm font-medium uppercase text-neutral-400 !mb-3">Payment Methods</h3>
                                        <div className="!space-y-3">
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id="enableCashOnDelivery"
                                                    name="enableCashOnDelivery"
                                                    checked={paymentSettings.enableCashOnDelivery}
                                                    onChange={handlePaymentChange}
                                                    className="h-4 w-4 rounded border-neutral-700 text-blue-600 focus:ring-blue-500 bg-neutral-800"
                                                />
                                                <label htmlFor="enableCashOnDelivery" className="!ml-2 text-sm">Cash on Delivery</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id="enableCreditCard"
                                                    name="enableCreditCard"
                                                    checked={paymentSettings.enableCreditCard}
                                                    onChange={handlePaymentChange}
                                                    className="h-4 w-4 rounded border-neutral-700 text-blue-600 focus:ring-blue-500 bg-neutral-800"
                                                />
                                                <label htmlFor="enableCreditCard" className="!ml-2 text-sm">Credit Card</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id="enablePaypal"
                                                    name="enablePaypal"
                                                    checked={paymentSettings.enablePaypal}
                                                    onChange={handlePaymentChange}
                                                    className="h-4 w-4 rounded border-neutral-700 text-blue-600 focus:ring-blue-500 bg-neutral-800"
                                                />
                                                <label htmlFor="enablePaypal" className="!ml-2 text-sm">PayPal</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id="enableStripe"
                                                    name="enableStripe"
                                                    checked={paymentSettings.enableStripe}
                                                    onChange={handlePaymentChange}
                                                    className="h-4 w-4 rounded border-neutral-700 text-blue-600 focus:ring-blue-500 bg-neutral-800"
                                                />
                                                <label htmlFor="enableStripe" className="!ml-2 text-sm">Stripe</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 !gap-6 !mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-300 !mb-1">Tax Rate (%)</label>
                                            <input 
                                                type="number"
                                                name="taxRate"
                                                min="0"
                                                step="0.1"
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600"
                                                value={paymentSettings.taxRate}
                                                onChange={handlePaymentChange}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-300 !mb-1">Domestic Shipping (MAD)</label>
                                            <input 
                                                type="number"
                                                name="shipping.domestic"
                                                min="0"
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600"
                                                value={paymentSettings.shipping.domestic}
                                                onChange={handlePaymentChange}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-300 !mb-1">International Shipping (MAD)</label>
                                            <input 
                                                type="number"
                                                name="shipping.international"
                                                min="0"
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-md !py-2 !px-3 focus:outline-none focus:border-blue-600"
                                                value={paymentSettings.shipping.international}
                                                onChange={handlePaymentChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Notification Settings */}
                            {activeTab === 'notifications' && (
                                <div>
                                    <div className="flex items-center !mb-6">
                                        <Bell size={20} className="text-blue-500 !mr-2" />
                                        <h2 className="text-lg font-medium">Notification Settings</h2>
                                    </div>
                                    
                                    <div className="!mb-6">
                                        <h3 className="text-sm font-medium uppercase text-neutral-400 !mb-3">Email Notifications</h3>
                                        <div className="!space-y-3">
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id="orderConfirmation"
                                                    name="orderConfirmation"
                                                    checked={notificationSettings.orderConfirmation}
                                                    onChange={handleNotificationChange}
                                                    className="h-4 w-4 rounded border-neutral-700 text-blue-600 focus:ring-blue-500 bg-neutral-800"
                                                />
                                                <label htmlFor="orderConfirmation" className="!ml-2 text-sm">Order Confirmation</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id="orderShipped"
                                                    name="orderShipped"
                                                    checked={notificationSettings.orderShipped}
                                                    onChange={handleNotificationChange}
                                                    className="h-4 w-4 rounded border-neutral-700 text-blue-600 focus:ring-blue-500 bg-neutral-800"
                                                />
                                                <label htmlFor="orderShipped" className="!ml-2 text-sm">Order Shipped</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id="orderDelivered"
                                                    name="orderDelivered"
                                                    checked={notificationSettings.orderDelivered}
                                                    onChange={handleNotificationChange}
                                                    className="h-4 w-4 rounded border-neutral-700 text-blue-600 focus:ring-blue-500 bg-neutral-800"
                                                />
                                                <label htmlFor="orderDelivered" className="!ml-2 text-sm">Order Delivered</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="!mb-6">
                                        <h3 className="text-sm font-medium uppercase text-neutral-400 !mb-3">Admin Notifications</h3>
                                        <div className="!space-y-3">
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id="lowStockAlert"
                                                    name="lowStockAlert"
                                                    checked={notificationSettings.lowStockAlert}
                                                    onChange={handleNotificationChange}
                                                    className="h-4 w-4 rounded border-neutral-700 text-blue-600 focus:ring-blue-500 bg-neutral-800"
                                                />
                                                <label htmlFor="lowStockAlert" className="!ml-2 text-sm">Low Stock Alerts</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id="newUserRegistration"
                                                    name="newUserRegistration"
                                                    checked={notificationSettings.newUserRegistration}
                                                    onChange={handleNotificationChange}
                                                    className="h-4 w-4 rounded border-neutral-700 text-blue-600 focus:ring-blue-500 bg-neutral-800"
                                                />
                                                <label htmlFor="newUserRegistration" className="!ml-2 text-sm">New User Registration</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id="marketingEmails"
                                                    name="marketingEmails"
                                                    checked={notificationSettings.marketingEmails}
                                                    onChange={handleNotificationChange}
                                                    className="h-4 w-4 rounded border-neutral-700 text-blue-600 focus:ring-blue-500 bg-neutral-800"
                                                />
                                                <label htmlFor="marketingEmails" className="!ml-2 text-sm">Marketing Emails</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Save Button */}
                            <div className="flex items-center justify-end">
                                {saveSuccess && (
                                    <span className="text-green-500 !mr-4 flex items-center">
                                        <ShieldCheck size={16} className="!mr-1" />
                                        Settings saved successfully!
                                    </span>
                                )}
                                <button 
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white !px-4 !py-2 rounded-md flex items-center"
                                >
                                    <Save size={18} className="!mr-2" />
                                    Save Settings
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;