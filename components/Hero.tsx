import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader } from './Loader';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onLoaderComplete: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLoaderComplete }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const loaderOverlayRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // ---------------------------------------------------------
  // CONFIGURATION: VIDEO PATH
  // Paste your video path here. 
  // ---------------------------------------------------------
  const VIDEO_PATH = "/assets/card-video.webm"; 

  // Constants for layout spacing
  const PADDING_TOP = 20; // 20px white offset
  const BOTTOM_OFFSET = 20;

  // Set video playback speed
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 1;
    }
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true);
        onLoaderComplete();
      }
    });

    const loaderText = loaderOverlayRef.current?.querySelector('h1');

    // STAGE 1: Loader Text Animation (Inside Black Overlay)
    if (loaderText) {
        tl.fromTo(loaderText, 
          { x: 100, filter: 'blur(20px)', opacity: 0 },
          { x: 0, filter: 'blur(0px)', opacity: 1, duration: 1.2, ease: "power3.out" }
        )
        .to(loaderText, {
          opacity: 0,
          filter: 'blur(20px)',
          x: -50,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.in"
        });
    }

    // STAGE 2: Fade Out Black Overlay to Reveal Hero
    if (loaderOverlayRef.current) {
        tl.to(loaderOverlayRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                 gsap.set(loaderOverlayRef.current, { display: 'none' });
            }
        });
    }

    // STAGE 3: Shrink Hero Card
    mm.add({
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
    }, (context) => {
        const { isMobile } = context.conditions as any;
        
        // Initial State: Full Screen (offsetting the wrapper padding)
        // Final State: Framed (respecting wrapper padding)
        tl.fromTo(containerRef.current, 
        {
            width: "100%",
            height: "100vh", // Covers full viewport height
            borderRadius: "0px",
            marginLeft: "0px",
            marginRight: "0px",
            marginBottom: "0px",
            marginTop: `-${PADDING_TOP}px`, // Pull up to cover the pt-5 padding
        },
        {
          width: isMobile ? "90%" : "calc(100% - 40px)", // Mobile: 90% width (5% margin on each side)
          height: `calc(100vh - ${PADDING_TOP + BOTTOM_OFFSET}px)`, // Fits between top padding and bottom margin
          borderRadius: "32px",
          marginLeft: isMobile ? "5%" : "20px", // Mobile: 5% margin
          marginRight: isMobile ? "5%" : "20px", // Mobile: 5% margin
          marginBottom: `${BOTTOM_OFFSET}px`,
          marginTop: "0px", // Drop down to respect the white top padding
          duration: 1.4,
          ease: "expo.inOut"
        }, "-=0.2");
    });

    // STAGE 4: Hero Content Reveal (Slide Up Line by Line)
    // FIX ANIMATION 2: Ensure text is hidden before reveal, set opacity 0 initially
    if(heroContentRef.current) {
        // We set opacity to 1 immediately before staggering text, 
        // but the text elements themselves need to be handled.
        // Actually, the parent `heroContentRef` has `opacity-0` in className.
        // We fade it in here:
        gsap.to(heroContentRef.current, { opacity: 1, duration: 0.1 });
    }

    const contentElements = heroContentRef.current?.querySelectorAll('.reveal-text');
    if (contentElements) {
        // Ensure they start from invisible state (handled by CSS/Tailwind usually, but force here)
        gsap.set(contentElements, { opacity: 0, y: '100%' }); // Fix: Set initial state

        tl.to(contentElements,
          { 
              y: '0%', 
              opacity: 1, // Reveal opacity
              duration: 1, 
              stagger: 0, // FIX ANIMATION 4: Simultaneous reveal (stagger 0)
              ease: "power3.out" 
          },
          "-=0.8"
        );
    }
    
    // STAGE 5: Reveal Arrow & Metadata
    tl.fromTo(arrowRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5" // Slight overlap with text
    );

  }, { scope: wrapperRef });

  // Continuous Arrow Animation (Up/Down Smooth)
  useGSAP(() => {
    if(isLoaded && arrowRef.current) {
        const arrowIcon = arrowRef.current.querySelector('.arrow-icon');
        gsap.to(arrowIcon, {
            y: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
  }, [isLoaded]);

  // ScrollTrigger for Expansion
  useGSAP(() => {
    if (!isLoaded || !containerRef.current || !wrapperRef.current) return;
    
    const mm = gsap.matchMedia();

    mm.add({
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
    }, (context) => {
        const { isMobile } = context.conditions as any;
        
        ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top top", 
            end: "+=100vh",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
                const progress = self.progress;
                const p = 1 - progress; // Goes from 1 (start) to 0 (end)
                
                // We expand BACK to full screen (0 margin, 100% width)
                if (isMobile) {
                    // Mobile logic: Starts at width 90%, margin 5%. Ends at width 100%, margin 0.
                     gsap.set(containerRef.current, {
                        width: `${100 - (10 * p)}%`, // 90% at start, 100% at end
                        height: `calc(100vh - ${PADDING_TOP * p}px - ${BOTTOM_OFFSET * p}px)`, // Expand to full height
                        marginLeft: `${5 * p}%`, // 5% at start, 0 at end
                        marginRight: `${5 * p}%`,
                        marginBottom: `${BOTTOM_OFFSET * p}px`,
                        marginTop: `-${PADDING_TOP * (1 - p)}px`, // Animate towards -20px to cover padding
                        borderRadius: `${32 * p}px`
                    });
                } else {
                    const currentP = p; 
                    gsap.set(containerRef.current, {
                        width: `calc(100% - ${40 * currentP}px)`,
                        height: `calc(100vh - ${(PADDING_TOP + BOTTOM_OFFSET) * currentP}px)`,
                        marginLeft: `${20 * currentP}px`,
                        marginRight: `${20 * currentP}px`,
                        marginBottom: `${BOTTOM_OFFSET * currentP}px`,
                        marginTop: `-${PADDING_TOP * (1 - currentP)}px`, // 0 when p=1, -20 when p=0
                        borderRadius: `${32 * currentP}px`
                    });
                }
            }
        });
    });

  }, [isLoaded]);

  return (
    <div ref={wrapperRef} className="relative w-full h-screen z-0 bg-white pt-[20px]" data-theme="dark"> 
      
      {/* Loader Overlay - Completely Independent Black Background */}
      <div ref={loaderOverlayRef} className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <Loader text="Artur Zhukov" />
      </div>

      {/* The Black Card Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full bg-black overflow-hidden flex flex-col justify-between shadow-2xl z-10"
        style={{ willChange: 'width, height, margin, borderRadius' }}
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            
            <video
                ref={videoRef}
                src={VIDEO_PATH}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover opacity-[0.85] pointer-events-none"
            />
            
            {/* 
                Overlay:
                Kept existing overlay. Combined with opacity-0.85 on the video, this will be quite dark.
                If you want the video brighter, adjust the opacity below (e.g. bg-black/40).
            */}
            <div className="absolute inset-0 bg-black/80 z-10"></div>
            
            {/* Noise Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-20"></div>
        </div>

        {/* Hero Content */}
        {/* FIX VISUALS: opacity-0 initially handled by ref animation */}
        <div ref={heroContentRef} className="relative z-30 w-full h-full flex flex-col justify-between p-8 md:p-16 text-white opacity-0">
          
          {/* Top Spacer */}
          <div></div>

          {/* Center/Main Content */}
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-7xl font-medium leading-[1.05] tracking-tightest text-white mb-8">
              {/* FIX ANIMATION: overflow-hidden added to hide text before reveal */}
              <div className="overflow-hidden pb-2 -mb-2"><span className="block reveal-text opacity-0">Redefining products,</span></div>
              <div className="overflow-hidden pb-2 -mb-2"><span className="block reveal-text opacity-0">fighting for users, delivering</span></div>
              <div className="overflow-hidden pb-2 -mb-2"><span className="block reveal-text opacity-0">excellence in all ways.</span></div>
            </h1>
            <div className="overflow-hidden pb-2 -mb-2">
                <p className="reveal-text opacity-0 text-xl md:text-2xl text-gray-400 font-light tracking-tight max-w-2xl">
                Defining legacy in digital products, on and off the screen.
                </p>
            </div>
          </div>

          {/* Bottom Metadata */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0">
            <div className="flex flex-col gap-1">
              <div className="overflow-hidden pb-1"><h2 className="reveal-text opacity-0 text-2xl md:text-3xl font-medium tracking-tight">Artur Zhukov</h2></div>
              {/* FIX CONTENT: Updated text for better width */}
              <div className="overflow-hidden pb-1"><span className="reveal-text opacity-0 text-gray-400 text-lg">Senior Product Designer</span></div>
            </div>

            {/* Right Side: Location + Arrow */}
            <div ref={arrowRef} className="flex flex-col items-center gap-4 opacity-0 self-center md:self-auto">
               <span className="text-center text-lg text-white font-light tracking-wide">Tallinn, Estonia</span>
               <div className="arrow-icon w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white cursor-pointer">
                  <ArrowDown size={24} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};