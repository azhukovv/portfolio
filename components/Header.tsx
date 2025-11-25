import React from 'react';
import { MagneticButton } from './MagneticButton';

export const Header: React.FC = () => {
  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/artur-zhukov/', '_blank');
  };

  return (
    <header className="fixed top-[0.5%] md:top-[8px] left-[2%] right-[2%] md:left-0 md:w-full z-[100] px-6 md:px-9 py-6 flex justify-between items-center pointer-events-none mix-blend-difference">
      {/* Logo */}
      <div className="font-bold text-xl tracking-tighter pointer-events-auto cursor-pointer text-white">
        AZ
      </div>

      <div className="pointer-events-auto">
        <MagneticButton 
            onClick={handleLinkedInClick}
            className="h-12 px-6 text-white hover:bg-white/20 transition-colors duration-500"
        >
            Connect on LinkedIn
        </MagneticButton>
      </div>
    </header>
  );
};