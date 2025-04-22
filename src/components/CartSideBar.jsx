import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { X, Plus, Minus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from '../context/CartContext';
import ProductsData from '../../ProductsDB.json';
import '../App.css';

const CartSideBar = () => {

    const navigate = useNavigate();

    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    useEffect(() => {
        // Get random products for recommendations, excluding items in cart
        const getRandomProducts = () => {
            const cartProductIds = cartItems.map(item => item.id);
            const availableProducts = ProductsData.filter(p => !cartProductIds.includes(p.id) && p.category == "Sets");
            const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, 6);
        };
        setRecommendedProducts(getRandomProducts());
    }, [cartItems]);


    // handle the click on the recommendations products 
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        setIsCartOpen(false);
    };


    // handle the Card click on CartSideBar
    const handleImgClick = (e, productId) => {
        e.stopPropagation();
        navigate(`/product/${productId}`);
        setIsCartOpen(false);
    };




    return (
        <>
            <div
                className={`fixed inset-0 bg-black/90 backdrop-blur-xs z-[100] transition-all duration-300 ease-in-out
                ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsCartOpen(false)}
            ></div>

            <div
                style={{
                    borderWidth: "1.2px",
                    borderStyle: "solid",
                    borderImage: "linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,0.5), rgba(255,255,255,0)) 1"
                }}
                className={`fixed top-0 right-0 h-full w-[50%] uppercase tracking-widest bg-neutral-800/50 overflow-y-hidden text-white transition-all duration-300 ease-in-out z-[101] flex flex-col
                ${isCartOpen ? "translate-x-0" : "translate-x-full"}
                `}
            >





                {/* If cart is empty */}
                {cartItems.length === 0 ? (
                    <div className="h-fit flex flex-col w-full gap-5 relative !mt-20">
                        <div className="flex flex-col !px-22 !py-1 justify-center items-start gap-1">
                            <h3 className="text-2xl font-light normal-case tracking-normal">Your cart is empty</h3>
                            <h3 className="text-2xl font-light normal-case tracking-normal text-neutral-400">Not sure where to start ? </h3>
                        </div>
                        {/* Update Your Wardrobe section */}
                        <div className="flex-1 overflow-hidden !mt-5 !px-[13%]">
                            <div className="flex items-center justify-between !mb-6">
                                <h3 className="text-sm font-light uppercase tracking-widest text-neutral-400">Shop Sets</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            const newSlide = currentSlide - 3 < 0 ? Math.max(recommendedProducts.length - 3, 0) : currentSlide - 3;
                                            setCurrentSlide(newSlide);
                                        }}
                                        className="p-1 hover:bg-neutral-700/50 rounded-full transition-colors"
                                    >
                                        <ChevronLeft size={16} className="text-neutral-400" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            const newSlide = currentSlide + 3 >= recommendedProducts.length ? 0 : currentSlide + 3;
                                            setCurrentSlide(newSlide);
                                        }}
                                        className="p-1 hover:bg-neutral-700/50 rounded-full transition-colors"
                                    >
                                        <ChevronRight size={16} className="text-neutral-400" />
                                    </button>
                                </div>
                            </div>
                            <div className="relative overflow-hidden">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${(currentSlide / 3) * 100}%)` }}
                                >
                                    {recommendedProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="w-1/3 flex-shrink-0 flex flex-col gap-1 cursor-pointer group !px-0.5"
                                            onClick={() => handleProductClick(product.id)}
                                            onMouseEnter={() => setHoveredProductId(product.id)}
                                            onMouseLeave={() => setHoveredProductId(null)}
                                        >
                                            <div className="relative !pb-[133%] overflow-hidden">
                                                <img
                                                    src={hoveredProductId === product.id ? product.img[1] : product.img[0]}
                                                    alt={product.title}
                                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                                                    draggable={false}
                                                />
                                            </div>
                                            <h4 className="text-[0.55rem] w-full font-light uppercase tracking-widest text-neutral-300">{product.title}</h4>
                                            <p className="text-[0.6rem] w-full font-light uppercase tracking-widest text-neutral-400 ">{product.price} dh</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col justify-center items-center gap-5 relative border-neutral-700 !py-5 !px-2">
                            <button onClick={() => setIsCartOpen(false)} className="w-[80%] cursor-pointer !py-3 uppercase tracking-widest bg-white text-black text-xs font-medium hover:bg-transparent hover:text-white border hover:border-neutral-400 duration-300 ease">
                                Continue shopping
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* header */}
                        < div className="sticky top-0 w-full h-14 flex flex-row justify-between bg-white/5 text-neutral-300 items-center !pl-[13%] !pr-[13%] !mt-13">
                            <a className="relative text-xs">Your shopping bag ({cartItems.length})</a>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-white text-[0.9rem] w-8 h-8 flex justify-center items-center font-light cursor-pointer rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="w-full h-full flex flex-col justify-between overflow-hidden">
                            {/* Products list */}
                            <div className="flex-1 overflow-y-auto !px-[11%] !py-6">
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


                                {/* Checkout section */}
                                <div className="border-t flex flex-col gap-5 relative border-neutral-700 !mt-10 !py-6 !px-2">
                                    <div className="flex flex-row gap-5 justify-between items-center">
                                        <span className="text-xs">SubTotal</span>
                                        <span className="text-xs font-light uppercase tracking-widest">{calculateTotal().toFixed(2)} dh</span>
                                    </div>
                                    <Link to="/checkout">
                                        <button onClick={() => setIsCartOpen(false)} className="w-full cursor-pointer !py-3 uppercase tracking-widest bg-white text-black text-xs font-medium hover:bg-transparent hover:text-white border hover:border-neutral-400 duration-300 ease">
                                            Continue to Checkout
                                        </button>
                                    </Link>

                                </div>

                            </div>
                        </div>
                    </>

                )}
            </div >
        </>
    );
}

export default CartSideBar;