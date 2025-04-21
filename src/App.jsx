import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import LogIn from './pages/Log-in/LogIn';
import SignUp from './pages/SignUp/SignUp';
import Checkout from './pages/CheckOut/Checkout';

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

// Main layout with Navbar and Footer
const MainLayout = ({ children, isOpen, setIsOpen, isSearchOpen, setIsSearchOpen }) => {
  return (
    <>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      {children}
      <Footer />
    </>
  );
};

// Auth layout without Navbar and Footer
const AuthLayout = ({ children }) => {
  return children;
};

// Checkout layout with only minimal header
const CheckoutLayout = ({ children }) => {
  return (
    <div className="bg-white min-h-screen">
      {children}
    </div>
  );
};

const AppContent = ({ isOpen, setIsOpen, isSearchOpen, setIsSearchOpen, isWishlistOpen, setIsWishlistOpen }) => {
  const { isCartOpen } = useCart();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isCheckoutPage = location.pathname === '/checkout';

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

  // If we're on the checkout page, render the checkout layout
  if (isCheckoutPage) {
    return (
      <>
        <Noise patternSize={400} patternAlpha={5} />
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </>
    );
  }

  // If we're on an auth page, only render the auth routes
  if (isAuthPage) {
    return (
      <>
        <Noise patternSize={400} patternAlpha={5} />
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </>
    );
  }

  // Otherwise render the main app with all decorations
  return (
    <div className="App bg-[#121212] min-h-screen w-full overflow-x-hidden relative">
      <Noise patternSize={400} patternAlpha={10} />
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />

      <CartSideBar />

      <div className='flex flex-col items-center min-h-screen gap-[10rem] md:gap-[3rem]'>
        <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} products={ProductData} />

        <Routes>
          {/* Auth routes without Navbar and Footer */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Checkout route */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Main routes with Navbar and Footer */}
          <Route path="/" element={
            <MainLayout isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}>
              <div className="flex flex-col min-h-screen gap-[3rem] md:gap-[4rem]">
                <HeroSection />
                <CategorySection />
                <NewArrival />
              </div>
            </MainLayout>
          } />

          <Route path="/shop" element={
            <MainLayout isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}>
              <Shop />
            </MainLayout>
          } />

          <Route path="/product/:id" element={
            <MainLayout isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}>
              <ProductPage />
            </MainLayout>
          } />

          <Route path="/wishlist" element={
            <MainLayout isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}>
              <Wishlist />
            </MainLayout>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default App;




