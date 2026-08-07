import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function OverviewS2() {
    // Left side data
    const plotSizes = [
        { size: '100', dimensions: "30' X 30'" },
        { size: '150', dimensions: "30' X 45'" },
        { size: '200', dimensions: "30' X 60'" },
        { size: '250', dimensions: "30' X 75'" },
        { size: '300', dimensions: "30' X 90'" },
        { size: '500', dimensions: "30' X 150'" },
    ];

    // Right side data
    const interactivePlots = [
        {
            id: 'Plot A-12',
            price: '₹ 28.5 Lakh',
            size: '200 Sq. Yd.',
            facing: 'West Facing',
            badge: 'Premium',
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=500',
        },
        {
            id: 'Plot B-07',
            price: '₹ 22.5 Lakh',
            size: '150 Sq. Yd.',
            facing: 'North Facing',
            badge: null,
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=500',
        },
        {
            id: 'Plot C-15',
            price: '₹ 36.5 Lakh',
            size: '300 Sq. Yd.',
            facing: 'East Facing',
            badge: null,
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=500',
        },
    ];

    return (
        <div className="min-h-screen bg-[#FAF7F2] p-4 md:p-8 flex items-center justify-center font-sans">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT CARD: AVAILABLE PLOT SIZES */}
                <div className="lg:col-span-5 bg-[#FAF7F2] border border-stone-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        {/* Title Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-serif text-[#1C3026] font-bold tracking-wider">
                                AVAILABLE PLOT SIZES
                            </h2>
                            <div className="flex items-center justify-center space-x-2 text-amber-700/60 my-2">
                                <span className="h-[1px] w-12 bg-amber-700/30" />
                                <span className="text-xs">🍃 🍃</span>
                                <span className="h-[1px] w-12 bg-amber-700/30" />
                            </div>
                        </div>

                        {/* 2x3 Grid of Plot Sizes */}
                        <div className="grid grid-cols-3 gap-3">
                            {plotSizes.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-[#FAF7F2] border border-stone-200 rounded-xl p-3 text-center flex flex-col items-center justify-between shadow-2xs hover:border-amber-700/40 transition-colors cursor-pointer"
                                >
                                    <div>
                                        <div className="text-2xl font-serif font-bold text-[#1C3026]">
                                            {item.size}
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-700 tracking-wider">
                                            SQ. YD.
                                        </div>
                                        <div className="text-[10px] text-slate-500 font-medium my-0.5">
                                            ({item.dimensions})
                                        </div>
                                    </div>

                                    {/* Abstract Plot Schematic SVG */}
                                    <div className="w-full mt-2 pt-1 border-t border-stone-200/60 flex items-center justify-center">
                                        <div className="w-full h-5 border border-stone-300 rounded-xs bg-[#F3EEE5] relative flex items-center justify-between px-1">
                                            <span className="w-1 h-1 rounded-full bg-emerald-800/40"></span>
                                            <span className="w-1 h-1 rounded-full bg-amber-800/40"></span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="mt-8 text-center">
                        <button className="bg-[#0B2219] hover:bg-[#143125] text-white text-xs font-medium py-2.5 px-6 rounded-md inline-flex items-center space-x-2 transition-all shadow-sm">
                            <span>View All Plot Details</span>
                            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                        </button>
                    </div>
                </div>

                {/* RIGHT CARD: INTERACTIVE PLOT OPTIONS */}
                <div className="lg:col-span-7 bg-[#FAF7F2] border border-stone-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        {/* Title Header */}
                        <div className="text-center mb-5">
                            <h2 className="text-xl font-serif text-[#1C3026] font-bold tracking-wider">
                                INTERACTIVE PLOT OPTIONS
                            </h2>
                            <div className="flex items-center justify-center space-x-2 text-amber-700/60 my-2">
                                <span className="h-[1px] w-12 bg-amber-700/30" />
                                <span className="text-xs">🍃 🍃</span>
                                <span className="h-[1px] w-12 bg-amber-700/30" />
                            </div>
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
                            {['Plot Size', 'Plot Type', 'Facing', 'Price Range'].map((filter, idx) => (
                                <div key={idx} className="relative">
                                    <select className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md py-1.5 px-2.5 text-[11px] font-medium text-slate-700 appearance-none focus:outline-none focus:border-[#1C3026] cursor-pointer">
                                        <option>{filter}</option>
                                    </select>
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2.5 pointer-events-none" />
                                </div>
                            ))}
                        </div>

                        {/* Interactive Plots Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {interactivePlots.map((plot, index) => (
                                <div
                                    key={index}
                                    className="bg-[#FAF7F2] border border-stone-200 rounded-xl overflow-hidden shadow-2xs flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Image Container with Badge */}
                                        <div className="relative h-28 w-full bg-slate-200">
                                            <img
                                                src={plot.image}
                                                alt={plot.id}
                                                className="w-full h-full object-cover"
                                            />
                                            {plot.badge && (
                                                <span className="absolute top-2 left-2 bg-amber-500/90 text-white text-[9px] font-semibold px-2 py-0.5 rounded shadow-xs">
                                                    {plot.badge}
                                                </span>
                                            )}
                                        </div>

                                        {/* Content Details */}
                                        <div className="p-2.5 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-[#1C3026] font-serif">
                                                    {plot.id}
                                                </span>
                                                <span className="text-xs font-bold text-[#1C3026]">
                                                    {plot.price}
                                                </span>
                                            </div>

                                            <div className="text-[10px] text-slate-600 font-medium">
                                                {plot.size}
                                            </div>

                                            <div className="text-[10px] text-slate-500">
                                                {plot.facing}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="p-2.5 pt-0">
                                        <button className="w-full border border-stone-300 hover:bg-stone-100/60 text-[#1C3026] text-[10px] font-semibold py-1 rounded transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="mt-8 text-center">
                        <button className="bg-[#0B2219] hover:bg-[#143125] text-white text-xs font-medium py-2.5 px-6 rounded-md inline-flex items-center space-x-2 transition-all shadow-sm">
                            <span>View All Available Plots</span>
                            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}