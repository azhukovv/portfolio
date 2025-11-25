import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Work } from './components/Work';
import { Footer } from './components/Footer';

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Disable scroll while loading animation runs
  useEffect(() => {
    if (!loadingComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.overflowX = 'hidden';
    }
  }, [loadingComplete]);

  return (
    <div className="bg-white min-h-screen text-black selection:bg-black selection:text-white">
      
      <div className={`transition-opacity duration-1000 ${loadingComplete ? 'opacity-100' : 'opacity-0'}`}>
        <Header />
      </div>

      <main className="relative w-full">
        {/* Hero sits at Z-0. It will expand and then scroll naturally. */}
        <Hero onLoaderComplete={() => setLoadingComplete(true)} />
        
        {/* Content Stacking */}
        <div className={`relative z-10 transition-opacity duration-700 ${loadingComplete ? 'opacity-100' : 'opacity-0'}`}>
           <About />
           <Work />
           <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;