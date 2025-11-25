import React from 'react';
// import { ExperienceItem } from '../types'; // Определим интерфейс внутри, чтобы код был автономным
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// Определяем интерфейс здесь для надежности
interface ExperienceItem {
  id: number;
  company: string;
  description: string;
  role: string;
  period: string;
  link: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Tickmill",
    description: "Global FinTech excellence",
    role: "Senior Product Designer",
    period: "2022 – Present",
    link: "https://www.tickmill.com/"
  },
  {
    id: 2,
    company: "Wallester",
    description: "Payment innovation at speed",
    role: "Senior Product Designer",
    period: "2019 – 2022",
    link: "https://wallester.com/business"
  },
  {
    id: 3,
    company: "DataShift",
    description: "Full-cycle digital mastery",
    role: "Senior Designer",
    period: "2018 – 2022",
    link: "https://datashift.ee/"
  }
];

export const Experience: React.FC = () => {
  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/artur-zhukov/', '_blank');
  };

  return (
    <section className="w-full py-24 px-10 md:px-16 bg-white text-black relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 border-b border-gray-200 pb-8">
             <h2 className="text-sm font-medium uppercase tracking-widest text-gray-400">Experience</h2>
        </div>

        <div className="flex flex-col">
          {experiences.map((item) => (
            <a 
              key={item.id} 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col md:flex-row items-baseline md:items-center justify-between py-12 border-b border-gray-100 transition-all duration-500 hover:px-8 hover:bg-gray-150 -mx-4 px-4 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 flex-1">
                <h3 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">{item.company}</h3>
                <span className="text-gray-500 font-light text-lg">{item.description}</span>
              </div>

              <div className="flex items-center gap-12 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                    <div className="text-black font-medium text-lg">{item.role}</div>
                    <div className="text-gray-400 text-sm">{item.period}</div>
                </div>
                
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-black transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:border-black">
                  <ArrowRight size={20} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};