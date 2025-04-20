import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ShopCard from '../../pages/HomePage/CardProduct';
// Json file
import productData from '../../../ProductsDB.json';
import { useCart } from '../../context/CartContext';

// Icons
import { ChevronDown, Shuffle } from 'lucide-react';

// wishlist component
import WishListPopUp from '../../components/WishListPopUp';

const ProductPage = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('Size');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showProductCare, setShowProductCare] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const imageSectionRef = useRef(null);
  const detailsRef = useRef(null);
  const [isFixed, setIsFixed] = useState(true);
  const [offsetTop, setOffsetTop] = useState(0);

  // Reset states when product ID changes
  useEffect(() => {
    setSelectedSize('Size');
    setIsDropdownOpen(false);
    setShowFullDescription(false);
    setShowProductCare(false);
    
    // Check wishlist status for new product
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.some(item => item.id === id));

    // Find the new product
    const product = productData.find(p => p.id === id);
    setCurrentProduct(product);

    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);

  // Scroll to top when component mounts, but after a slight delay to ensure content is loaded
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [id]); // Runs when id changes


  // sticky logic 
  useEffect(() => {
    const handleScroll = () => {
      if (!imageSectionRef.current || !detailsRef.current) return;

      const scrollTop = window.scrollY;
      const imageBottom = imageSectionRef.current.offsetTop + imageSectionRef.current.offsetHeight;
      const detailsHeight = detailsRef.current.offsetHeight;

      // Reduce the maxFixedScroll by a small amount to make the sticky effect end sooner
      const maxFixedScroll = imageBottom - detailsHeight - 118; // Reduced by 50 pixels

      // Determine if the details section should be fixed
      const shouldBeFixed = scrollTop < maxFixedScroll;

      setIsFixed(shouldBeFixed);
      setOffsetTop(maxFixedScroll);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get random products excluding current product
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const getRandomProducts = () => {
      const otherProducts = productData.filter(p => p.id !== id);
      const shuffled = [...otherProducts];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setRandomProducts(shuffled.slice(0, 4));
    };

    getRandomProducts();
  }, [id]);

  if (!currentProduct) {
    return <div>Loading...</div>;
  }

  const availableSizes = currentProduct.size;
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const toggleLike = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const newWishlistedState = !isWishlisted;
    setIsWishlisted(newWishlistedState);

    if (newWishlistedState) {
      if (!wishlist.some(item => item.id === currentProduct.id)) {
        wishlist.push(currentProduct);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 2000);
      }
    } else {
      const updatedWishlist = wishlist.filter(item => item.id !== currentProduct.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  const handleSizeClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSizeSelect = (size) => {
    if (availableSizes.includes(size)) {
      setSelectedSize(size);
      setIsDropdownOpen(false);
    }
  };

  const handleAddToCart = () => {
    if (selectedSize === 'Size') {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(currentProduct, selectedSize);
  };






  return (


    <div className="flex flex-col h-fit text-white">
      {/* Main content area */}
      <div className="flex flex-row">
        {/* Product Section */}
        <div style={{ minHeight: '100vh' }} className='flex flex-row gap-20 w-full !pr-10 relative'>

          {/* Pictures Side */}
          <div ref={imageSectionRef} className='w-[52%] flex flex-col' onClick={() => setIsDropdownOpen(false)}>
            {currentProduct.img.map((image, index) => (
              <div key={index} className='w-full overflow-hidden'>
                <img className='scale-110' src={image} alt="" />
              </div>
            ))}
          </div>

          {/* Informations Side */}
          <div
            ref={detailsRef}
            className='w-[30%] !mr-20 flex flex-col gap-4'
            style={{
              position: isFixed ? 'fixed' : 'absolute',
              top: isFixed ? '7rem' : `${offsetTop}px`,
              right: '5%',
              width: '30%',
            }}






            
          >
            {/* ready to wear and wishlist icon */}
            <div className='flex flex-row justify-between items-center'>
              <h2 className='tracking-wider text-neutral-400 text-[0.5rem]'>READY TO WEAR</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={isWishlisted ? "#fff" : "none"}
                stroke={isWishlisted ? "none" : "currentColor"}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cursor-pointer h-3.5 w-3.5 transition-all z-30 duration-150"
                onClick={() => { setIsWishlisted(!isWishlisted); toggleLike() }}
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>

            {/* Product Name and price */}
            <div className='flex flex-col gap-1'>
              <h1 className='text-[1.5rem] uppercase tracking-wider font-light text-neutral-300'>{currentProduct.title}</h1>
              <h2 className='text-[0.9rem] font-light text-neutral-400'>{currentProduct.price} DH</h2>
            </div>

            {/* Sizes */}
            <div className='relative !py-2 flex flex-row justify-between items-center text-[0.8rem] font-extralight !mt-10 cursor-pointer' onClick={handleSizeClick}>
              <h2 className='text-neutral-300'>{selectedSize === 'Size' ? 'Select Size' : 'Sizes'}</h2>

              <div className='flex flex-row gap-2 items-center text-neutral-300'>
                {selectedSize !== 'Size' && <span className='text-[0.8rem]'>{selectedSize}</span>}
                <ChevronDown className={`w-4 h-4 opacity-75 ${isDropdownOpen ? 'rotate-180' : ''} transition-all duration-100 ease-in-out`} />
              </div>
            </div>

            {/* line */}
            <hr className='w-full opacity-20 relative bottom-3' />

            {/* Dropdown Container */}
            <div className='relative'>
              {/* Dropdown */}
              {sizeError && selectedSize === 'Size' && (
                <p className="text-red-500 text-xs relative bottom-4">Please select a size</p>
              )}
              <div
                className={`absolute left-0 -top-20 text-[0.7rem] bg-neutral-800 border-x border-neutral-700 text-neutral-300 rounded-b-lg overflow-hidden shadow-md w-full z-10 transition-all duration-300 ease-in-out transform ${isDropdownOpen
                  ? 'translate-y-13 max-h-50 !pt-4'
                  : 'translate-y-13 max-h-0 transition-all !pt-0 ease-in-out duration-300'
                  }`}
              >
                {allSizes.map((size) => (
                  <div
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`!pl-4 !py-2 transition-colors duration-200 hover:bg-neutral-700/50 cursor-pointer ${availableSizes.includes(size)
                      ? ''
                      : 'opacity-40 line-through'
                      }
                    ${selectedSize === size ? 'bg-neutral-700/50' : ''}
                    `}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            {/* Place in Cart button  */}
            <div className=''>
              <button 
                onClick={handleAddToCart}
                className='w-full text-[0.9rem] font-medium uppercase bg-neutral-200 text-[#080808] !py-3 cursor-pointer hover:bg-neutral-200/80 transition-all duration-200 ease-in-out'
              >
                add to bag
              </button>
            </div>

            {/* description  */}
            <div className='!mt-10'>
              <div className={`relative text-[0.8rem] font-light tracking-tight text-neutral-400 transition-all duration-300 ease-in-out ${showFullDescription ? 'max-h-50' : 'max-h-20'} overflow-hidden`}>
                <p>{currentProduct.description}</p>
                {!showFullDescription && (
                  <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
                )}
              </div>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-[0.75rem] font-extralight text-neutral-400 underline underline-offset-2 hover:text-neutral-300 mt-2 transition-colors duration-200"
              >
                {showFullDescription ? 'Read Less' : 'Read More'}
              </button>
            </div>

            {/* Product Care */}
            {/* <>
              <div
                className={`text-[0.9rem] cursor-pointer !py-3 font-light text-neutral-300 flex flex-row justify-between items-center transition-all duration-500 ease-in-out`}
                onClick={() => setShowProductCare(!showProductCare)}
              >
                <h2>Product Care</h2>
                <div className='flex items-center justify-center w-6 h-6 rounded-full'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className='text-neutral-300 duration-300 ease-in-out'
                  >
                    {showProductCare ? (
                      <>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </>
                    ) : (
                      <>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </>
                    )}
                  </svg>
                </div>
              </div>
              <div className={`overflow-hidden ${showProductCare ? 'max-h-96' : 'max-h-0'} transition-[max-height] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]`}>
                <div className={`overflow-hidden ${showProductCare ? 'max-h-96' : 'max-h-0'} transition-[max-height] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]`}>
                  <div className={`transform transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]`}>
                    <div className='text-[0.8rem] font-light text-neutral-400 !pb-8'>
                      <p>To ensure the longevity and quality of your product, please follow these care instructions:</p>
                      <ul className='list-disc !mt-4 !pl-8 w-[90%] gap-2 flex flex-col'>
                        <li>Machine wash cold with like colors. Use a gentle cycle and mild detergent. Avoid bleach.</li>
                        <li>Tumble dry on low heat or hang to dry. Avoid direct sunlight to prevent fading.</li>
                        <li>If needed, iron on low heat. Avoid ironing directly on prints or embellishments.</li>
                        <li>Store in a cool, dry place. Avoid damp areas to prevent mold and mildew.</li>
                        <li>Handle with care to avoid snags and tears. Keep away from sharp objects.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <hr className='w-full opacity-20 relative bottom-7' />
            </> */}

          </div>
        </div>
      </div>

      {/* Footer section */}
      <footer className="w-full">
        {/* you might like section */}
        <div className="w-full !mt-14 font-light tracking-wider flex flex-col justify-center items-center gap-5 uppercase text-lg">
          <h2 className="!mb-0">You May Also Like</h2>

          <div className="w-[90%] h-fit relative grid grid-cols-4 gap-x-10 place-items-center">
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
      </footer>

      {/* wishlist popup */}
      <WishListPopUp isOpen={isOpen} setIsOpen={setIsOpen} product={currentProduct} />
    </div>
  );
};

export default ProductPage;