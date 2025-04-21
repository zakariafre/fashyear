import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import productData from '../../../ProductsDB.json'
import ShopCard from '../HomePage/CardProduct'
import { Trash2, X } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'


const Wishlist = () => {


    // Scroll to top when component mounts, but after a slight delay to ensure content is loaded
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timeoutId);
    }, []);
    
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 400,
            once: false,
            mirror: true,
        });
    }, []);


    const [isOpen, setIsOpen] = useState(false);
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedItems = localStorage.getItem('wishlist');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

    // Function to update wishlist items in real-time
    const handleWishlistChange = (newWishlist) => {
        setWishlistItems(newWishlist);
    };

    // Function to clear all items from wishlist
    const clearAllWishlist = () => {
        setShowConfirmPopup(true);
        // Reset AOS animations when opening popup
        setTimeout(() => {
            AOS.refresh();
        }, 10);
    };
    
    // Function to confirm and clear the wishlist
    const confirmClear = () => {
        localStorage.setItem('wishlist', JSON.stringify([]));
        // Update the state directly
        setWishlistItems([]);
        setShowConfirmPopup(false);
        
        // Dispatch custom event to update the Navbar
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
            detail: { wishlist: [] } 
        }));
    };
    
    // Function to cancel clearing the wishlist
    const cancelClear = () => {
        setShowConfirmPopup(false);
    };

    // Get random products excluding wishlisted items
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        const getRandomProducts = () => {
            const otherProducts = productData.filter(p => !wishlistItems.some(item => item.id === p.id));
            const shuffled = [...otherProducts];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setRandomProducts(shuffled.slice(0, 4));
        };

        getRandomProducts();
    }, [wishlistItems]);

    return (


        <div className='h-full w-full flex flex-col justify-center items-center tracking-wider text-white text-lg !mt-34 gap-7'>
            
            {/* Confirmation Popup */}
            {showConfirmPopup && (
                <>
                    <div className="fixed inset-0 bg-black/80 z-40" onClick={cancelClear}></div>
                    <div 
                        data-aos="fade-in" 
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-neutral-950 border border-neutral-700 backdrop-blur-md !p-6 z-50 h-[30%] w-[40%] flex flex-col justify-center items-center"
                    >
                        <button 
                            onClick={cancelClear} 
                            className="absolute top-3 right-3 text-white hover:opacity-80 cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-white text-sm uppercase tracking-wider font-light !mb-4">Clear Wishlist</h3>
                        <p className="text-neutral-300 text-sm font-light tracking-normal text-center !mb-5">
                            Are you sure you want to clear your Wishlist ?
                        </p>
                        <div className="flex gap-4 !mt-2">
                            <button 
                                onClick={cancelClear}
                                className="!px-5 !py-2 text-white hover:opacity-80 font-light border border-white cursor-pointer text-sm uppercase tracking-wider"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmClear}
                                className="!px-5 !py-2 font-light bg-white cursor-pointer text-black text-sm uppercase tracking-wider hover:bg-neutral-200"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </>
            )}

            {wishlistItems.length === 0 ? (
                // Empty wishlist view
                <div className='flex flex-col items-center gap-3'>
                    <h1 className='uppercase'>Your wishlist is empty</h1>
                    <p className='text-[1rem] text-neutral-300 tracking-tight'>Sign in or create an account to save your selection</p>
                    <div className='flex flex-row gap-5'>
                        <button className='uppercase tracking-normal text-sm bg-white text-black hover:bg-transparent hover:text-white hover:border-white border transition-all duration-300 !px-6 !py-2 rounded-full cursor-pointer'>Sign in</button>
                        <button className='group relative uppercase tracking-normal text-sm bg-transparent text-white rounded-full cursor-pointer'>
                            <span>Create account</span>
                            <span className='absolute bottom-2 right-0 w-full h-[1px] bg-white transition-all duration-100 group-hover:w-0'></span>
                            <span className='absolute bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-100 delay-300 group-hover:w-full'></span>
                        </button>
                    </div>
                </div>
            ) : (
                // Wishlist items view
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='flex flex-col items-center gap-3 relative w-full'>
                        <h1 className='uppercase'>Create a Wishlist</h1>
                        <p className='text-[1rem] text-neutral-300 tracking-tight'>Sign in or create an account to save your selection</p>



                        <div className='flex flex-row gap-5 !mt-3'>
                            <button className='uppercase tracking-normal text-sm bg-white text-black hover:bg-transparent hover:text-white hover:border-white border transition-all duration-300 !px-6 !py-2 rounded-full cursor-pointer'>Sign in</button>
                            <button className='group relative uppercase tracking-normal text-sm bg-transparent text-white rounded-full cursor-pointer'>
                                <span>Create account</span>
                                <span className='absolute bottom-2 right-0 w-full h-[1px] bg-white transition-all duration-100 group-hover:w-0'></span>
                                <span className='absolute bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-100 delay-300 group-hover:w-full'></span>
                            </button>
                        </div>
                    </div>
                    {/* Clear All button */}
                    <div className='w-[90%] relative'>
                        <button
                            onClick={clearAllWishlist}
                            className='group absolute uppercase  tracking-widest top-0 right-2 flex items-center justify-center gap-2 text-xs cursor-pointer text-neutral-500 hover:text-red-400/70 transition-colors duration-200 !py-1 !px-0'
                        >
                            <span>Clear Wishlist</span>
                            <Trash2 className='!mb-1' size={14} /> 
                            <span className='absolute bottom-1 right-0 w-full h-[1px] bg-neutral-500 group-hover:bg-red-400/70 transition-all duration-100 group-hover:w-0'></span>
                            {/* <span className='absolute bottom-1 left-0 w-0 h-[1px] bg-neutral-500 group-hover:bg-red-400/70 transition-all duration-100 delay-300 group-hover:w-full'></span> */}
                        
                        </button>
                        
                        <div className='grid grid-cols-4 !mt-10 place-items-center w-full gap-y-10'>
                            {wishlistItems.map((product) => (
                                <ShopCard
                                    key={product.id}
                                    id={product.id}
                                    img={product.img[0]}
                                    title={product.title}
                                    price={product.price}
                                    setIsOpen={setIsOpen}
                                    onWishlistChange={handleWishlistChange}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* you might like section */}
            <div className="w-full !mt-10 font-light tracking-wider flex flex-col justify-center items-center gap-3 uppercase text-lg">
                <h2 className="!mb-0">You May Like</h2>

                <div className="w-[90%] h-fit relative grid grid-cols-4 place-items-center">
                    {randomProducts.map((product) => (
                        <ShopCard
                            key={product.id}
                            id={product.id}
                            img={product.img[0]}
                            title={product.title}
                            price={product.price}
                            setIsOpen={setIsOpen}
                            onWishlistChange={handleWishlistChange}
                        />
                    ))}
                </div>
            </div>
        </div>




    )
}

export default Wishlist