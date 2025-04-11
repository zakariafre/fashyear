import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Import images from assets using exact filenames and correct case
import essentialGrayDress1 from '../../assets/Dresses/Dress_Gray_Pos1.png';
import essentialGrayDress2 from '../../assets/Dresses/Dress_Gray_Pos2.png';
import essentialGrayDress3 from '../../assets/Dresses/Dress_Gray_Pos3.png';

// Json file
import productData from '../../../ProductsDB.json';

// Icons
import { ChevronDown } from 'lucide-react';

// wishlist component
import WishListPopUp from '../../components/WishListPopUp';










const ProductPage = () => {

  
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('Size');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showProductCare, setShowProductCare] = useState(false);
  

  useEffect(() => {
    const product = productData.find(p => p.id === id);
    setCurrentProduct(product);
  }, [id]);

  if (!currentProduct) {
    return <div>Loading...</div>;
  }

  const availableSizes = currentProduct.size;
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const toggleLike = () => {
    if (!isWishlisted) {
      setIsOpen(true);
      setTimeout(() => setIsOpen(false), 2000);
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





  return (
    <div className="min-h-screen w-full text-white">
      <div className='flex flex-row gap-20 w-full min-h-screen relative'>

        {/* Pictures Side */}
        <div className='w-[70%] h-full flex flex-col gap-1' onClick={() => setIsDropdownOpen(false)}>
          {currentProduct.img.map((image, index) => (
            <div key={index} className='w-[100%] h-full overflow-hidden'>
              <img className='scale-110' src={image} alt="" />
            </div>
          ))}
        </div>









        {/* Informations Side */}
        <div className='w-[50%] !mr-24 h-full flex flex-col gap-4 sticky !mt-32 self-start'>

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
            <h2 className='text-neutral-300 '>{selectedSize === 'Size' ? 'Select Size' : 'Sizes'}</h2>

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
            <button className='w-full tracking-tight bg-neutral-200 text-[#080808] border border-neutral-400 !py-2 rounded-full cursor-pointer hover:bg-transparent hover:text-neutral-300 transition-all duration-200 ease-in-out'>
              Place in Cart
            </button>
          </div>



          {/* description  */}
          <div className='!mt-10'>
            <div className={`relative text-[0.8rem] font-light tracking-tight text-neutral-400 transition-all duration-300 ease-in-out ${showFullDescription ? 'max-h-50' : 'max-h-20'} overflow-hidden`}>
              <p>{currentProduct.description}</p>
              {!showFullDescription && (
                // <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-neutral-800 to-transparent"></div>
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



          {/* line */}
          <hr className='w-full opacity-20 !mt-2 relative top-3' />


          {/* Product Care */}
          <>
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
          </>

          <hr className='w-full opacity-20 relative bottom-7' />

        </div>
      </div>

      {/* wishlist popup */}
      <WishListPopUp isOpen={isOpen} setIsOpen={setIsOpen} />

    </div>
  );
};

export default ProductPage;          