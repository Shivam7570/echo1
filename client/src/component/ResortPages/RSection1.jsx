import React from 'react';
import {
    Building2,
    TrendingUp,
    Coins,
    Users,
    Palmtree
} from 'lucide-react';

export default function RSection1() {
    const cards = [
        {
            id: 1,
            icon: <Building2 className="w-8 h-8 text-amber-400" />,
            title: 'Why Resort\nOwnership',
            description: 'Own a piece of paradise that combines personal enjoyment with long-term financial growth.',
        },
        {
            id: 2,
            icon: <TrendingUp className="w-8 h-8 text-amber-400" />,
            title: 'Investment\nBenefits',
            description: 'High potential appreciation, asset diversification, and strong returns in a growing market.',
        },
        {
            id: 3,
            icon: <Coins className="w-8 h-8 text-amber-400" />,
            title: 'Rental\nPotential',
            description: 'Generate passive income through short-term rentals and maximize your investment returns.',
        },
        {
            id: 4,
            icon: <Users className="w-8 h-8 text-amber-400" />,
            title: 'Tourism\nDemand',
            description: 'Rising tourism and increasing demand ensure consistent occupancy and high rental yields.',
        },
        {
            id: 5,
            icon: <Palmtree className="w-8 h-8 text-amber-400" />,
            title: 'High-Growth\nDestinations',
            description: 'Carefully selected locations with excellent connectivity, infrastructure, and future growth potential.',
        },
    ];

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans">
            {/* Hero Header Banner */}
            <div
                className="relative h-[420px] md:h-[480px] bg-cover bg-center flex flex-col justify-center px-8 md:px-16"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(15, 23, 18, 0.75) 0%, rgba(15, 23, 18, 0.3) 50%, rgba(15, 23, 18, 0.1) 100%), url('/src/assets/resortHiro.jpg')`
                }}
            >
                <div className="max-w-7xl mx-auto w-full space-y-3">
                    {/* Tag / Badge */}


                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-none">
                        Resort <br />
                        Collection
                    </h1>

                    {/* Subtitle */}
                    <p className="text-amber-300 font-serif text-lg md:text-2xl tracking-wide pt-2">
                        Luxury Resort Investment Opportunities
                    </p>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-12">

                {/* Section Heading */}
                <div className="text-center space-y-3">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#1C3026] tracking-tight">
                        Overview
                    </h2>

                    {/* Decorative Divider */}
                    <div className="flex items-center justify-center space-x-2 text-amber-600/70">
                        <span className="h-[1px] w-12 bg-amber-600/30"></span>
                        <span className="text-xs">✦</span>
                        <span className="h-[1px] w-12 bg-amber-600/30"></span>
                    </div>

                    <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Discover premium resort ownership opportunities in high-growth destinations. <br className="hidden sm:inline" />
                        Enjoy luxury living while earning attractive returns on your investment.
                    </p>
                </div>

                {/* 5 Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="bg-[#F4EFE6]/60 border border-stone-200/80 rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[300px]"
                        >
                            {/* Circular Dark Icon Container */}
                            <div className="w-16 h-16 rounded-full bg-[#1A3326] flex items-center justify-center shadow-md mb-4 border border-amber-500/20">
                                {card.icon}
                            </div>

                            {/* Title */}
                            <h3 className="font-serif text-[#1C3026] text-lg font-semibold whitespace-pre-line leading-snug mb-3">
                                {card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs text-slate-600 leading-relaxed mt-auto">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}