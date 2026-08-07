import React from 'react';

export const WhyChooseSection = () => {
    const features = [
        { label: 'Luxury Wedding Venues', icon: '💍' },
        { label: 'Forest Wedding Experience', icon: '🌲' },
        { label: 'Premium Villa Stay', icon: '🏡' },
        { label: 'Multi-Cuisine Catering', icon: '🍽️' },
        { label: 'Photography & Videography', icon: '📷' },
        { label: 'DJ & Entertainment', icon: '🎧' },
        { label: 'Luxury Decoration', icon: '💐' },
        { label: 'Bridal Suite', icon: '👰' },
        { label: 'Groom Lounge', icon: '🤵' },
        { label: 'Parking Facility', icon: '🚗' },
        { label: '24x7 Security', icon: '🛡️' },
        { label: 'Dedicated Wedding Planner', icon: '📋' },
    ];

    const stats = [
        { label: 'Weddings Hosted', value: '300+', icon: '💑' },
        { label: 'Happy Guests', value: '5000+', icon: '🎉' },
        { label: 'Luxury Villas', value: '20+', icon: '🏘️' },
        { label: 'Client Satisfaction', value: '98%', icon: '✅' },
    ];

    return (
        <section className="bg-[#FBF9F4] py-20 px-10 relative overflow-hidden">
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <span className="text-amber-700 text-xs tracking-widest uppercase">Why Choose Echo</span>
                <h2 className="text-4xl font-serif mt-2 mb-12">Why Couples Choose Echo</h2>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-10">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-100 rounded-lg p-5 flex flex-col items-center gap-2 hover:shadow-md transition"
                        >
                            <span className="text-2xl">{f.icon}</span>
                            <span className="text-xs font-medium text-gray-700 leading-tight">{f.label}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-100 rounded-lg p-6 flex items-center justify-center gap-4"
                        >
                            <span className="text-2xl">{s.icon}</span>
                            <div className="text-left">
                                <p className="text-xl font-serif text-gray-800">{s.value}</p>
                                <p className="text-xs text-gray-500">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};