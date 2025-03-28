import { useState } from 'react'
import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Noise from './components/Noise';
import Show from './components/FirstShow';
import Section2 from './components/Section2';
import CategorySection from './components/CategorySection';
import Description from './components/Description';
import CollectionSection from './components/CollectionSection';
import SupportedBy from './components/SupportedBy';
import Footer from './components/Footer';



const App = () => {
  return (

    <div className="App bg-[#121212] min-h-screen w-full overflow-x-hidden relative flex flex-col justify-center gap-[12rem]">
      <div className='TopSections flex flex-col relative justify-center h-full'>
        <Navbar />
        <Noise patternSize={400} patternAlpha={15} />
        <Hero />
      </div>


      <div className=' Sections flex flex-col justify-center gap-[7rem]'>
      <Section2 />
      <CategorySection/>
      <Description/>
      <CollectionSection/>
      <SupportedBy/>
      <Footer/>
      </div>
      

    </div>

  );
};

export default App;
