import React from 'react';
import { 
  Waves, 
  Home, 
  Utensils, 
  TreePine, 
  Baby, 
  Flame, 
  Compass, 
  Trees, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';

export default function AmenitiesSection() {
  const amenities = [
    {
      icon: (
        <svg className="w-8 h-8 text-amber-200 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 18c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2" />
          <path d="M2 21c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2" />
          <path d="M6 12V4c0-1.1.9-2 2-2s2 .9 2 2v2" />
          <path d="M10 6c0-1.1.9-2 2-2s2 .9 2 2v6" />
        </svg>
      ),
      label: "Infinity Pool",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-200 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 10L12 3l9 7v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10z" />
          <path d="M9 21V12h6v9" />
          <rect x="6" y="10" width="3" height="3" rx="0.5" />
          <rect x="15" y="10" width="3" height="3" rx="0.5" />
        </svg>
      ),
      label: "Clubhouse",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-200 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 2v20M18 2a4 4 0 00-4 4v4a4 4 0 004 4M6 2v7a3 3 0 006 0V2M9 12v10" />
        </svg>
      ),
      label: "Restaurant",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-200 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L7 10h3l-4 7h12l-4-7h3z" />
          <path d="M6 8l-3 5h2l-3 5h8" />
          <path d="M12 17v5" />
        </svg>
      ),
      label: "Nature Trails",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-200 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21v-2a7 7 0 0114 0v2" />
        </svg>
      ),
      label: "Kids Area",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-200 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3c0 4.5-6 6.5-6 11a6 6 0 0012 0c0-4.5-6-6.5-6-11z" />
          <path d="M4 19l16 2M20 19L4 21" />
        </svg>
      ),
      label: "Bonfire Area",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-200 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L3 21h18L12 2z" />
          <path d="M12 9v5M12 17h.01" />
        </svg>
      ),
      label: "Adventure Zone",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-200 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 14a5 5 0 118 0 5 5 0 01-8 0z" />
          <path d="M12 14v6M10 20h4" />
        </svg>
      ),
      label: (
        <>
          Open Green <br /> Spaces
        </>
      ),
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-200 stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
      label: (
        <>
          Security <br /> 24x7
        </>
      ),
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-full border-2 border-amber-200 flex items-center justify-center font-serif text-amber-200 text-lg font-normal">
          P
        </div>
      ),
      label: "Parking",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 font-serif">
      <div className="bg-[#0B2314] rounded-3xl overflow-hidden shadow-2xl border border-[#173822] grid grid-cols-1 lg:grid-cols-12 relative">
        
        {/* Left Side: Amenities Content Grid */}
        <div className="lg:col-span-8 p-6 md:p-10 flex flex-col justify-between">
          
          {/* Header Title with Lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-200/40 to-amber-200/40 flex-1 max-w-[100px]"></div>
            <h2 className="text-amber-100 text-2xl md:text-3xl font-serif tracking-wide font-normal">
              Amenities
            </h2>
            <div className="h-[1px] bg-gradient-to-l from-transparent via-amber-200/40 to-amber-200/40 flex-1 max-w-[100px]"></div>
          </div>

          {/* 5x2 Grid with Inner Divider Borders */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-8 gap-x-2 text-center relative">
            {amenities.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center space-y-3 px-2 relative group"
              >
                {/* Gold Thin Divider Lines Between Grid Items */}
                {index % 5 !== 4 && (
                  <div className="hidden sm:block absolute right-0 top-2 bottom-2 w-[1px] bg-amber-200/15"></div>
                )}
                {index < 5 && (
                  <div className="hidden sm:block absolute bottom-[-16px] left-2 right-2 h-[1px] bg-amber-200/15"></div>
                )}

                <div className="transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="text-amber-100/90 text-xs md:text-sm font-sans font-light leading-snug">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image Banner with Curved Border */}
        <div 
          className="lg:col-span-4 relative min-h-[360px] bg-cover bg-center p-8 flex flex-col justify-between text-white rounded-t-3xl lg:rounded-t-none lg:rounded-l-[40px] overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%), url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000')`
          }}
        >
          {/* Subtle Ambient Vignette Overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

          <div className="relative z-10 pt-4">
            <p className="text-amber-200/90 text-xs font-sans tracking-widest uppercase mb-1">
              Designed For
            </p>
            <h3 className="text-3xl md:text-4xl font-serif text-white font-normal leading-tight">
              Nature. Luxury.<br />
              <span className="italic font-light">Investment.</span>
            </h3>
          </div>

          <div className="relative z-10 pb-2">
            <button className="bg-black/40 hover:bg-black/60 border border-amber-200/40 text-amber-100 text-xs font-sans px-5 py-2.5 rounded-full font-medium tracking-wider flex items-center gap-2 transition cursor-pointer backdrop-blur-md">
              LEARN MORE
              <ChevronRight className="w-3.5 h-3.5 text-amber-200" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}