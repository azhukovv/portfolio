import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectItem } from '../types';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Hoole",
    category: "Healthcare Humanizing the medical experience.",
    // Just the filename; code will prepend "img/"
    image: "hoole-cover.webp", 
    description: "Hoole reimagines the healthcare experience by bridging the gap between patients and providers.",
    subtitle: "Healthcare Ecosystem Branding & Product",
    year: "2021–2024",
    tags: "Branding / Product Design / Design System",
    role_detail: "Senior Product Designer",
    team: "Founders, Managers, Developers"
  },
  {
    id: 2,
    title: "eTEU",
    category: "Logistics Digitizing the future of shipping.",
    // Just the filename; code will prepend "img/"
    image: "eteu-cover.webp",
    description: "eTEU leverages blockchain technology to fully digitize shipping documentation.",
    subtitle: "Design Platform for Internatioаnal Shipping Electronic Documents",
    year: "2019–2020",
    tags: "B2B / Website / UI-Kit / Product Design",
    role_detail: "Product Designer",
    team: "Product Lead, Developers, Product Designers"
  }
];

export const Work: React.FC = () => {
  const containerRef = useRef(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useGSAP(() => {
    // Text reveal animation (Main Page)
    // UPDATED: Trigger on container entry immediately so text is visible when block appears
    const texts = gsap.utils.toArray('.work-anim');
    texts.forEach((text: any) => {
        gsap.fromTo(text, 
            { y: '100%' },
            {
                y: '0%',
                duration: 0.6, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current, // Trigger based on the Section Container
                    start: "top bottom", // Starts as soon as section enters viewport
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Section Entrance Animation (Parallax Slide Over)
    gsap.fromTo(containerRef.current,
        { y: '20vh' }, 
        { 
            y: 0, 
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "top 20%",
                scrub: true
            }
        }
    );

  }, { scope: containerRef });

  // Animation for Opening Overlay & Scrolling inside it
  useGSAP(() => {
    if (selectedProject && overlayRef.current && scrollContainerRef.current) {
        // 1. Open Modal (Slide Up)
        gsap.fromTo(overlayRef.current,
            { opacity: 0, y: '100%' },
            { opacity: 1, y: '0%', duration: 0.5, ease: "expo.out" } // Accelerated from 0.8
        );

        // 2. Animate "Hero" content (Header, Title, etc.) immediately
        const heroElements = overlayRef.current.querySelectorAll('.anim-hero');
        if (heroElements.length > 0) {
            gsap.fromTo(heroElements,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.2, ease: "power3.out" } // Faster, less delay
            );
        }

        // 3. Animate "Scroll" content (Body text, images) on scroll within the modal
        const scrollElements = gsap.utils.toArray('.anim-scroll');
        scrollElements.forEach((el: any) => {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5, // Faster from 0.8
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        scroller: scrollContainerRef.current, // Important: Watch scroll inside the overlay, not window
                        start: "top bottom-=50", // Trigger slightly earlier
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const handleClose = () => {
    if (overlayRef.current) {
        gsap.to(overlayRef.current, {
            y: '100%',
            duration: 0.4, // Faster close
            ease: "power3.in",
            onComplete: () => setSelectedProject(null)
        });
    }
  };

  return (
    <>
        {/* 
            Container:
            - Reduced padding for mobile: py-12 md:py-32
            - Adjusted negative margin: -mt-12 md:-mt-24
            - Smaller border radius on mobile: rounded-t-[32px] md:rounded-t-[48px]
        */}
        <section ref={containerRef} className="relative w-full mx-auto md:mx-0 py-12 md:py-32 h-auto bg-obsidian text-white z-30 shadow-2xl rounded-t-[32px] md:rounded-t-[48px] -mt-12 md:-mt-24 flex flex-col">
        
        {/* 
            Inner Content:
            - px-5: Use standard 20px padding (matching Header/About)
        */}
        <div className="px-5 md:px-10 max-w-7xl mx-auto w-full h-full flex flex-col">
            {/* Header Style */}
            <div className="mb-6 md:mb-16 flex justify-between items-end border-b border-white/10 pb-6 md:pb-8 shrink-0">
                <div className="overflow-hidden pb-1">
                    <h2 className="work-anim text-3xl md:text-4xl font-bold uppercase tracking-tightest text-white">WORK</h2>
                </div>
                <div className="hidden md:block overflow-hidden pb-1"><div className="work-anim text-gray-500 text-sm">2019–2023</div></div>
            </div>

            {/* 
               Mobile Layout Update:
               - -mr-5: Negative margin matches the parent padding (px-5) to bleed to the right edge.
               - pr-5: Padding right to keep the last card from touching the edge.
               - ml-0/pl-0: Ensure strictly no left bleed to maintain hard alignment with the "WORK" header.
            */}
            <div 
                className="flex md:grid md:grid-cols-2 gap-2 md:gap-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-10 md:pb-0 h-auto items-stretch -mr-5 pr-5 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none' }}
            >
            {projects.map((project) => (
                <div 
                    key={project.id} 
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer w-[75vw] md:w-auto snap-start shrink-0 flex flex-col h-full"
                >
                    {/* Image Container with Hover Arrow */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-6 md:mb-8 bg-gray-900 border border-white/5 shrink-0">
                         {

                         }<img 
                            src={`/assets/${project.image}`} 
                            alt={project.title} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            onError={(e) => {
                                e.currentTarget.style.display = 'none'; // Hide broken image
                                // Optional: Show a fallback text if image is missing
                               // e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                               // const textNode = document.createElement('div');
                               // textNode.className = "text-gray-700 text-sm uppercase tracking-widest font-medium p-4 text-center";
                               // textNode.innerText = `${project.title} Image`;
                                //e.currentTarget.parentElement?.appendChild(textNode);
                            }}
                         />

                        {/* Hover Arrow Overlay */}
                        <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 z-10">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col gap-2 border-t border-white/10 pt-4 md:pt-6 flex-grow">
                        <div className="overflow-hidden pb-2 -mb-2 flex items-center gap-4">
                            <h3 className="work-anim text-3xl md:text-5xl font-medium tracking-tightest text-white group-hover:text-gray-300 transition-colors">{project.title}</h3>
                        </div>
                        <div className="overflow-hidden pb-1">
                            <p className="work-anim text-gray-400 text-base md:text-xl font-light leading-snug">
                                {project.category}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
        </section>
        
        {/* ... Overlay Content ... */}
        {selectedProject && (
            <div 
                ref={overlayRef} 
                className="fixed inset-0 z-[999] bg-obsidian text-white overflow-y-auto"
            >
                {/* 
                    Fixed Header with Back Button 
                    UPDATED: bg-obsidian/40 and backdrop-blur-xl for glass effect
                */}
                <div className="sticky top-0 left-0 w-full px-6 md:px-8 pt-[80px] pb-4 bg-obsidian/50 backdrop-blur-xl z-50 border-b border-white/5 transition-all">
                     <button 
                        onClick={handleClose} 
                        className="anim-hero flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="text-lg">Back to works</span>
                    </button>
                </div>

                {/* Scrollable Content Area */}
                <div ref={scrollContainerRef} className="w-full min-h-screen">
            <div className="w-full max-w-5xl mx-auto px-5 md:px-10 py-10 md:py-20">
                
                {/* Common Header Structure */}
                <div className="mb-12 md:mb-16">
                    <h1 className="anim-hero text-5xl md:text-8xl font-bold tracking-tightest mb-4">{selectedProject.title}</h1>
                    {selectedProject.subtitle && (
                        <h2 className="anim-hero text-xl md:text-3xl text-gray-400 font-light max-w-2xl leading-tight">
                            {selectedProject.subtitle}
                        </h2>
                    )}
                    <div className="anim-hero mt-6 text-sm font-mono text-gray-500 uppercase tracking-widest">
                        {selectedProject.tags}
                    </div>
                </div>

                        {/* Common Meta Grid */}
                        <div className="anim-hero grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-white/10 py-8 mb-16">
                            <div>
                                <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Role</h3>
                                <p className="text-lg">{selectedProject.role_detail}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Team</h3>
                                <p className="text-lg">{selectedProject.team}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Year</h3>
                                <p className="text-lg">{selectedProject.year}</p>
                            </div>
                        </div>

                        {/* ---------------- PROJECT SPECIFIC CONTENT ---------------- */}
                        
                        {selectedProject.id === 1 && (
                            // HOOLE CUSTOM LAYOUT
                            <div className="flex flex-col gap-16 md:gap-20">
                                
                                {/* Context */}
                                <div className="anim-scroll flex flex-col md:flex-row gap-6 md:gap-10">
                                    <div className="w-full md:w-1/3">
                                        <h3 className="text-xl font-medium">Context</h3>
                                    </div>
                                    <div className="w-full md:w-2/3 text-gray-300 text-lg font-light leading-relaxed space-y-6">
                                        <p>
                                            Hoole started as a vaccination and medical checkup service but gradually evolved into a full healthcare ecosystem. 
                                            I was involved at several stages: first for rebranding in 2021, and later for digital product design in 2023.
                                        </p>
                                    </div>
                                </div>

                                {/* Branding Work */}
                                <div className="anim-scroll flex flex-col md:flex-row gap-6 md:gap-10">
                                    <div className="w-full md:w-1/3">
                                        <h3 className="text-xl font-medium">Branding Work</h3>
                                    </div>
                                    <div className="w-full md:w-2/3 text-gray-300 text-lg font-light leading-relaxed space-y-6">
                                        <p>
                                            In 2021, I developed a new visual identity for Hoole. We moved from a generic logo and random colors to a system based on care and technological innovation. 
                                            The new brand received positive feedback, clients noted it looked modern and inspired trust.
                                        </p>
                                    </div>
                                </div>

                                {/* IMAGE: BRANDING */}
                                <div className="anim-scroll w-full aspect-video  rounded-xl flex items-center justify-center relative overflow-hidden group">
                                    { <img src="/assets/branding-hoole.webp" alt="Hoole Branding" className="w-full h-auto block"></img>}
                                   
                                </div>

                                {/* Platform Design */}
                                <div className="anim-scroll flex flex-col md:flex-row gap-6 md:gap-10">
                                    <div className="w-full md:w-1/3">
                                        <h3 className="text-xl font-medium">Platform Design</h3>
                                    </div>
                                    <div className="w-full md:w-2/3 text-gray-300 text-lg font-light leading-relaxed space-y-6">
                                        <p>
                                            In 2023, I was invited back to Hoole, this time to design their digital platform. By then, the company had an MVP that had gathered substantial user feedback.
                                        </p>
                                        <p>
                                            I started by analyzing feedback and interviewing new corporate clients. We identified key pain points: confusing interface, unclear booking process, and difficulty finding needed services.
                                        </p>
                                        <p>
                                            A particular challenge was the B2B version — designing a system where multiple employees could easily schedule appointments during specific time periods without creating scheduling conflicts.
                                        </p>
                                        <div>
                                            <p className="mb-2 font-medium text-white">Based on this research, I designed:</p>
                                            <ul className="list-disc list-outside ml-5 space-y-2 text-gray-400">
                                                <li>A new client portal version with simplified navigation</li>
                                                <li>An improved booking process for corporate clients</li>
                                                <li>A design system with semantic tokens for all ecosystem products</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* IMAGES: INTERFACE */}
                                <div className="anim-scroll grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="aspect-[4/3] rounded-xl flex items-center justify-center relative overflow-hidden">
                                        {<img src="/assets/hoole-booking.webp" alt="B2B Booking" className="absolute inset-0 w-full h-full object-cover" />}
                                    </div>
                                    <div className="aspect-[4/3] rounded-xl flex items-center justify-center relative overflow-hidden">
                                        { <img src="/assets/hoole-cover.webp" alt="Portal" className="absolute inset-0 w-full h-full object-cover scale-150" />}
                                
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="anim-scroll flex flex-col md:flex-row gap-6 md:gap-10">
                                    <div className="w-full md:w-1/3">
                                        <h3 className="text-xl font-medium">Results</h3>
                                    </div>
                                    <div className="w-full md:w-2/3 text-gray-300 text-lg font-light leading-relaxed space-y-6">
                                        <p>After the update:</p>
                                        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-400">
                                            <li>Time to market for new features reduced from 3 months to 3 weeks</li>
                                            <li className="text-white font-medium">Client and Employee satisfaction scores surged by 90%</li>
                                            <li>Service bookings grew by 56%</li>
                                        </ul>
                                        <p className="mt-4">
                                            Clients noted that the product genuinely cares for them, from personalized doctor recommendations to the well-thought-out booking process.
                                        </p>
                                    </div>
                                </div>

                                {/* Current Work */}
                                <div className="anim-scroll flex flex-col md:flex-row gap-6 md:gap-10 pb-20">
                                    <div className="w-full md:w-1/3">
                                        <h3 className="text-xl font-medium">Current Work</h3>
                                    </div>
                                    <div className="w-full md:w-2/3 text-gray-300 text-lg font-light leading-relaxed space-y-6">
                                        <p>
                                            I continue to develop the Hoole ecosystem, including modernizing the admin panel, launching new medical services, and integrating with partners. 
                                            This project provided valuable experience in designing complex booking systems for the B2B segment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedProject.id === 2 && (
                            // eTEU CUSTOM LAYOUT
                            <div className="flex flex-col gap-12 md:gap-16">
                                
                                {/* Context */}
                                <div className="anim-scroll flex flex-col md:flex-row gap-6 md:gap-10">
                                    <div className="w-full md:w-1/3">
                                        <h3 className="text-xl font-medium">Context and Project Essence</h3>
                                    </div>
                                    <div className="w-full md:w-2/3 text-gray-300 text-lg font-light leading-relaxed space-y-6">
                                        <p>
                                            eTEU is a London-based company solving fundamental problems in international shipping. 
                                            Paper bills of lading took 3-5 days and cost up to $100, creating bottlenecks in logistics chains. 
                                            The platform used blockchain for instant document transfers at $1, replacing weeks of paperwork with a digital solution.
                                        </p>
                                    </div>
                                </div>

                                {/* My Role */}
                                <div className="anim-scroll flex flex-col md:flex-row gap-6 md:gap-10">
                                    <div className="w-full md:w-1/3">
                                        <h3 className="text-xl font-medium">My Role</h3>
                                    </div>
                                    <div className="w-full md:w-2/3 text-gray-300 text-lg font-light leading-relaxed space-y-6">
                                        <p>
                                            I was invited as the first designer on the project. At that time, there was no ready design in Figma, so I built the foundation from scratch.
                                        </p>
                                        <div>
                                            <p className="mb-2 font-medium text-white">Key tasks:</p>
                                            <ul className="list-disc list-outside ml-5 space-y-2 text-gray-400">
                                                <li>Designed interfaces for creating and editing documents</li>
                                                <li>Developed the master document — the foundation for generating subsequent files</li>
                                                <li>Created a monitoring system with status tables</li>
                                                <li>Implemented functionality for downloading completed documents</li>
                                            </ul>
                                        </div>
                                        <p>After successful acceptance of my design, I also assisted with the marketing website and presentation styling.</p>
                                    </div>
                                </div>

                                {/* IMAGE: INTERFACE */}
                                <div className="anim-scroll w-full aspect-video bg-gray-900 border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden group">
                                    { <img src="/assets/eteu-master.webp" alt="Interface" className="absolute inset-0 w-full h-full object-cover" />}
                                </div>

                                {/* Solution */}
                                <div className="anim-scroll flex flex-col md:flex-row gap-6 md:gap-10">
                                    <div className="w-full md:w-1/3">
                                        <h3 className="text-xl font-medium">Solution and Process</h3>
                                    </div>
                                    <div className="w-full md:w-2/3 text-gray-300 text-lg font-light leading-relaxed space-y-6">
                                        <p>
                                            Began by analyzing existing B2B platforms and deep diving into the domain with the Product Lead. 
                                            We thoroughly discussed workflows of logistics specialists and freight forwarders to ensure the interface solved real user problems.
                                        </p>
                                        <div>
                                            <p className="mb-2 font-medium text-white">Based on this, I designed:</p>
                                            <ul className="list-disc list-outside ml-5 space-y-2 text-gray-400">
                                                <li>Key screens and flows for creating, editing, and monitoring documents</li>
                                                <li>Typography, grid system, and color palette</li>
                                                <li>Basic UI-kit components to ensure consistency</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* IMAGES: UI KIT & FLOW */}
                                <div className="anim-scroll grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="aspect-[4/3] bg-gray-900 border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                                        {<img src="/assets/eteu-uikit.webp" alt="UI Kit" className="absolute inset-0 w-full h-full object-cover" /> }
                                    </div>
                                    <div className="aspect-[4/3] bg-gray-900 border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                                        { <img src="/assets/eteu-cover.webp" alt="Flow" className="absolute inset-0 w-full h-full scale-150 object-cover" />}
                                    </div>
                                </div>

                                {/* Results & Learnings */}
                                <div className="anim-scroll flex flex-col md:flex-row gap-6 md:gap-10 pb-20">
                                    <div className="w-full md:w-1/3">
                                        <h3 className="text-xl font-medium">Results & Key Learnings</h3>
                                    </div>
                                    <div className="w-full md:w-2/3 text-gray-300 text-lg font-light leading-relaxed space-y-6">
                                        <div>
                                            <h4 className="text-white font-medium mb-2">Results</h4>
                                            <p>
                                                Prepared and handed off mockups of key platform sections to development. 
                                                The established foundation enabled other designers to continue product development and helped the team secure initial investors.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium mb-2">Learnings</h4>
                                            <p>
                                                Gained valuable experience working on a complex B2B product in an unfamiliar domain. 
                                                Learned that even in innovative projects with deep technology, the key to success lies in focusing on end users' daily tasks. 
                                                A pleasant bonus was the positive feedback from the startup team about my contribution at the initial stage.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
    </>
  );
};