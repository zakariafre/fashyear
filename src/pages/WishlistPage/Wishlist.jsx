import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import productData from '../../../ProductsDB.json'
import ShopCard from '../HomePage/CardProduct'


const Wishlist = () => {


    // Scroll to top when component mounts, but after a slight delay to ensure content is loaded
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timeoutId);
    }, []);


    const [isOpen, setIsOpen] = useState(false);
    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedItems = localStorage.getItem('wishlist');
        return savedItems ? JSON.parse(savedItems) : [];
    });

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
                    <div className='flex flex-col items-center gap-3'>
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
                    <div className='grid grid-cols-4 !mt-10 place-items-center w-[90%] gap-y-10'>
                        {wishlistItems.map((product) => (
                            <ShopCard
                                key={product.id}
                                id={product.id}
                                img={product.img[0]}
                                title={product.title}
                                price={product.price}
                                setIsOpen={setIsOpen}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* you might like section */}
            <div className="w-full !mt-3 font-light tracking-wider flex flex-col justify-center items-center gap-3 uppercase text-lg">
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
                        />
                    ))}
                </div>
            </div>
        </div>




    )
}

export default Wishlist