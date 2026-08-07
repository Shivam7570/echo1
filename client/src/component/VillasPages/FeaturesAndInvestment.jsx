import React from 'react';

export const FeaturesAndInvestment = () => {
    return (
        <section className="bg-white py-20 px-10">
            <div className="max-w-7xl mx-auto space-y-20">

                {/* Sanctuary & Nature Dual Cards */}
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Card 1: Privacy */}
                    <div className="bg-[#FAF8F5] p-8 rounded-xl flex flex-col justify-between">
                        <div>
                            <span className="text-amber-700 text-xs tracking-widest uppercase">— PRIVACY —</span>
                            <h3 className="text-3xl font-serif mt-2 mb-4">Your Own Private Sanctuary</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Every villa is positioned to maximize personal space and peaceful surroundings without sacrificing luxury.
                            </p>
                            <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 font-medium mb-6">
                                <p>✔ Gated Community</p>
                                <p>✔ CCTV Security</p>
                                <p>✔ Private Entrance</p>
                                <p>✔ Low Density Planning</p>
                                <p>✔ Landscaped Boundaries</p>
                                <p>✔ Peaceful Surroundings</p>
                            </div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop"
                            alt="Sanctuary"
                            className="rounded-lg h-48 w-full object-cover"
                        />
                    </div>

                    {/* Card 2: Nature Living */}
                    <div className="bg-[#FAF8F5] p-8 rounded-xl flex flex-col justify-between">
                        <div>
                            <span className="text-amber-700 text-xs tracking-widest uppercase">— NATURE LIVING —</span>
                            <h3 className="text-3xl font-serif mt-2 mb-4">Live Closer to Nature</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Reconnect with nature without sacrificing luxury. Fresh air, lush landscapes, and scenic walking trails become part of daily life.
                            </p>
                            <div className="grid grid-cols-4 gap-4 text-center text-xs mb-6">
                                <div>🌳<p className="mt-1">Forest Env.</p></div>
                                <div>🍃<p className="mt-1">Clean Air</p></div>
                                <div>💧<p className="mt-1">Water Features</p></div>
                                <div>🚶<p className="mt-1">Walking Trails</p></div>
                            </div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop"
                            alt="Nature"
                            className="rounded-lg h-48 w-full object-cover"
                        />
                    </div>
                </div>

                {/* Dark Investment Banner */}
                <div className="bg-[#0F1E19] text-white rounded-xl p-10 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <span className="text-amber-400 text-xs tracking-widest uppercase">— WHY INVESTORS LOVE OUR VILLAS —</span>
                        <h2 className="text-4xl font-serif mt-2 mb-6">A Perfect Blend of Luxury and Strong Returns</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                            <p>✔ High Rental Demand</p>
                            <p>✔ Safe Investment</p>
                            <p>✔ Premium Appreciation</p>
                            <p>✔ Excellent Connectivity</p>
                            <p>✔ Fully Managed Property</p>
                            <p>✔ Peaceful Environment</p>
                        </div>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
                        alt="Investment Villa"
                        className="rounded-lg shadow-xl h-64 w-full object-cover"
                    />
                </div>

            </div>
        </section>
    );
};