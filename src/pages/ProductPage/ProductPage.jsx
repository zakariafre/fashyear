import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ShopCard from '../../pages/HomePage/CardProduct';
import '../../App.css';
// Json file
import productData from '../../../ProductsDB.json';
import { useCart } from '../../context/CartContext';
// Icons
import { ChevronDown, Shuffle, X, ZoomIn, ZoomOut } from 'lucide-react';
// wishlist component
import WishListPopUp from '../../components/WishListPopUp';

const ProductPage = () => {



  const { addToCart } = useCart();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('Size');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [wishlistedProduct, setWishlistedProduct] = useState(null);

  // Zoom state
  const [zoomedImages, setZoomedImages] = useState({});
  const [positions, setPositions] = useState({});

  // Show full materials and care state
  const [showFullMaterials, setShowFullMaterials] = useState(false);
  const [showFullCare, setShowFullCare] = useState(false);

  const imageRefs = useRef({});
  const zoomLevel = 2; // Fixed zoom level for consistent experience

  const imageSectionRef = useRef(null);
  const detailsRef = useRef(null);

  // Handle image click to toggle zoom
  const handleImageClick = (e, index) => {
    e.stopPropagation();

    setZoomedImages(prev => {
      const newZoomed = { ...prev };

      // If already zoomed, unzoom it
      if (newZoomed[index]) {
        delete newZoomed[index];
      } else {
        // Unzoom any other images first
        Object.keys(newZoomed).forEach(key => {
          delete newZoomed[key];
        });

        // Zoom this image
        newZoomed[index] = true;

        // Initialize position
        setPositions(prev => ({
          ...prev,
          [index]: { x: 0, y: 0 }
        }));
      }

      return newZoomed;
    });
  };

  // Handle mouse leave to unzoom
  const handleMouseLeave = (index) => {
    setZoomedImages(prev => {
      const newZoomed = { ...prev };
      delete newZoomed[index];
      return newZoomed;
    });
  };

  // Handle mouse move to track cursor position
  const handleMouseMove = (e, index) => {
    if (zoomedImages[index]) {
      const container = imageRefs.current[index];
      if (!container) return;

      // Get container dimensions and position
      const rect = container.getBoundingClientRect();

      // Calculate cursor position within the container as percentage (0 to 1)
      const xPercent = (e.clientX - rect.left) / rect.width;
      const yPercent = (e.clientY - rect.top) / rect.height;

      // Calculate how much the image can move based on zoom level
      const moveRangeX = (rect.width * zoomLevel - rect.width) / 2;
      const moveRangeY = (rect.height * zoomLevel - rect.height) / 2;

      // Convert percentage to position (centered at 0.5)
      const x = (0.5 - xPercent) * (moveRangeX);
      const y = (0.5 - yPercent) * (moveRangeY);

      // Update position
      setPositions(prev => ({
        ...prev,
        [index]: { x, y }
      }));
    }
  };

  // Reset states when product ID changes
  useEffect(() => {
    setSelectedSize('Size');
    setShowFullDescription(false);
    setShowMoreDetails(false);

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

  // Listen for changes in localStorage to detect wishlisted products
  useEffect(() => {
    const handleStorageChange = () => {
      const lastWishlistedId = localStorage.getItem('lastWishlistedProduct');
      if (lastWishlistedId) {
        const foundProduct = productData.find(p => p.id === lastWishlistedId);
        if (foundProduct) {
          setWishlistedProduct(foundProduct);
        }
      }
    };

    // Set up event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Also check on mount
    handleStorageChange();
    
    // Add event listener for wishlist updates from ShopCard components
    const handleWishlistUpdated = (event) => {
      const { detail } = event;
      if (detail && detail.product) {
        setWishlistedProduct(detail.product);
      }
    };
    
    window.addEventListener('wishlistProductUpdated', handleWishlistUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistProductUpdated', handleWishlistUpdated);
    };
  }, []);

  // Function to handle wishlist updates from "You May Also Like" section
  const handleWishlistChange = (wishlistData, product) => {
    if (product) {
      setWishlistedProduct(product);
    }
  };

  // Check if currentProduct is loaded
  if (!currentProduct) {
    return <div>Loading...</div>;
  }

  // Now that we know currentProduct exists, we can safely access its properties
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
        localStorage.setItem('lastWishlistedProduct', currentProduct.id);
        setWishlistedProduct(currentProduct);
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 2000);
      }
    } else {
      const updatedWishlist = wishlist.filter(item => item.id !== currentProduct.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  const handleSizeSelect = (size) => {
    if (availableSizes.includes(size)) {
      setSelectedSize(size);
      setSizeError(false);
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
    <div className="flex flex-col min-h-screen text-white">
      {/* Main content area */}
      <div className="max-h-[900px] !mt-28">
        {/* Product Section */}
        <div className='relative grid grid-cols-12 gap-10 !ml-22'>
          {/* Pictures Side */}
          <div ref={imageSectionRef} className='relative col-span-7 grid grid-cols-2 gap-x-1 gap-y-1'>
            {currentProduct.img.map((image, index) => (
              <div
                key={index}
                className={`w-full aspect-[3/4] overflow-hidden relative ${zoomedImages[index] ? 'custom-zoom-out' : 'custom-zoom-in'}`}
                ref={el => imageRefs.current[index] = el}
                onClick={(e) => handleImageClick(e, index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={(e) => handleMouseLeave(index)}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={{
                    transform: zoomedImages[index]
                      ? `scale(${zoomLevel}) translate(${positions[index]?.x || 0}px, ${positions[index]?.y || 0}px)`
                      : 'scale(1)',
                    transformOrigin: 'center center',
                    transition: 'transform 0.05s ease-out'
                  }}
                  draggable={false}
                  src={image}
                  alt={`${currentProduct.title} view ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Informations Side */}
          <div ref={detailsRef} className='absolute right-26 w-[30%] flex flex-col gap-4'>
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
            <div className='relative !py-2 flex flex-col gap-1 !mt-5 text-[0.8rem] font-light '>
              <h2 className={`text-neutral-300 uppercase tracking-wider font-medium !mb-1 ${sizeError && selectedSize === 'Size' ? 'text-red-400 text-xs' : ''}`}>{sizeError && selectedSize === 'Size' ? 'please select a size' : 'SIZE'}</h2>

              {/* Size grid */}
              <div className='grid grid-cols-4 gap-2 font-medium'>
                {allSizes.map((size) => (
                  <div
                    key={size}
                    onClick={() => availableSizes.includes(size) && handleSizeSelect(size)}
                    className={`
                      border border-neutral-600 !py-3 !px-3 flex justify-center items-center cursor-pointer transition-colors duration-200
                      ${selectedSize === size ? 'bg-neutral-300 text-black' : 'bg-transparent text-white  hover:border-neutral-400'}
                      ${!availableSizes.includes(size) ? 'opacity-40 cursor-not-allowed line-through' : ''}
                    `}
                  >
                    {size}
                  </div>
                ))}
              </div>

            </div>

            {/* Place in Cart button  */}
            <div className='!mt-5'>
              <button
                onClick={handleAddToCart}
                className='w-full text-[0.9rem] font-medium uppercase text-[#080808] !py-2.5 cursor-pointer bg-neutral-200/90 hover:bg-neutral-100 duration-75'
              >
                add to bag
              </button>
            </div>

            {/* description  */}
            <div className='!mt-10'>
              <div className='relative text-[0.8rem] font-light tracking-tight text-neutral-400 transition-all duration-300 ease-in-out'>
                <div className='flex flex-col gap-6'>
                  {/* Description text */}
                  <div>
                    <div className=''>
                      <h3 className='text-neutral-200 font-medium uppercase text-[0.7rem] tracking-widest !mb-4'>Description</h3>
                      <p className='text-[0.8rem] leading-relaxed'>{currentProduct.description}</p>
                    </div>
                  </div>

                  {/* More Detail Section with Materials and Care */}
                  <div>
                    <div className={`transition-all w-full duration-200 overflow-hidden ${showMoreDetails ? 'max-h-[35rem] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <hr className='w-full opacity-20 !mt-1' />
                      {/* Materials Section */}
                      <div className='grid grid-cols-12 gap-4 !mt-5'>
                        <h3 className='text-neutral-200 font-medium uppercase text-[0.7rem] tracking-widest !mb-2 col-span-3'>Materials</h3>
                        <div className='col-span-9'>
                          <p className='text-[0.8rem]'>100% Premium Materials</p>
                          <p className='text-[0.75rem] !mt-2 text-neutral-400'>
                            At Fashyear, we use only high-quality materials to ensure comfort, durability, and sustainability. 
                            Our commitment to excellence means carefully selecting fabrics that maintain their quality 
                            through countless wears and washes. We prioritize materials that not only feel good against 
                            your skin but also have minimal environmental impact. Each garment undergoes rigorous quality checks 
                            to ensure it meets our standards before reaching you.
                          </p>
                        </div>
                      </div>
                      <hr className='w-full opacity-20 !mt-7' />

                      {/* Care Section */}
                      <div className='grid grid-cols-12 !mt-5 !mb-4 gap-4'>
                        <h3 className='text-neutral-200 font-medium uppercase text-[0.7rem] tracking-widest !mb-2 col-span-3'>Care</h3>
                        <div className='col-span-9'>
                          <ul className='flex flex-col gap-3'>
                            <li>Machine wash cold with like colors. Use a gentle cycle and mild detergent. Avoid bleach.</li>
                            <li>Tumble dry on low heat or hang to dry. Avoid direct sunlight to prevent fading.</li>
                            <li>If needed, iron on low heat. Avoid ironing directly on prints or embellishments.</li>
                            <li>Store in a cool, dry place. Avoid damp areas to prevent mold and mildew.</li>
                            <li>Handle with care to avoid snags and tears. Keep away from sharp objects.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <hr className='w-full opacity-20 !mt-1' />

                      <div onClick={() => setShowMoreDetails(!showMoreDetails)} className='flex justify-start items-center !mt-3 !mb-3 cursor-pointer'>
                        <h3 className='text-neutral-200 font-medium uppercase text-[0.7rem] tracking-widest'>{showMoreDetails ? 'Less' : 'More'} Detail</h3>
                        <button
                          className="text-neutral-300 flex items-center gap-1"
                        >
                          <ChevronDown
                            size={22}
                            className={`transition-transform duration-300 !ml-1 !py-1 ${showMoreDetails ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer section */}
      <div className={`w-full ${showMoreDetails ? '!mt-[30%] duration-300' : '!mt-[10%] duration-300'}`}>
        {/* you might like section */}
        <div className="w-full font-light tracking-wider flex flex-col justify-center items-center gap-5 uppercase text-lg">
          <h2 className="!mb-0">You May Also Like</h2>

          <div className="w-[90%] h-fit relative grid grid-cols-4 gap-x-0 place-items-center">
            {randomProducts.map((product) => (
              <ShopCard
                key={product.id}
                id={product.id}
                img={product.img[0]}
                title={product.title}
                price={product.price}
                setIsOpen={setIsOpen}
                onWishlistChange={(wishlist) => handleWishlistChange(wishlist, product)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* wishlist popup */}
      <WishListPopUp isOpen={isOpen} setIsOpen={setIsOpen} product={wishlistedProduct || currentProduct} />
    </div>
  );
};

export default ProductPage;