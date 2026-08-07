import React from 'react';

export const HeroWedding = () => {
    return (
        <div
            className="relative min-h-[90vh] bg-cover bg-center text-white"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1736155983520-a0f7d5949d39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VkZGluZyUyMGx1eGFyeSUyMHJlc29ydHxlbnwwfHwwfHx8MA%3D%3D')" }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />



            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-10 pt-16 pb-24 flex flex-col justify-center min-h-[70vh]">
                <p className="text-amber-400 text-sm italic font-serif mb-3">Where Love Meets Luxury</p>
                <h1 className="text-5xl md:text-6xl font-serif mb-6 max-w-xl leading-tight">
                    Celebrate Your Love in Nature's Finest Luxury
                </h1>
                <p className="max-w-md text-gray-200 text-sm leading-relaxed mb-8">
                    Create unforgettable memories with a destination wedding surrounded by lush forests, elegant villas, and breathtaking landscapes.
                </p>
                <div className="flex flex-wrap gap-4">

                    <button className="border border-white/60 hover:border-white text-white px-6 py-3 rounded text-sm flex items-center gap-2">
                        Download Wedding Brochure <span>⬇</span>
                    </button>
                </div>
            </div>
        </div>
    );
};