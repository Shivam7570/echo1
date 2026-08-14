import React, { useState } from "react";
import masterplan from "../../assets/masterlayout.jpeg";

import { X } from 'lucide-react';

export default function Section4() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section
            id="master-plan"
            className="py-12 px-4 md:px-8 bg-[#0C1A13] relative overflow-hidden"
        >
            {/* Background Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="text-center mb-12 space-y-3">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs tracking-[0.25em] uppercase font-medium">
                        <span>❖</span>
                        <span>Site Layout</span>
                        <span>❖</span>
                    </div>

                    <h2
                        className="text-4xl md:text-5xl font-serif text-amber-100 tracking-wider"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Master Plan
                    </h2>

                    <div className="flex items-center justify-center space-x-2 text-amber-500/40 my-2">
                        <span className="h-[1px] w-12 bg-amber-500/30" />
                        <span className="text-xs">◆</span>
                        <span className="h-[1px] w-12 bg-amber-500/30" />
                    </div>

                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
                        A thoughtfully designed layout blending luxury living with the
                        surrounding forest landscape.
                    </p>
                </div>

                {/* Master Plan Display Box */}
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-amber-500/30 bg-[#112219] shadow-2xl group p-2 md:p-3">

                    {/* Inner Image Container */}
                    <div
                        className="relative overflow-hidden rounded-xl md:rounded-2xl cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                        title="Click to view full image"
                    >
                        <img
                            src={masterplan}
                            alt="Master Plan Layout"
                            className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Hover Overlay indicating click to zoom */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-amber-600/90 text-white px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase shadow-lg border border-amber-400/30">
                                Click to View Full Image
                            </span>
                        </div>
                    </div>

                </div>

            </div>

            {/* Fullscreen Image Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                            title="Close preview"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <img
                            src={masterplan}
                            alt="Master Plan Fullscreen Preview"
                            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-amber-500/30"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}