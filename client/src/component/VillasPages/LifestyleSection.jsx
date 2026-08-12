import React from 'react';

export const LifestyleSection = () => {
    const highlights = [
        'Contemporary Architecture', 'Nature Inspired Design',
        'Spacious Interiors', 'Premium Materials',
        'Sustainable Construction', 'Resort Lifestyle Access'
    ];

    const features = [
        { label: 'Private Pool Options', icon: '🏊' },
        { label: 'Smart Home Features', icon: '🏠' },
        { label: 'Outdoor Lounge', icon: '🛋️' },
        { label: 'Garden Spaces', icon: '🌿' },
        { label: 'Premium Interiors', icon: '🪑' },
        { label: 'High-Speed Internet', icon: '📡' },
        { label: '24x7 Security', icon: '🛡️' },
        { label: 'Housekeeping Services', icon: '🧹' },
    ];

    const lifestyleImages = [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop',
        'https://images.pexels.com/photos/38120262/pexels-photo-38120262.jpeg',
        'https://images.pexels.com/photos/17773876/pexels-photo-17773876.png',
    ];

    return (
        <section className="bg-[#FAF8F5] py-20 px-10 text-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Concept Overview */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                        alt="Villa Concept"
                        className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                    />
                    <div>
                        <span className="text-amber-700 text-xs tracking-widest uppercase mb-2 block">— VILLA CONCEPT OVERVIEW —</span>
                        <h2 className="text-4xl font-serif mb-6">Designed for Elevated Living</h2>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            Every villa is carefully crafted to combine modern architecture with natural surroundings. Whether you are seeking a peaceful holiday home or an exclusive retreat, every villa offers timeless elegance.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">✓</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Lifestyle Grid */}
                <div className="text-center mb-12">
                    <span className="text-amber-700 text-xs tracking-widest uppercase">— LIFESTYLE EXPERIENCE —</span>
                    <h2 className="text-3xl font-serif mt-2 mb-4">Live Every Day Like a Vacation</h2>
                    <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                        Imagine waking up to birdsong, enjoying coffee with panoramic forest views, relaxing in your private pool, and ending the day beneath a sky full of stars.
                    </p>
                </div>

                {/* Image Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {lifestyleImages.map((src, i) => (
                        <img key={i} src={src} alt="Lifestyle" className="rounded-lg h-56 w-full object-cover" />
                    ))}
                </div>

                {/* Feature Icons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-8 gap-4 text-center">
                    {features.map((feat, i) => (
                        <div key={i} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <span className="text-2xl mb-2">{feat.icon}</span>
                            <span className="text-xs font-medium text-gray-700">{feat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};