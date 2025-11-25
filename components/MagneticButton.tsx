import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !textRef.current) return;

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    // Move button magnetic effect
    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 1,
      ease: "power3.out",
    });

    // Move text slightly more for depth
    gsap.to(textRef.current, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 1,
      ease: "power3.out",
    });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!buttonRef.current || !fillRef.current) return;

    const { left, width } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    
    // Determine entry side (left or right)
    const startX = x < width / 2 ? '-100%' : '100%';

    // Reset fill position to entry side then animate to cover
    gsap.fromTo(fillRef.current, 
      { x: startX }, 
      { x: '0%', duration: 0.4, ease: "power3.out" }
    );
    
    // Change text color to black
    if(textRef.current) {
        gsap.to(textRef.current, { color: "#000000", duration: 0.2 });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!buttonRef.current || !textRef.current || !fillRef.current) return;

    const { left, width } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    
    // Determine exit side
    const endX = x < width / 2 ? '-100%' : '100%';

    // Animate fill out to the exit side
    gsap.to(fillRef.current, {
      x: endX,
      duration: 0.4,
      ease: "power3.in"
    });

    // Reset magnetic position
    gsap.to([buttonRef.current, textRef.current], {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    // Revert text color
    gsap.to(textRef.current, { color: "#FFFFFF", duration: 0.2 });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative group overflow-hidden rounded-full flex items-center justify-center bg-white/15 backdrop-blur-[16px] border border-white/10 transition-all duration-300 ${className}`}
    >
      {/* Fill Layer */}
      <div ref={fillRef} className="absolute inset-0 bg-white w-full h-full pointer-events-none -translate-x-full" />
      
      {/* Text */}
      <span ref={textRef} className="relative z-10 block font-medium tracking-tightest text-base text-white">
        {children}
      </span>
    </button>
  );
};