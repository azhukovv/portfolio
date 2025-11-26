import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExperienceItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences: ExperienceItem[] = [
    {
      id: 1,
      company: "Tickmill",
      description: "Trading 600+ global financial markets.",
      role: "Senior Product Designer",
      period: "2022 – Present",
      link: "https://www.tickmill.com/"
    },
    {
      id: 2,
      company: "Wallester",
      description: "Next-gen card issuance platform.",
      role: "Senior Product Designer",
      period: "2019 – 2022",
      link: "https://wallester.com/business"
    },
    {
      id: 3,
      company: "Datashift",
      description: "Top-tier full-cycle digital agency.",
      role: "Senior Designer",
      period: "2018 – 2022",
      link: "https://datashift.ee/"
    }
  ];

const RESUME_PATH = "/assets/A.Zhukov_Resume.pdf"; 

export const About: React.FC = () => {
  const containerRef = useRef(null);

  // Helper to split text into words for natural wrapping + animation
  const splitTextToWords = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="inline-block overflow-hidden pb-1 -mb-1 align-top">
        <span className="anim-word block origin-top-left">{word}&nbsp;</span>
      </span>
    ));
  };

  useGSAP(() => {
    // Animate Words (Batch for performance)
    const words = gsap.utils.toArray('.anim-word');
    ScrollTrigger.batch(words as any[], {
        onEnter: (elements) => {
            gsap.fromTo(elements, 
                { y: '100%' },
                {
                    y: '0%',
                    duration: 0.8,
                    stagger: 0.01,
                    ease: "power3.out",
                    overwrite: true
                }
            );
        },
        onLeaveBack: (elements) => {
             gsap.set(elements, { y: '100%' });
        },
        start: "top 95%",
    });

    // Animate Experience Rows
    const rows = gsap.utils.toArray('.exp-row');
    rows.forEach((row: any) => {
        gsap.fromTo(row,
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: row,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        )
    });

    // Animate Experience Button
    const btn = containerRef.current?.querySelector('.exp-btn');
    if (btn) {
        gsap.fromTo(btn,
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: btn,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        )
    }
    
    // Animate Section Title
    const title = containerRef.current?.querySelector('.anim-title');
    if(title) {
        gsap.fromTo(title,
            { y: '100%' },
            {
                y: '0%',
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title.parentElement,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                }
            }
        )
    }

  }, { scope: containerRef });

  const handleReadExperience = () => {
    window.open(RESUME_PATH, '_blank');
  };

  const headline = "It doesn't matter where you start, it's how you progress";
  const bodyText = `Since my first design project in 2013, I've worked tirelessly to master the craft. From early Photoshop sites to architecting digital products, apps, flexible design systems, and brands. Every step is driven by professional growth, sincere curiosity, and the constant question "How i can make this better?"`;

  return (
    <section 
        id="about-section" 
        data-theme="light"
        ref={containerRef} 
        className="relative w-full py-16 md:py-40 px-5 md:px-10 bg-white text-black z-10"
    >
      {/* ABOUT PART */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-40 mb-16 md:mb-40">
        <div className="w-full md:w-1/3 overflow-hidden pb-1">
           <h2 className="anim-title block text-sm font-medium uppercase tracking-widest text-gray-400">The Discipline</h2>
        </div>
        
        <div className="w-full md:w-2/3">
          <div className="w-full">
            {/* Headline */}
            <h3 className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tightest mb-8 md:mb-12 text-black flex flex-wrap">
                {splitTextToWords(headline)}
            </h3>
            
            {/* Body Text */}
            <div className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light flex flex-wrap md:leading-10">
                {splitTextToWords(bodyText)}
            </div>
          </div>
        </div>
      </div>

      {/* EXPERIENCE PART */}
      <div className="max-w-7xl mx-auto">
         <div className="mb-8 md:mb-16 border-b border-gray-100 pb-6 md:pb-8 overflow-hidden pb-1">
             <h2 className="anim-title block text-sm font-medium uppercase tracking-widest text-gray-400">Experience</h2>
        </div>
        <div className="flex flex-col">
          {experiences.map((item) => (
            <a 
              key={item.id} 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-row group relative flex flex-col md:flex-row items-baseline md:items-center justify-between py-6 md:py-10 border-b border-gray-100 transition-all duration-500 hover:px-8 hover:bg-gray-50 -mx-4 px-4 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 flex-1">
                <div className="overflow-hidden pb-1"><h3 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">{item.company}</h3></div>
                <div className="overflow-hidden pb-1"><span className="block text-gray-500 font-light text-lg max-w-md">{item.description}</span></div>
              </div>

              <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                    <div className="overflow-hidden pb-1"><div className="text-black font-medium text-lg">{item.role}</div></div>
                    <div className="overflow-hidden pb-1"><div className="text-gray-400 text-sm">{item.period}</div></div>
                </div>

                {/* Black Icon Button with White Arrow */}
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-45">
                    <ArrowUpRight size={20} />
                </div>
              </div>
            </a>
          ))}

          {/* Read Experience Button */}
          <div className="exp-btn mt-8 md:mt-12 w-full flex justify-center">
             <button 
                onClick={handleReadExperience}
                className="group relative flex items-center justify-center gap-3 px-8 h-[56px] w-full md:w-auto bg-black text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 border border-transparent"
            >
                <span className="relative z-10 text-[16px] font-medium text-white">Read Experience</span>
                <ArrowUpRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};