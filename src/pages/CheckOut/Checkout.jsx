import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import fashyear from '../../assets/Icons/1.png';
import { useCart } from '../../context/CartContext';
import { Minus, Plus, Trash2, Check, Eye, EyeOff, ShoppingCart } from 'lucide-react';
import Footer from '../../components/Footer';
import CartSideBar from '../../components/CartSideBar';

const Checkout = () => {

    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');

    // Payment information state
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();

    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [countryInput, setCountryInput] = useState('');
    const [countries, setCountries] = useState(['Morocco', 'United States', 'Albania', 'Andorra', 'Antigua and Barbuda', 'Argentina', 'Aruba', 'Australia', 'Austria', 'Bahamas', 'United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Portugal']);

    // Form errors
    const [formErrors, setFormErrors] = useState({});

    // Input formatting functions
    const formatCardNumber = (value) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, '');
        // Format with spaces after every 4 digits
        const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
        // Limit to 16 digits (19 chars with spaces)
        return formatted.slice(0, 19);
    };

    const formatExpiryDate = (value) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, '');
        // Format as MM / YY
        if (digits.length <= 2) {
            return digits;
        }
        return `${digits.slice(0, 2)} / ${digits.slice(2, 4)}`;
    };

    const formatCVV = (value) => {
        // Remove all non-digits and limit to 3-4 digits
        return value.replace(/\D/g, '').slice(0, 4);
    };

    // Handle input changes with formatting
    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted);
    };

    const handleExpiryChange = (e) => {
        const formatted = formatExpiryDate(e.target.value);
        setExpiry(formatted);
    };

    const handleCVVChange = (e) => {
        const formatted = formatCVV(e.target.value);
        setCvv(formatted);
    };

    // Calculate totals - updated to use quantity
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal * 0.15; // 15% discount
    const tax = subtotal * 0.07; // 7% tax
    const shipping = 0; // Free shipping
    const total = subtotal - discount + tax + shipping;

    const validateEmailForm = () => {
        const errors = {};
        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        if (!agreedToTerms) {
            errors.terms = "You must agree to the terms";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateShippingForm = () => {
        const errors = {};
        if (!fullName) errors.fullName = "Full name is required";
        if (!selectedCountry) errors.country = "Country is required";
        if (!address) errors.address = "Address is required";
        if (!city) errors.city = "City is required";
        if (!state) errors.state = "State is required";
        if (!zip) errors.zip = "ZIP code is required";
        if (!phone) errors.phone = "Phone number is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validatePaymentForm = () => {
        const errors = {};
        if (!cardNumber) errors.cardNumber = "Card number is required";
        if (!expiry) errors.expiry = "Expiration date is required";
        if (!cvv) errors.cvv = "Security code is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleContinueToShipping = (e) => {
        e.preventDefault();
        if (validateEmailForm()) {
            setStep(2);
        }
    };

    const handleContinueToPayment = (e) => {
        e.preventDefault();
        if (validateShippingForm()) {
            setStep(3);
        }
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (validatePaymentForm()) {
            // Process order with all collected information
            const orderData = {
                customer: {
                    email,
                    fullName,
                    address,
                    city,
                    state,
                    zip,
                    country: selectedCountry,
                    phone
                },
                payment: {
                    method: paymentMethod,
                    cardNumber: cardNumber ? cardNumber.replace(/\s/g, '') : '',
                    expiry,
                    cvv
                },
                order: {
                    items: cartItems,
                    subtotal,
                    discount,
                    tax,
                    shipping,
                    total
                }
            };
            console.log('Order placed', orderData);
            // Here you would typically send this data to your backend

            // Redirect to success page or clear cart
            // navigate('/checkout/success');
        }
    };

    // Handle product image click
    const handleImgClick = (e, productId) => {
        e.stopPropagation();
        navigate(`/product/${productId}`);
    };

    // Clear form errors when changing steps
    useEffect(() => {
        setFormErrors({});
    }, [step]);

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 !pl-28 bg-neutral-900/50 backdrop-blur-lg right-0 z-50">
                <div className="h-12 w-full flex items-center justify-start">
                    <span className='flex justify-center items-center gap-2'>
                        <Link to="/">
                            <img src={fashyear} alt="Fashyear" className="h-4" />
                        </Link>
                        <span className='text-sm font-medium uppercase tracking-widest text-neutral-300'>| Checkout </span>
                    </span>
                </div>
            </header>

            <div className="w-full relative top-6 !px-20 !py-20 flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
                {/* Left column - Checkout form */}
                <div className="w-full md:w-3/5 flex flex-col gap-4 !px-8 !py-0 md:!px-8 md:!py-0">
                    {/* Step 1: Email */}
                    <div className="border border-neutral-800 bg-neutral-900 flex flex-col">
                        <div className="flex items-center h-16 !px-6 border-b border-neutral-800">
                            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center !mr-3 font-medium">
                                {step > 1 ? <Check size={18} /> : 1}
                            </div>
                            <h2 className="text-xl font-light">Enter Your Email</h2>
                        </div>
                        <div className="!py-6 !px-16">
                            {step === 1 ? (
                                <form onSubmit={handleContinueToShipping} className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm text-neutral-400">
                                            Already have an account? <Link to="/login" className="text-neutral-200 underline">Log In</Link>
                                        </p>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                className={`w-full h-12 bg-neutral-800 border-0 border-b ${formErrors.email ? 'border-red-500' : 'border-neutral-700'} outline-none focus:border-neutral-300 !px-3`}
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            {formErrors.email && (
                                                <p className="text-red-500 text-xs !mt-1">{formErrors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            checked={agreedToTerms}
                                            onChange={() => setAgreedToTerms(!agreedToTerms)}
                                            required
                                            className={`w-4 h-4 appearance-none checked:appearance-auto cursor-pointer bg-neutral-900 border ${formErrors.terms ? 'border-red-500' : 'border-neutral-700'}`}
                                        />
                                        <label htmlFor="terms" className="text-xs text-neutral-400">
                                            By providing your email, you agree to our <a href="#" className="text-neutral-200 underline">Privacy Policy</a> and <a href="#" className="text-neutral-200 underline">Terms</a>
                                        </label>
                                    </div>
                                    {formErrors.terms && (
                                        <p className="text-red-500 text-xs !mt-1">{formErrors.terms}</p>
                                    )}

                                    <button
                                        type="submit"
                                        className="h-12 bg-neutral-300 hover:bg-white text-black uppercase text-sm font-medium tracking-wide"
                                    >
                                        Continue to Shipping
                                    </button>
                                </form>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div className="text-neutral-300 flex flex-col">
                                        <span className='font-light text-sm text-neutral-400'> Your email is</span>
                                        <span className='font-normal'>{email}</span>
                                    </div>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-sm font-light cursor-pointer text-neutral-300 underline"
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
                                {step > 2 ? <Check size={18} /> : 2}
                            </div>
                            <h2 className={`text-xl font-light ${step >= 2 ? 'text-white' : 'text-neutral-500'}`}>Shipping</h2>
                        </div>

                        {step === 2 && (
                            <div className="!py-6 !px-16">
                                <form onSubmit={handleContinueToPayment} className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="text"
                                            placeholder='Full Name'
                                            id="firstName"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className={`h-12 bg-neutral-800 border-0 border-b ${formErrors.fullName ? 'border-red-500' : 'border-neutral-700'} outline-none focus:border-neutral-300 !px-3`}
                                            required
                                        />
                                        {formErrors.fullName && (
                                            <p className="text-red-500 text-xs !mt-1">{formErrors.fullName}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Country"
                                                className={`h-12 w-full cursor-pointer bg-neutral-800 border-0 border-b ${formErrors.country ? 'border-red-500' : 'border-neutral-700'} outline-none focus:border-neutral-300 !px-3 text-neutral-200`}
                                                required
                                                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                onChange={(e) => setCountryInput(e.target.value)}
                                                value={countryInput}
                                                autoComplete="new-password"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                autoCapitalize="off"
                                                aria-autocomplete="none"
                                            />
                                            {formErrors.country && (
                                                <p className="text-red-500 text-xs !mt-1">{formErrors.country}</p>
                                            )}
                                            <div className="absolute flex flex-row items-center gap-3 right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <span className='text-neutral-400 font-extralight'>|</span>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 9L12 15L18 9" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            {showCountryDropdown && (
                                                <div className="absolute z-50 top-full left-0 w-full rounded-md overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.02)] bg-neutral-800 border border-neutral-700 !mt-2 max-h-[20rem] overflow-y-auto">
                                                    {countries.filter(country =>
                                                        country.toLowerCase().includes(countryInput.toLowerCase()) || !countryInput
                                                    ).map((country, index) => (
                                                        <div
                                                            key={index}
                                                            className="!py-2 !px-3 cursor-pointer hover:bg-neutral-900/30"
                                                            onClick={() => {
                                                                setCountryInput(country);
                                                                setSelectedCountry(country);
                                                                setShowCountryDropdown(false);
                                                            }}
                                                        >
                                                            {country}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="text"
                                            placeholder='Address'
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className={`h-12 bg-neutral-800 border-0 border-b ${formErrors.address ? 'border-red-500' : 'border-neutral-700'} outline-none focus:border-neutral-300 !px-3`}
                                            required
                                        />
                                        {formErrors.address && (
                                            <p className="text-red-500 text-xs !mt-1">{formErrors.address}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="text"
                                                placeholder='City'
                                                id="city"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className={`h-12 bg-neutral-800 border-0 border-b ${formErrors.city ? 'border-red-500' : 'border-neutral-700'} outline-none focus:border-neutral-300 !px-3`}
                                                required
                                            />
                                            {formErrors.city && (
                                                <p className="text-red-500 text-xs !mt-1">{formErrors.city}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="text"
                                                placeholder='State'
                                                id="state"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                className={`h-12 bg-neutral-800 border-0 border-b ${formErrors.state ? 'border-red-500' : 'border-neutral-700'} outline-none focus:border-neutral-300 !px-3`}
                                                required
                                            />
                                            {formErrors.state && (
                                                <p className="text-red-500 text-xs !mt-1">{formErrors.state}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="text"
                                                placeholder='ZIP Code'
                                                id="zip"
                                                value={zip}
                                                onChange={(e) => setZip(e.target.value)}
                                                className={`h-12 bg-neutral-800 border-0 border-b ${formErrors.zip ? 'border-red-500' : 'border-neutral-700'} outline-none focus:border-neutral-300 !px-3`}
                                                required
                                            />
                                            {formErrors.zip && (
                                                <p className="text-red-500 text-xs !mt-1">{formErrors.zip}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="tel"
                                            placeholder='Phone Number'
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className={`h-12 bg-neutral-800 border-0 border-b ${formErrors.phone ? 'border-red-500' : 'border-neutral-700'} outline-none focus:border-neutral-300 !px-3`}
                                            required
                                        />
                                        {formErrors.phone && (
                                            <p className="text-red-500 text-xs !mt-1">{formErrors.phone}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="h-12 bg-neutral-300 cursor-pointer hover:bg-white text-black uppercase text-sm font-medium tracking-wide !mt-4"
                                    >
                                        Continue to Payment
                                    </button>
                                </form>
                            </div>
                        )}

                        {step > 2 && (
                            <div className="!py-6 !px-16 flex flex-row justify-between items-center">
                                <div className="text-neutral-300 flex flex-col">
                                    <p className='font-light text-sm text-neutral-400'>Your Shipping Address</p>
                                    <span className='font-normal !mt-2 italic '>{fullName}</span>
                                    <span className='font-normal italic '>{selectedCountry}</span>
                                    <span className='font-normal italic '> {address}, {city}, {zip}</span>
                                    <span className='font-normal italic '>{phone}</span>
                                </div>
                                <button
                                    onClick={() => setStep(2)}
                                    className="text-sm cursor-pointer text-neutral-300 underline"
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
                                {step > 3 ? <Check size={18} /> : 3}
                            </div>
                            <h2 className={`text-xl font-light ${step >= 3 ? 'text-white' : 'text-neutral-500'}`}>Payment Method</h2>
                        </div>

                        {step === 3 && (
                            <div className="!py-6 !px-16">
                                <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
                                    <div className="border border-neutral-700 flex flex-col">
                                        <div className="flex items-center gap-2 h-14 !px-4 border-b border-neutral-700">
                                            <input
                                                type="radio"
                                                id="creditCard"
                                                name="paymentMethod"
                                                value="creditCard"
                                                checked={paymentMethod === 'creditCard'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-4 h-4"
                                            />
                                            <label htmlFor="creditCard" className="font-medium text-neutral-100">Credit Card</label>
                                        </div>

                                        <div className="!p-4 flex flex-col gap-4">
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="cardNumber" className="text-sm text-neutral-100">Card Number</label>
                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    value={cardNumber}
                                                    onChange={handleCardNumberChange}
                                                    className={`h-12 bg-neutral-800 border-0 border-b ${formErrors.cardNumber ? 'border-red-500' : 'border-neutral-700'} outline-none focus:border-neutral-300 !px-3`}
                                                    placeholder="1234 5678 9012 3456"
                                                    required
                                                />
                                                {formErrors.cardNumber && (
                                                    <p className="text-red-500 text-xs !mt-1">{formErrors.cardNumber}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="expiry" className="text-sm text-neutral-100">Expiration Date</label>
                                                    <input
                                                        type="text"
                                                        id="expiry"
                                                        value={expiry}
                                                        onChange={handleExpiryChange}
                                                        className={`h-12 bg-neutral-800 border-0 border-b ${formErrors.expiry ? 'border-red-500' : 'border-neutral-700'} outline-none focus:border-neutral-300 !px-3`}
                                                        placeholder="MM / YY"
                                                        required
                                                    />
                                                    {formErrors.expiry && (
                                                        <p className="text-red-500 text-xs !mt-1">{formErrors.expiry}</p>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="cvv" className="text-sm text-neutral-100">Security Code</label>
                                                    <input
                                                        type="text"
                                                        id="cvv"
                                                        value={cvv}
                                                        onChange={handleCVVChange}
                                                        className={`h-12 bg-neutral-800 border-0 border-b ${formErrors.cvv ? 'border-red-500' : 'border-neutral-700'} outline-none focus:border-neutral-300 !px-3`}
                                                        placeholder="CVV"
                                                        required
                                                    />
                                                    {formErrors.cvv && (
                                                        <p className="text-red-500 text-xs !mt-1">{formErrors.cvv}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </form>

                                {/* Save Info for later */}
                                <div className="!pt-3 flex flex-col gap-3">
                                    <hr className="border-neutral-700 !my-3" />
                                    <div className='flex flex-col gap-1 !mb-4'>
                                        <h3 className="font-medium text-neutral-200">Save Your Info <span className='font-light'> (Optional)</span></h3>
                                        <p className="text-xs font-light text-neutral-400">Create a password for faster checkout the next time you shop</p>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="w-full h-12 bg-neutral-800 border-0 border-b border-neutral-700 outline-none focus:border-neutral-300 !px-3"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400"
                                        >
                                            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="h-12 w-full cursor-pointer bg-neutral-300 hover:bg-white text-black uppercase text-sm font-medium tracking-wide !mt-4"
                                >
                                    Place Order
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right column - Order summary */}
                <div className="w-full md:w-2/5 bg-neutral-900 !mr-0 md:!mr-4 border border-neutral-800 flex flex-col">
                    <div className="flex flex-col h-full">
                        {/* discount green header */}
                        <div className="bg-green-400/10 flex justify-center text-green-600 !py-3 text-xs font-medium">
                            <span>Discount - 15% off</span>
                        </div>

                        <div className="flex-1 !p-8 flex flex-col">
                            {/* Item details */}
                            <div className="flex flex-col gap-4">
                                <h3 className="font-light text-md flex flex-row justify-between items-center">
                                    <span className='text-sm font-normal uppercase flex flex-row gap-3 items-center'> <ShoppingCart size={16} /> Bag ({cartItems.length}) {cartItems.length > 0 && <span className='h-2 w-2 bg-green-500 rounded-full'></span>} </span>
                                    {cartItems.length > 0 && (
                                        <span onClick={() => setIsCartOpen(true)} className='text-xs text-neutral-400 underline cursor-pointer'>Modify the Selection</span>
                                    )}
                                </h3>

                                {cartItems.length < 1 && (
                                    <div className='flex flex-col gap-4 !mt-10'>
                                        <h3 className='font-light text-md'>Your Bag is empty</h3>
                                        <button onClick={() => navigate('/shop')} className='text-xs w-full h-12 bg-neutral-200 hover:bg-white text-neutral-900 uppercase tracking-widest font-medium cursor-pointer'>continue shopping</button>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-y-6 !mt-6">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 bg-neutral-800/30 !p-2 ">
                                            <div className="w-20 h-30 overflow-hidden">
                                                <img
                                                    src={item.img[1]}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover cursor-pointer"
                                                    draggable={false}
                                                    onClick={(e) => handleImgClick(e, item.id)}
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1">
                                                <div className="!mb-2 flex flex-col gap-2">
                                                    <h3 className="text-[0.65rem] font-light uppercase tracking-widest">{item.title} | x {item.quantity}</h3>
                                                    <p className="text-xs font-light text-neutral-400 !mt-1">Size / <span className=" text-neutral-200"> {item.selectedSize} </span></p>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm font-light">MAD {item.price}</p>
                                                    <p className='text-xs font-light text-neutral-400 !mr-3'></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order summary */}
                            <div className="flex flex-col gap-3 !mt-6 text-sm">
                                <hr className="border-neutral-700 !my-3" />
                                <div className="flex justify-between text-neutral-400">
                                    <span>Subtotal</span>
                                    <span className="text-neutral-300">MAD {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-green-700">
                                    <span>Welcome Offer - 15% Off</span>
                                    <span>- MAD {discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-400">
                                    <span>Tax - 7%</span>
                                    <span className="text-neutral-300">MAD {tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-400">
                                    <span>Shipping</span>
                                    <span className="text-neutral-300">Free</span>
                                </div>
                                <div className="flex justify-between !pt-4 border-neutral-800 font-medium text-white">
                                    <span>Total</span>
                                    <span>MAD {total.toFixed(2)}</span>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
                {cartItems.length > 0 && (
                    <CartSideBar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
