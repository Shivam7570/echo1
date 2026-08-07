import React from 'react';
import {
    Home,
    Sun,
    Flower2,
    Utensils,
    Camera,
    Music,
    ConciergeBell,
    Sparkles,
    Car,
    PartyPopper,
    Phone,
    Globe,
    MapPin,
    Heart,
    GlassWater,
    Cake,
    CircleDot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DestinationWeddings() {
    // 1. Initialize the navigate function inside the component
    const navigate = useNavigate();

    const handlePlanWedding = () => {
        navigate('/wedding'); // Replace '/wedding' with your target route path
    };

    const topServices = [
        { icon: <Home className="w-5 h-5" />, label: 'LUXURY VILLAS' },
        { icon: <Sun className="w-5 h-5" />, label: 'VENUE & LAWNS' },
        { icon: <Flower2 className="w-5 h-5" />, label: 'DECOR & FLORAL' },
        { icon: <Utensils className="w-5 h-5" />, label: 'CATERING' },
        { icon: <Camera className="w-5 h-5" />, label: 'PHOTOGRAPHY' },
        { icon: <Music className="w-5 h-5" />, label: 'ENTERTAINMENT' },
        { icon: <ConciergeBell className="w-5 h-5" />, label: 'HOSPITALITY' },
        { icon: <Sparkles className="w-5 h-5" />, label: 'MAKEUP & STYLING' },
        { icon: <Car className="w-5 h-5" />, label: 'TRANSPORT' },
        { icon: <PartyPopper className="w-5 h-5" />, label: 'GUEST ACTIVITIES' },
    ];

    const mainCards = [
        {
            title: 'LUXURY VILLAS',
            image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
            bullets: ['Spacious & Private Villas', 'Premium Amenities', 'Perfect for Family & Guests']
        },
        {
            title: 'VENUE & LAWNS',
            image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600',
            bullets: ['Scenic Lawns & Terraces', 'Customizable Setups', 'Ideal for Intimate to Grand Events']
        },
        {
            title: 'DECOR & FLORAL',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
            bullets: ['Bespoke Decor Concepts', 'Fresh Flowers & Styling', 'Themed Decorations']
        },
        {
            title: 'CATERING',
            image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600',
            bullets: ['Multi-cuisine Menus', 'Live Counters & BBQ', 'Customized Catering']
        },
        {
            title: 'ENTERTAINMENT',
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600',
            bullets: ['Live Music & DJs', 'Cultural Performances', 'Fireworks & Special Effects']
        },
        {
            title: 'HOSPITALITY',
            image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600',
            bullets: ['24x7 Concierge Service', 'Housekeeping', 'Welcome & Guest Care']
        }
    ];

    const perfectFor = [
        { icon: <CircleDot className="w-5 h-5 text-amber-400" />, label: 'WEDDINGS' },
        { icon: <Camera className="w-5 h-5 text-amber-400" />, label: 'PRE WEDDING SHOOTS' },
        { icon: <Heart className="w-5 h-5 text-amber-400" />, label: 'ENGAGEMENTS' },
        { icon: <GlassWater className="w-5 h-5 text-amber-400" />, label: 'RECEPTIONS' },
        { icon: <Cake className="w-5 h-5 text-amber-400" />, label: 'ANNIVERSARIES' },
        { icon: <PartyPopper className="w-5 h-5 text-amber-400" />, label: 'PRIVATE PARTIES' },
    ];

    return (
        <div className="min-h-screen bg-[#06150E] text-slate-100 font-sans p-4 md:p-8 relative">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Hero Section */}
                <div
                    className="relative rounded-2xl overflow-hidden bg-cover bg-center p-6 md:p-12 min-h-[360px] flex flex-col justify-between border border-amber-500/20 shadow-2xl"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(6, 21, 14, 0.95) 0%, rgba(6, 21, 14, 0.7) 45%, rgba(6, 21, 14, 0.2) 100%), url('https://images.pexels.com/photos/30214766/pexels-photo-30214766.jpeg')`
                    }}
                >
                    {/* Brand Logo */}
                    <div className="text-amber-300 font-serif text-2xl tracking-[0.3em] font-semibold">
                        ECHO
                    </div>

                    {/* Hero Content */}
                    <div className="max-w-xl my-6 space-y-2">
                        <h1 className="text-4xl md:text-6xl font-serif text-amber-400 tracking-wider leading-none">
                            DESTINATION <br />
                            <span className="text-amber-300">WEDDINGS</span>
                        </h1>
                        <p className="font-serif italic text-amber-100/90 text-lg md:text-xl pt-1">
                            Celebrate Love in the Lap of Nature
                        </p>
                        <p className="text-xs md:text-sm text-slate-300 max-w-md leading-relaxed pt-2">
                            ECHO offers the perfect blend of natural beauty, luxury villas and world-class hospitality to make your special day truly unforgettable.
                        </p>
                        <button
                            onClick={handlePlanWedding}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded text-sm flex items-center gap-2 cursor-pointer"
                        >
                            Plan Your Wedding <span>→</span>
                        </button>
                    </div>
                </div>

                {/* Horizontal Navigation / Services Bar */}
                <div className="bg-[#092217]/80 backdrop-blur-md rounded-xl p-3 border border-amber-500/30">
                    <div className="flex items-center justify-between mb-2 text-center">
                        <span className="h-[1px] bg-amber-500/40 flex-1" />
                        <span className="px-4 text-[10px] md:text-xs tracking-[0.25em] text-amber-400 uppercase font-medium">
                            EVERYTHING YOU NEED, ALL IN ONE PLACE
                        </span>
                        <span className="h-[1px] bg-amber-500/40 flex-1" />
                    </div>

                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2 text-center pt-1">
                        {topServices.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center space-y-1 p-1 group cursor-pointer">
                                <div className="text-amber-400 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <span className="text-[9px] text-slate-300 font-medium leading-tight">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6 Main Category Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    {mainCards.map((card, idx) => (
                        <div
                            key={idx}
                            className="bg-[#092016] rounded-xl overflow-hidden border border-amber-500/20 shadow-lg flex flex-col justify-between hover:border-amber-400/50 transition-all"
                        >
                            <div>
                                <h3 className="text-center py-2 text-xs font-semibold tracking-wider text-amber-300 bg-[#06150E] border-b border-amber-500/20">
                                    {card.title}
                                </h3>
                                <div className="h-28 overflow-hidden">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <ul className="p-3 text-[10px] space-y-1.5 text-slate-300 bg-[#092016]">
                                {card.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="flex items-start space-x-1.5">
                                        <span className="text-amber-400 font-bold">•</span>
                                        <span className="leading-tight">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Three Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    {/* Panel 1: Perfect For */}
                    <div className="lg:col-span-5 bg-[#092016] rounded-xl p-4 border border-amber-500/20 flex flex-col justify-between">
                        <h4 className="text-[10px] tracking-widest text-amber-400 uppercase font-semibold mb-3">
                            PERFECT FOR
                        </h4>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            {perfectFor.map((item, pIdx) => (
                                <div key={pIdx} className="flex flex-col items-center space-y-1 bg-[#06150E]/60 p-2 rounded-lg border border-amber-500/10">
                                    {item.icon}
                                    <span className="text-[9px] text-slate-300 font-medium tracking-wide">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Panel 2: Center Quote Banner */}
                    <div className="lg:col-span-4 bg-[#092016] rounded-xl p-4 border border-amber-500/30 flex items-center justify-center text-center relative overflow-hidden">
                        <div className="border border-amber-500/30 p-4 rounded-lg w-full h-full flex flex-col items-center justify-center space-y-1">
                            <p className="font-serif italic text-amber-300 text-sm md:text-base">
                                "A celebration so special,
                            </p>
                            <p className="font-serif italic text-amber-300 text-sm md:text-base">
                                it becomes a timeless memory."
                            </p>
                        </div>
                    </div>

                    {/* Panel 3: Plan Your Dream Wedding Contact Info */}
                    <div className="lg:col-span-3 bg-[#092016] rounded-xl p-4 border border-amber-500/20 flex flex-col justify-between">
                        <h4 className="text-[10px] tracking-widest text-amber-400 uppercase font-semibold mb-3">
                            PLAN YOUR DREAM WEDDING
                        </h4>
                        <div className="space-y-2 text-xs text-slate-300">
                            <div className="flex items-center space-x-2">
                                <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                                <span className="text-[11px]">+91 12345 67890</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Globe className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                                <span className="text-[11px]">www.echothejungle.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                                <span className="text-[11px]">Near Jim Corbett National Park, Uttarakhand</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}