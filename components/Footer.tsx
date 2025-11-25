import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);

        const elements = containerRef.current?.querySelectorAll('.footer-anim');
        elements?.forEach((el) => observer.observe(el));

        return () => {
            elements?.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);

    const handleLinkedInClick = () => {
        window.open('https://www.linkedin.com/in/artur-zhukov/', '_blank');
    };

    return (
        <footer ref={containerRef} className="w-full bg-obsidian px-5 pb-5 pt-5 z-30 relative">
            <style>{`
                .footer-anim {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 1s ease-out, transform 1s cubic-bezier(0.215, 0.610, 0.355, 1.000);
                }
                .footer-anim.is-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>

            <div id="footer-card" className="w-full bg-white rounded-[32px] overflow-hidden flex flex-col md:flex-row md:items-stretch md:min-h-[20ox]">
                
                {/* --- LEFT SIDE: TEXT --- 
                    Mobile: order-2 (goes below video)
                    Desktop: order-1 (goes left)
                */}
                <div className="flex flex-col justify-between items-center md:items-start text-center md:text-left w-full md:w-1/2 order-2 md:order-1 p-4 py-4 md:p-16">
                    <div className="w-full">
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tightest text-black mb-4 md:mb-8 leading-[1.1]">
                            <div className="overflow-hidden pb-2 -mb-2"><span className="block footer-anim">Always bringing</span></div>
                            <div className="overflow-hidden pb-2 -mb-2"><span className="block footer-anim">the best design</span></div>
                            <div className="overflow-hidden pb-2 -mb-2"><span className="block footer-anim">to the table</span></div>
                        </h2>
                        <div className="overflow-hidden mb-8 md:mb-12 pb-1">
                             <p className="footer-anim text-xl md:text-2xl text-gray-500 font-light">
                                Let's create something remarkable together.
                            </p>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-auto">
                        <div className="footer-anim w-full md:w-auto">
                            <button 
                                onClick={handleLinkedInClick}
                                className="group relative flex items-center justify-center md:justify-start gap-3 px-8 h-[56px] w-full md:w-auto bg-black text-white rounded-full transition-all duration-300 hover:scale-105 border border-transparent"
                            >
                                <span className="relative z-10 text-[16px] font-medium text-white whitespace-nowrap">
                                    Connect on LinkedIn
                                </span>
                                <ArrowUpRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDE: VIDEO --- 
                    Mobile: order-1 (goes top), height 200px
                    Desktop: order-2 (goes right), height auto
                */}
                <div className="w-full md:w-1/2 order-1 left-2 md:order-2 relative h-[200px] md:h-auto">
                    <div className="footer-anim w-full h-full delay-100">
                        <div className="w-full h-full bg-gray-100">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover">
                                <source src="assets/footer-video.webm" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};