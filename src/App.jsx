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



const App = () => {

  const [isOpen, setIsOpen] = useState(false);  // Manage the menu open state here

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




  return (

    <div className="App bg-[#121212] min-h-screen w-full overflow-x-hidden relative flex flex-col justify-center gap-[12rem]">
      <div className='TopSections flex flex-col relative justify-center h-full'>
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Noise patternSize={400} patternAlpha={15} />
        <Hero />
        <Menu isOpen={isOpen} setIsOpen={setIsOpen} />

      </div>


      <div className=' Sections flex flex-col justify-center gap-[7rem]'>
        <Section2 />
        <CategorySection />
        <Description />
        <CollectionSection />
        <SupportedBy />
        <Footer />
      </div>


    </div>

  );
};

export default App;
