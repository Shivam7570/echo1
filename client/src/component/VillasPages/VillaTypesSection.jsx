import React, { useState } from 'react';
import { Square, Sparkles, X } from 'lucide-react';

import resort1Layout1 from "../../assets/villalayout1.jpg";
import resort1Layout2 from "../../assets/villalayout2.jpg";
import resort1Layout3 from "../../assets/villalayout3.jpg";
import resort1Layout4 from "../../assets/villalayout4.jpg";

export default function VillaTypesSection() {
    // State to handle full-screen image modal preview
    const [selectedImage, setSelectedImage] = useState(null);

    const villaTypes = [
        {
            id: 1,
            badge: 'Lily Haven Villas',
            heroImage: 'https://images.pexels.com/photos/14658637/pexels-photo-14658637.jpeg',
            layoutImage: resort1Layout1,
            area: '126 sq. yrd.',
            villaSizeRange: 'Customizable build options'
        },
        {
            id: 2,
            badge: 'Azalea Retreat Villas',
            heroImage: 'https://images.pexels.com/photos/24807128/pexels-photo-24807128.jpeg',
            layoutImage: resort1Layout2,
            area: '145 sq. yrd.',
            villaSizeRange: 'Customizable build options'
        },
        {
            id: 3,
            badge: 'Lotus Signature Villas',
            heroImage: 'https://images.pexels.com/photos/15531226/pexels-photo-15531226.jpeg',
            layoutImage: resort1Layout3,
            area: '188 sq. yrd.',
            villaSizeRange: 'Customizable build options'
        },
        {
            id: 4,
            badge: 'Orchid Grand Villas',
            heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
            layoutImage: resort1Layout4,
            area: '220 sq. yrd.',
            villaSizeRange: 'Customizable build options'
        },
    ];

    return (
        <div id="villa-types" className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans p-4 md:p-8 flex flex-col justify-between scroll-mt-20">
            <div className="max-w-7xl mx-auto w-full space-y-6">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-5xl font-serif text-[#1C3026] tracking-wider font-bold uppercase">
                        VILLA TYPES
                    </h1>

                    {/* Decorative Divider */}
                    <div className="flex items-center justify-center space-x-2 text-amber-600/70">
                        <span className="h-[1px] w-12 bg-amber-600/30"></span>
                        <span className="text-xs">❖</span>
                        <span className="h-[1px] w-12 bg-amber-600/30"></span>
                    </div>

                    <p className="text-xs md:text-sm text-slate-700 tracking-wide font-medium">
                        Four Distinct Architectural Masterpieces Designed for Luxurious Living.
                    </p>
                </div>

                {/* 4 Column Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {villaTypes.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#F3EEE5] rounded-xl p-4 border border-amber-900/10 shadow-sm flex flex-col space-y-3.5"
                        >
                            {/* Badge */}
                            <div className="flex justify-center">
                                <span className="bg-[#1C3026] text-white text-[11px] font-semibold tracking-wider px-4 py-1 rounded-full uppercase shadow-xs">
                                    {item.badge}
                                </span>
                            </div>

                            {/* Main Exterior Image (Clickable) */}
                            <div
                                className="h-36 rounded-lg overflow-hidden border border-stone-300 cursor-pointer relative group"
                                onClick={() => setSelectedImage({ url: item.heroImage, title: `${item.badge} - Exterior` })}
                            >
                                <img
                                    src={item.heroImage}
                                    alt={item.badge}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                                    Click to view
                                </div>
                            </div>

                            {/* Layout Plan Section (Clickable) */}
                            <div className="space-y-1">
                                <h4 className="text-[10px] font-bold text-[#1C3026] tracking-wider uppercase">
                                    LAYOUT PLAN
                                </h4>
                                <div
                                    className="h-28 rounded-lg overflow-hidden border border-stone-300 bg-emerald-900/10 p-1 cursor-pointer relative group"
                                    onClick={() => setSelectedImage({ url: item.layoutImage, title: `${item.badge} - Layout Plan` })}
                                >
                                    <img
                                        src={item.layoutImage}
                                        alt={`${item.badge} Layout`}
                                        className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium rounded">
                                        Click to view
                                    </div>
                                </div>
                            </div>

                            {/* Villa Size Range Section */}
                            <div className="space-y-1.5 pt-2 border-t border-amber-900/10">
                                <h4 className="text-[10px] font-bold text-[#1C3026] tracking-wider uppercase">
                                    VILLA SIZE RANGE
                                </h4>
                                <div className="space-y-1 text-xs text-slate-800 font-medium">
                                    <div className="flex items-center space-x-1.5">
                                        <Square className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                                        <span>{item.area}</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-700">
                                        <span>{item.villaSizeRange}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Footer Bar */}
                <div className="bg-[#1C3026] rounded-xl p-3.5 px-6 flex flex-col md:flex-row items-center justify-between text-white text-xs gap-2">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="font-medium tracking-wide">
                            Own a Luxury Villa. Experience Unmatched Privacy & Elegance.
                        </span>
                    </div>

                    <div className="flex items-center space-x-3 text-amber-300/90 text-[11px] font-light">
                        <span>Freehold Ownership</span>
                        <span>•</span>
                        <span>Investment Opportunity</span>
                        <span>•</span>
                        <span>Rental Management</span>
                    </div>
                </div>

            </div>

            {/* Full-Screen Image Lightbox Modal with high contrast styling */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-5xl w-full bg-[#14221b] rounded-2xl p-5 overflow-hidden shadow-2xl border border-amber-500/40"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-500/20 text-white">
                            <h3 className="text-base md:text-lg font-serif tracking-wider text-amber-300">
                                {selectedImage.title}
                            </h3>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="p-2 rounded-full bg-white/10 hover:bg-amber-600 text-white transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="max-h-[80vh] overflow-auto rounded-xl bg-stone-950/70 p-2 flex items-center justify-center border border-white/10">
                            <img
                                src={selectedImage.url}
                                alt="Full Size Preview"
                                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}