import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fashyear from '../../assets/Icons/1.png';
import { useCart } from '../../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';


const Checkout = () => {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();




    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const discount = subtotal * 0.15; // 15% discount
    const duties = subtotal * 0.08; // 8% duties
    const tax = subtotal * 0.07; // 7% tax
    const shipping = 0; // Free shipping
    const total = subtotal - discount + duties + tax + shipping;

    const handleContinueToShipping = (e) => {
        e.preventDefault();
        if (email && agreedToTerms) {
            setStep(2);
        }
    };

    const handleContinueToPayment = (e) => {
        e.preventDefault();
        setStep(3);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        // Process order
        console.log('Order placed');
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 bg-neutral-900/50 backdrop-blur-sm right-0 z-50 border-b border-neutral-800">
                <div className="h-16 w-full flex items-center justify-center">
                    <Link to="/">
                        <img src={fashyear} alt="Fashyear" className="h-7" />
                    </Link>
                </div>
            </header>

            <div className="w-full !pt-20 flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
                {/* Left column - Checkout form */}
                <div className="w-full md:w-3/5 flex flex-col gap-4 !p-4 md:!p-8">
                    {/* Step 1: Email */}
                    <div className="border border-neutral-800 bg-neutral-900 flex flex-col">
                        <div className="flex items-center h-16 !px-6 border-b border-neutral-800">
                            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center !mr-3 font-medium">
                                1
                            </div>
                            <h2 className="text-xl font-light">Enter Your Email</h2>
                        </div>
                        <div className="!p-6">
                            {step === 1 ? (
                                <form onSubmit={handleContinueToShipping} className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm text-neutral-400">
                                            Already have an account? <Link to="/login" className="text-neutral-200 underline">Log In</Link>
                                        </p>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                className="w-full h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            checked={agreedToTerms}
                                            onChange={() => setAgreedToTerms(!agreedToTerms)}
                                            required
                                            className="w-4 h-4 appearance-none checked:appearance-auto cursor-pointer bg-neutral-900 border border-neutral-700"
                                        />
                                        <label htmlFor="terms" className="text-xs text-neutral-400">
                                            By providing your email, you agree to our <a href="#" className="text-neutral-200 underline">Privacy Policy</a> and <a href="#" className="text-neutral-200 underline">Terms</a>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="h-12 bg-neutral-300 hover:bg-white text-black uppercase text-sm font-medium tracking-wide"
                                    >
                                        Continue to Shipping
                                    </button>
                                </form>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <p className="text-neutral-300">{email}</p>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-sm text-neutral-300 underline"
                                    >
                                        Change
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Step 2: Shipping */}
                    <div className={`border ${step >= 2 ? 'border-neutral-800' : 'border-neutral-900'} ${step >= 2 ? 'bg-neutral-900' : 'bg-neutral-900/50'} flex flex-col`}>
                        <div className="flex items-center h-16 !px-6 border-b border-neutral-800">
                            <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-500'} flex items-center justify-center !mr-3 font-medium`}>
                                2
                            </div>
                            <h2 className={`text-xl font-light ${step >= 2 ? 'text-white' : 'text-neutral-500'}`}>Shipping</h2>
                        </div>

                        {step === 2 && (
                            <div className="!p-6">
                                <form onSubmit={handleContinueToPayment} className="flex flex-col gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="firstName" className="text-sm text-neutral-400">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                className="h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="lastName" className="text-sm text-neutral-400">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                className="h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="address" className="text-sm text-neutral-400">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            className="h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="apartment" className="text-sm text-neutral-400">Apartment, suite, etc. (optional)</label>
                                        <input
                                            type="text"
                                            id="apartment"
                                            className="h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="city" className="text-sm text-neutral-400">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                className="h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="state" className="text-sm text-neutral-400">State</label>
                                            <input
                                                type="text"
                                                id="state"
                                                className="h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="zip" className="text-sm text-neutral-400">ZIP Code</label>
                                            <input
                                                type="text"
                                                id="zip"
                                                className="h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="phone" className="text-sm text-neutral-400">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 px-3"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="h-12 bg-neutral-300 hover:bg-white text-black uppercase text-sm font-medium tracking-wide !mt-4"
                                    >
                                        Continue to Payment
                                    </button>
                                </form>
                            </div>
                        )}

                        {step > 2 && (
                            <div className="!p-6 flex justify-between items-center">
                                <p className="text-sm text-neutral-300">123 Main St, Anytown, ST 12345</p>
                                <button
                                    onClick={() => setStep(2)}
                                    className="text-sm text-neutral-300 underline"
                                >
                                    Change
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Step 3: Payment */}
                    <div className={`border ${step >= 3 ? 'border-neutral-800' : 'border-neutral-900'} ${step >= 3 ? 'bg-neutral-900' : 'bg-neutral-900/50'} flex flex-col`}>
                        <div className="flex items-center h-16 !px-6 border-b border-neutral-800">
                            <div className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-500'} flex items-center justify-center !mr-3 font-medium`}>
                                3
                            </div>
                            <h2 className={`text-xl font-light ${step >= 3 ? 'text-white' : 'text-neutral-500'}`}>Payment Method</h2>
                        </div>

                        {step === 3 && (
                            <div className="!p-6">
                                <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
                                    <div className="border border-neutral-700 flex flex-col">
                                        <div className="flex items-center h-14 !px-4 border-b border-neutral-700">
                                            <input
                                                type="radio"
                                                id="creditCard"
                                                name="paymentMethod"
                                                className="w-4 h-4"
                                                defaultChecked
                                            />
                                            <label htmlFor="creditCard" className="ml-2 font-medium text-neutral-200">Credit Card</label>
                                        </div>

                                        <div className="!p-4 flex flex-col gap-4">
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="cardNumber" className="text-sm text-neutral-400">Card Number</label>
                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    className="h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                                    placeholder="1234 5678 9012 3456"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="expiry" className="text-sm text-neutral-400">Expiration Date</label>
                                                    <input
                                                        type="text"
                                                        id="expiry"
                                                        className="h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                                        placeholder="MM / YY"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="cvv" className="text-sm text-neutral-400">Security Code</label>
                                                    <input
                                                        type="text"
                                                        id="cvv"
                                                        className="h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                                        placeholder="CVV"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Save Info for later */}
                                    <div className="border-t border-neutral-800 !pt-4 flex flex-col gap-3">
                                        <h3 className="font-medium text-neutral-200">Save Your Info (Optional)</h3>
                                        <p className="text-sm text-neutral-400">Create a password for easy order review and faster checkout the next time you shop.</p>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="w-full h-12 bg-neutral-900 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="h-12 bg-neutral-300 hover:bg-white text-black uppercase text-sm font-medium tracking-wide !mt-4"
                                    >
                                        Place Order
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right column - Order summary */}
                <div className="w-full md:w-2/5 bg-neutral-900 !mr-0 md:!mr-4 border-l border-neutral-800 flex flex-col">
                    <div className="flex flex-col h-full">
                        {/* Discount banner */}
                        {/* <div className="bg-green-900/30 h-10 flex items-center justify-center text-sm text-green-400 border-b border-green-900/50">
                            Discount - 15% off
                        </div> */}

                        <div className="flex-1 !p-6 flex flex-col">
                            {/* Item details */}
                            <div className="flex flex-col gap-4">
                                <h3 className="font-light text-lg flex justify-between items-center">
                                    <span>Bag ({cartItems.length})</span>
                                    <span>MAD{subtotal.toFixed(2)}</span>
                                </h3>

                                <div className="grid grid-cols-1 gap-y-6">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="flex items-center gap-6 bg-neutral-800/0 !p-4 ">
                                            <div className="w-35 h-45 overflow-hidden">
                                                <img
                                                    src={item.img[1]}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover cursor-pointer"
                                                    draggable={false}
                                                    onClick={(e) => handleImgClick(e, item.id)}
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1">
                                                <div className="!mb-24 flex flex-col gap-2">
                                                    <h3 className="text-xs font-light uppercase tracking-widest">{item.title}</h3>
                                                    <p className="text-xs font-light text-neutral-400 !mt-1">Size / <span className=" text-neutral-200"> {item.selectedSize} </span></p>
                                                </div>
                                                <div className="flex justify-between items-center !mt-2">
                                                    <p className="text-sm ">{item.price} dh</p>
                                                    <div className="flex items-center gap-2 relative left-12">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                                            className="!p-1 hover:bg-neutral-700/50 rounded transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                                            className="!p-1 hover:bg-neutral-700/50 rounded transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                className="!p-1 cursor-pointer relative bottom-20 rounded-md transition-colors"
                                            >
                                                <Trash2 className="hover:text-red-400" size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Promo code */}
                            <div className="flex !mt-6">
                                <input
                                    type="text"
                                    placeholder="Promo code"
                                    className="flex-1 h-12 border-b border-neutral-700 focus:border-neutral-300 bg-neutral-800 border-0 outline-none !px-3 text-neutral-300"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="bg-neutral-700 hover:bg-neutral-600 cursor-pointer text-neutral-300 w-20 h-12 flex items-center justify-center text-sm"
                                >
                                    Apply
                                </button>
                            </div>

                            {/* Order summary */}
                            <div className="flex flex-col gap-3 !mt-6 text-sm">
                                <div className="flex justify-between text-neutral-400">
                                    <span>Subtotal</span>
                                    <span className="text-neutral-300">MAD{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-green-400">
                                    <span>Welcome Offer - 15% Off</span>
                                    <span>-MAD{discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-400">
                                    <span>Duties</span>
                                    <span className="text-neutral-300">MAD{duties.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-400">
                                    <span>Estimated Tax</span>
                                    <span className="text-neutral-300">MAD{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-400">
                                    <span>Estimated Shipping</span>
                                    <span className="text-neutral-300">Free</span>
                                </div>
                                <div className="flex justify-between !pt-4 border-t border-neutral-800 font-medium text-white">
                                    <span>Total</span>
                                    <span>MAD{total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Estimated warning */}
                            <div className="mt-auto !pt-6">
                                <div className="bg-amber-900/20 border border-amber-900/30 p-3 text-xs text-amber-200/80">
                                    Duties, Tax, and Shipping are estimated totals until shipping step is complete.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
