import React from 'react';
import {
    ArrowRight,
    Download,
    MapPin,
    TrendingUp,
    ShieldCheck,
    Trees,
    Leaf
} from 'lucide-react';

export default function MasterHero() {
    return (
        <div className="relative min-h-screen w-full bg-stone-900 text-white font-sans overflow-hidden flex flex-col justify-between">

            {/* Background Image with Dark Gradient Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.2) 100%), url('/src/assets/PlotHeroImg.png')`
                }}
            />

            {/* Top Navigation Bar */}
            <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto w-full">

                {/* Logo Section */}
                <div className="flex items-center space-x-3">
                    <div className="text-amber-400">
                        <Leaf className="w-6 h-6 rotate-45" />
                    </div>
                    <div>
                        <h1 className="font-serif text-2xl font-semibold tracking-widest leading-none text-stone-100">
                            ECHO
                        </h1>
                        <p className="text-[8px] font-sans tracking-[0.25em] text-amber-200/80 uppercase mt-1">
                            THE JUNGLE RESORT & VILLA
                        </p>
                    </div>
                </div>

                {/* Desktop Nav Links */}


                {/* CTA Button */}
                <button className="bg-[#D4A359] hover:bg-[#c29249] text-stone-950 font-bold text-xs tracking-widest px-6 py-3 rounded-lg shadow-md transition-all uppercase">
                    ENQUIRE NOW
                </button>
            </header>

            {/* Hero Content Section */}
            <main className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-8 flex-1 flex flex-col justify-center space-y-6">

                {/* Page Badge */}


                {/* Title Block */}
                <div className="space-y-2 max-w-2xl">
                    <h2 className="text-5xl md:text-6xl font-serif text-stone-100 tracking-wide font-normal">
                        Premium Plots
                    </h2>
                    <p className="font-serif italic text-3xl md:text-4xl text-amber-300 font-light">
                        Where Nature Meets Opportunity
                    </p>
                </div>

                {/* Description */}
                <p className="text-stone-300/90 text-sm md:text-base leading-relaxed max-w-lg font-light">
                    Invest in premium plots surrounded by lush greenery and luxury villas. Build your dream villa or invest for a prosperous future.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button className="bg-[#D4A359] hover:bg-[#c29249] text-stone-950 font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg flex items-center space-x-2 transition-all">
                        <span>Explore Plots</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <button className="bg-stone-900/40 hover:bg-stone-900/70 border border-stone-500/50 backdrop-blur-md text-stone-200 font-medium text-sm px-6 py-3.5 rounded-xl flex items-center space-x-2 transition-all">
                        <span>Download Master Plan</span>
                        <Download className="w-4 h-4 text-stone-300" />
                    </button>
                </div>

                {/* Bottom Feature Badges Container */}
                <div className="pt-6">
                    <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-[#09150E]/80 backdrop-blur-md border border-emerald-900/60 p-4 rounded-2xl max-w-2xl">

                        {/* Feature 1 */}
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-xs font-semibold text-stone-200">Prime</p>
                                <p className="text-xs font-semibold text-stone-200">Location</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-xs font-semibold text-stone-200">High</p>
                                <p className="text-xs font-semibold text-stone-200">Appreciation</p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-xs font-semibold text-stone-200">Secure</p>
                                <p className="text-xs font-semibold text-stone-200">Investment</p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <Trees className="w-5 h-5" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-xs font-semibold text-stone-200">Resort</p>
                                <p className="text-xs font-semibold text-stone-200">Lifestyle</p>
                            </div>
                        </div>

                    </div>
                </div>

            </main>

        </div>
    );
}