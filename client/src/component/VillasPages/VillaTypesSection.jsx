import React from 'react';
import { Square, CheckCircle2, Home, Sparkles } from 'lucide-react';

export default function VillaTypesSection() {
    const villaTypes = [
        {
            id: 1,
            badge: 'VILLA TYPE 1',
            heroImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=600',
            layoutImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=600',
            area: '3,500 sq. ft.',
            specifications: '3 BHK | 3 Baths | Ground + 1 Floor',
            features: [
                'Private Swimming Pool',
                'Landscaped Garden',
                'Smart Home Automation',
                'Covered Car Parking',
                '24/7 Security Access',
            ],
        },
        {
            id: 2,
            badge: 'VILLA TYPE 2',
            heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
            layoutImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=600',
            area: '4,800 sq. ft.',
            specifications: '4 BHK | 4 Baths | Ground + 2 Floors',
            features: [
                'Infinity Edge Pool',
                'Rooftop Terrace Deck',
                'Private Lawn & Patio',
                'Double Height Living',
                'EV Charging Station',
            ],
        },
        {
            id: 3,
            badge: 'VILLA TYPE 3',
            heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600',
            layoutImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=600',
            area: '6,200 sq. ft.',
            specifications: '5 BHK | 6 Baths | Ground + 2 Floors',
            features: [
                'Heated Plunge Pool',
                'Elevator Access',
                'Outdoor BBQ Lounge',
                'Servant Quarters',
                'Panoramic Forest View',
            ],
        },
        {
            id: 4,
            badge: 'VILLA TYPE 4',
            heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
            layoutImage: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=600',
            area: '8,000 sq. ft.',
            specifications: '6 BHK | 7 Baths | Presidential Suite',
            features: [
                'Grand Private Pool',
                'Private Spa & Sauna',
                '3-Car Underground Garage',
                'Home Theater Room',
                'Dedicated Concierge',
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans p-4 md:p-8 flex flex-col justify-between">
            <div className="max-w-7xl mx-auto w-full space-y-6">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-5xl font-serif text-[#1C3026] tracking-wider font-bold uppercase">
                        VILLA TYPES
                    </h1>

                    {/* Decorative Divider */}
                    <div className="flex items-center justify-center space-x-2 text-amber-600/70">
                        <span className="h-[1px] w-12 bg-amber-600/30"></span>
                        <span className="text-xs">❖</span>
                        <span className="h-[1px] w-12 bg-amber-600/30"></span>
                    </div>

                    <p className="text-xs md:text-sm text-slate-700 tracking-wide font-medium">
                        Four Distinct Architectural Masterpieces Designed for Luxurious Living.
                    </p>
                </div>

                {/* 4 Column Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {villaTypes.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#F3EEE5] rounded-xl p-4 border border-amber-900/10 shadow-sm flex flex-col space-y-3.5"
                        >
                            {/* Badge */}
                            <div className="flex justify-center">
                                <span className="bg-[#1C3026] text-white text-[11px] font-semibold tracking-wider px-4 py-1 rounded-full uppercase shadow-xs">
                                    {item.badge}
                                </span>
                            </div>

                            {/* Main Exterior Image */}
                            <div className="h-36 rounded-lg overflow-hidden border border-stone-300">
                                <img
                                    src={item.heroImage}
                                    alt={item.badge}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Layout Plan Section */}
                            <div className="space-y-1">
                                <h4 className="text-[10px] font-bold text-[#1C3026] tracking-wider uppercase">
                                    LAYOUT PLAN
                                </h4>
                                <div className="h-28 rounded-lg overflow-hidden border border-stone-300 bg-emerald-900/10 p-1">
                                    <img
                                        src={item.layoutImage}
                                        alt={`${item.badge} Layout`}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                            </div>

                            {/* Specifications Section */}
                            <div className="space-y-1.5 pt-2 border-t border-amber-900/10">
                                <h4 className="text-[10px] font-bold text-[#1C3026] tracking-wider uppercase">
                                    SPECIFICATIONS
                                </h4>
                                <div className="space-y-1 text-xs text-slate-800 font-medium">
                                    <div className="flex items-center space-x-1.5">
                                        <Square className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                                        <span>{item.area}</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-700">
                                        <Home className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                                        <span>{item.specifications}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Features Section */}
                            <div className="space-y-1.5 pt-2 border-t border-amber-900/10 flex-1">
                                <h4 className="text-[10px] font-bold text-[#1C3026] tracking-wider uppercase">
                                    FEATURES
                                </h4>
                                <ul className="space-y-1">
                                    {item.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center space-x-1.5 text-[11px] text-slate-700 leading-tight">
                                            <CheckCircle2 className="w-3 h-3 text-amber-700 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Bar */}
                <div className="bg-[#1C3026] rounded-xl p-3.5 px-6 flex flex-col md:flex-row items-center justify-between text-white text-xs gap-2">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="font-medium tracking-wide">
                            Own a Luxury Villa. Experience Unmatched Privacy & Elegance.
                        </span>
                    </div>

                    <div className="flex items-center space-x-3 text-amber-300/90 text-[11px] font-light">
                        <span>Freehold Ownership</span>
                        <span>•</span>
                        <span>Private Pool Options</span>
                        <span>•</span>
                        <span>Rental Management</span>
                    </div>
                </div>

            </div>
        </div>
    );
}