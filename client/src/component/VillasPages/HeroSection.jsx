import React, { useState } from 'react';
import ScheduleVisitModal from '../Common/ScheduleVisitModal';

export const HeroSection = () => {
    const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

    const handleExploreVillas = () => {
        const target = document.getElementById('villa-types');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.hash = '#villa-types';
        }
    };

    return (
        <>
            <div
                className="relative min-h-screen bg-cover bg-center text-white"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1688653802629-5360086bf632?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
            >
                {/* Optional dark overlay for readability */}
                <div className="absolute inset-0 bg-black/40 -z-10" />

                {/* Hero Content */}
                <div className="max-w-7xl mx-auto px-10 pt-24 pb-32 flex flex-col justify-center min-h-[80vh]">
                    <p className="text-amber-400 text-xs tracking-widest uppercase mb-2">— LUXURY LIVING —</p>
                    <h1 className="text-6xl font-serif mb-4">Luxury Villas</h1>
                    <p className="text-2xl font-serif italic text-amber-200 mb-6">Where Luxury Meets Nature</p>
                    <p className="max-w-xl text-gray-300 text-sm leading-relaxed mb-8">
                        Experience elegant villas designed to offer complete privacy, premium comfort, and a seamless connection with the surrounding forest.
                    </p>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleExploreVillas}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded text-sm flex items-center gap-2 transition cursor-pointer"
                        >
                            Explore Villas <span>→</span>
                        </button>
                        <button
                            onClick={() => setIsVisitModalOpen(true)}
                            className="border border-white/40 hover:border-white hover:bg-white/10 text-white px-6 py-3 rounded text-sm flex items-center gap-2 transition cursor-pointer"
                        >
                            Schedule Site Visit <span>📅</span>
                        </button>
                    </div>
                </div>
            </div>

            <ScheduleVisitModal
                isOpen={isVisitModalOpen}
                onClose={() => setIsVisitModalOpen(false)}
                defaultProperty="Luxury Villas"
            />
        </>
    );
};