import { useState } from 'react'
import { useEffect } from 'react';
import React from 'react';
import Hero from './pages/HomePage/Hero';
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



const App = () => {

  const [isOpen, setIsOpen] = useState(false);  // Manage the menu open state here
  const [isSearchOpen, setIsSearchOpen] = useState(false);  // Manage the menu open state here

  // Disable scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Cleanup on component unmount or when isOpen changes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]); // Triggered when isOpen changes



  // Product Search 
  const products = [
    { id: 1, name: "Essential Gray Dress" },
    { id: 2, name: "Blue Denim Jeans Skirt" },
    { id: 4, name: "Cream Fleece Casual Pants" },
    { id: 3, name: "Mocha Pearl Dress" },
    { id: 5, name: "Collection Winter" },
    { id: 6, name: "Black brocade dress" },
    { id: 7, name: "Taupe down jacket" },
    { id: 8, name: "Beige faux leather trench coat" },
  ];


  return (

    <div className="App bg-[#121212] min-h-screen w-full overflow-x-hidden relative">
      {/* Global Overlays/Modals (not tied to sections) */}
      <Noise patternSize={400} patternAlpha={10} />
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
      <ScrollBlurText />
      <WishListPopUp />

      {/* Main Page */}
      {/* <div className="Sections flex flex-col min-h-screen gap-[10rem] md:gap-[6rem]">
        <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} products={products} />
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
        <Hero />
        <Section2 />
        <CategorySection />
        <Description />
        <CollectionSection />
        <SupportedBy />
        <Footer />
      </div> */}

      <div className='Sections flex flex-col items-center min-h-screen gap-[10rem] md:gap-[3rem]'>
        <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} products={products} />
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
        <Shop />
        <Footer />
      </div >


    </div>

  );
};

export default App;
