import React from 'react';
export const HeroSection = () => {
    return (
        <div
            className="relative min-h-screen bg-cover bg-center text-white"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1688653802629-5360086bf632?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
            {/* Navbar */}
            <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
                <div className="text-2xl font-serif tracking-widest uppercase">ECHO</div>
                <div className="hidden md:flex space-x-8 text-sm font-light">
                    <a href="#home" className="hover:text-amber-400">Home</a>
                    <a href="#about" className="hover:text-amber-400">About Us</a>
                    <a href="#resort" className="hover:text-amber-400">Resort Collection</a>
                    <a href="#villas" className="text-amber-400 underline underline-offset-4">Villa Collection</a>
                    <a href="#amenities" className="hover:text-amber-400">Amenities</a>
                    <a href="#investment" className="hover:text-amber-400">Investment</a>
                    <a href="#contact" className="hover:text-amber-400">Contact</a>
                </div>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded text-sm tracking-wide">
                    Enquire Now
                </button>
            </nav>

            {/* Optional dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40 -z-10" />

            {/* Hero Content */}
            <div className="max-w-7xl mx-auto px-10 pt-24 pb-32 flex flex-col justify-center min-h-[80vh]">
                <p className="text-amber-400 text-xs tracking-widest uppercase mb-2">— PAGE 3 —</p>
                <h1 className="text-6xl font-serif mb-4">Luxury Villas</h1>
                <p className="text-2xl font-serif italic text-amber-200 mb-6">Where Luxury Meets Nature</p>
                <p className="max-w-xl text-gray-300 text-sm leading-relaxed mb-8">
                    Experience elegant villas designed to offer complete privacy, premium comfort, and a seamless connection with the surrounding forest.
                </p>
                <div className="flex space-x-4">
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded text-sm flex items-center gap-2">
                        Explore Villas <span>→</span>
                    </button>
                    <button className="border border-white/40 hover:border-white text-white px-6 py-3 rounded text-sm flex items-center gap-2">
                        Schedule Site Visit <span>📅</span>
                    </button>
                </div>
            </div>
        </div>
    );
};