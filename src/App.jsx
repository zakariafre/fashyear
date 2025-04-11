import { useState } from 'react'
import { useEffect } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './pages/HomePage/Hero';
import HeroSection from './pages/HomePage/HeroSection';
import Navbar from './components/Navbar';
import Noise from './components/Noise';
import Section2 from './pages/HomePage/Section2';
import CategorySection from './pages/HomePage/CategorySection';
import Description from './pages/HomePage/Description';
import CollectionSection from './pages/HomePage/CollectionSection';
import SupportedBy from './pages/HomePage/SupportedBy';
import Footer from './components/Footer';
import Menu from './components/Menu';
import WishListPopUp from './components/WishListPopUp';
import Search from './components/Search';
import Shop from './pages/ShopPage/Shop';
import ScrollBlurText from './components/BlurEffect';
import ProductData from '../ProductsDB.json'
import ProductPage from './pages/ProductPage/ProductPage';


const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on component unmount or when isOpen changes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (

    <Router>
      <div className="App bg-[#121212] min-h-screen w-full overflow-x-hidden relative">
        <Noise patternSize={400} patternAlpha={10} />
        <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
        <ScrollBlurText />
        <WishListPopUp />

        <div className='flex flex-col items-center min-h-screen gap-[10rem] md:gap-[3rem]'>
          <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} products={ProductData} />
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
          
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col min-h-screen gap-[3rem] md:gap-[4rem]">
                <HeroSection />
                {/* <Section2 /> */}
                <CategorySection />
                {/* <Description /> */}
                {/* <CollectionSection /> */}
                {/* <SupportedBy /> */}
              </div>
            } />

            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
