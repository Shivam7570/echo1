import React, { useState } from 'react';
import { Square, Leaf, X } from 'lucide-react';
import resort1Layout1 from "../../assets/resortLayout1.png";
import resort1Layout2 from "../../assets/resortLayout2.png";


export default function RSection2() {
    // State for image lightbox/modal
    const [selectedImage, setSelectedImage] = useState(null);

    const resortTypes = [
        {
            id: 1,
            badge: 'Deer Meadow Suites',
            heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
            layoutImage: resort1Layout1,
            area: '10,000 sq. ft.',
        },
        {
            id: 2,
            badge: 'RESORT TYPE 2',
            heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=600',
            layoutImage: resort1Layout2,
            area: '15,000 sq. ft.',
        },
        {
            id: 3,
            badge: 'RESORT TYPE 3',
            heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
            layoutImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=600',
            area: '20,000 sq. ft.',
        },
        {
            id: 4,
            badge: 'RESORT TYPE 4',
            heroImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600',
            layoutImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=600',
            area: '25,000 sq. ft.',
        },
        {
            id: 5,
            badge: 'RESORT TYPE 5',
            heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600',
            layoutImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=600',
            area: '30,000 sq. ft.',
        },
    ];

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans p-4 md:p-8 flex flex-col justify-between relative">
            <div className="max-w-7xl mx-auto w-full space-y-6">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-5xl font-serif text-[#1C3026] tracking-wider font-bold">
                        RESORT TYPES
                    </h1>

                    {/* Decorative Divider */}
                    <div className="flex items-center justify-center space-x-2 text-amber-600/70">
                        <span className="h-[1px] w-12 bg-amber-600/30"></span>
                        <span className="text-xs">❖</span>
                        <span className="h-[1px] w-12 bg-amber-600/30"></span>
                    </div>

                    <p className="text-xs md:text-sm text-slate-700 tracking-wide font-medium">
                        Five Exclusive Resort Layouts. One Extraordinary Opportunity.
                    </p>
                </div>

                {/* 5 Column Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {resortTypes.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#F3EEE5] rounded-xl p-3 border border-amber-900/10 shadow-sm flex flex-col space-y-3"
                        >
                            {/* Badge Button */}
                            <div className="flex justify-center">
                                <span className="bg-[#1C3026] text-white text-[10px] font-semibold tracking-wider px-4 py-1 rounded-full uppercase shadow-xs">
                                    {item.badge}
                                </span>
                            </div>

                            {/* Main Exterior Image */}
                            <div
                                className="h-32 rounded-lg overflow-hidden border border-stone-300 cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => setSelectedImage(item.heroImage)}
                                title="Click to view full image"
                            >
                                <img
                                    src={item.heroImage}
                                    alt={item.badge}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Layout Plan Section */}
                            <div className="space-y-1">
                                <h4 className="text-[10px] font-bold text-[#1C3026] tracking-wider uppercase">
                                    LAYOUT PLAN
                                </h4>
                                <div
                                    className="h-28 rounded-lg overflow-hidden border border-stone-300 bg-emerald-900/10 p-1 cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() => setSelectedImage(item.layoutImage)}
                                    title="Click to view full image"
                                >
                                    <img
                                        src={item.layoutImage}
                                        alt="Layout Plan"
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                            </div>

                            {/* Area Section */}
                            <div className="space-y-1 pt-1 border-t border-amber-900/10">
                                <h4 className="text-[10px] font-bold text-[#1C3026] tracking-wider uppercase">
                                    AREA
                                </h4>
                                <div className="flex items-center space-x-1.5 text-xs text-slate-800 font-medium">
                                    <Square className="w-3.5 h-3.5 text-amber-700" />
                                    <span>{item.area}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Bar */}
                <div className="bg-[#1C3026] rounded-xl p-3 px-6 flex flex-col md:flex-row items-center justify-between text-white text-xs gap-2">
                    <div className="flex items-center space-x-2">
                        <Leaf className="w-4 h-4 text-amber-400" />
                        <span className="font-medium tracking-wide">
                            Invest in Luxury. Earn for Generations.
                        </span>
                    </div>

                    <div className="flex items-center space-x-3 text-amber-300/90 text-[11px] font-light">
                        <span>Premium Resorts</span>
                        <span>•</span>
                        <span>High Returns</span>
                        <span>•</span>
                        <span>Lasting Legacy</span>
                    </div>
                </div>

            </div>

            {/* Fullscreen Image Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                            title="Close preview"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Fullscreen Preview"
                            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}