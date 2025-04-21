import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './pages/HomePage/HeroSection';
import Navbar from './components/Navbar';
import Noise from './components/Noise';
import CategorySection from './pages/HomePage/CategorySection';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Search from './components/Search';
import Shop from './pages/ShopPage/Shop';
import ProductData from '../ProductsDB.json'
import ProductPage from './pages/ProductPage/ProductPage';
import NewArrival from './pages/HomePage/NewArrival';
import Wishlist from './pages/WishlistPage/Wishlist';
import CartSideBar from './components/CartSideBar';
import { CartProvider, useCart } from './context/CartContext';

const App = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <AppContent
          isOpen={isOpen}
          setIsOpen={setIsOpen}

          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}

          isWishlistOpen={isWishlistOpen}
          setIsWishlistOpen={setIsWishlistOpen}
        />
      </Router>
    </CartProvider>
  );
};

const AppContent = ({ isOpen, setIsOpen, isSearchOpen, setIsSearchOpen, isWishlistOpen, setIsWishlistOpen }) => {
  const { isCartOpen } = useCart();

  useEffect(() => {
    if (isOpen || isSearchOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isSearchOpen, isCartOpen]);

  return (
    <div className="App bg-[#121212] min-h-screen w-full overflow-x-hidden relative">
      <Noise patternSize={400} patternAlpha={10} />
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />

      <CartSideBar />

      <div className='flex flex-col items-center min-h-screen gap-[10rem] md:gap-[3rem]'>
        <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} products={ProductData} />
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />

        <Routes>
          <Route path="/" element={
            <div className="flex flex-col min-h-screen gap-[3rem] md:gap-[4rem]">
              <HeroSection />
              <CategorySection />
              <NewArrival />
            </div>
          } />

          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
};

export default App;




