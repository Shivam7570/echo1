import React from 'react';
import {
    FaCar,
    FaMapMarkerAlt,
    FaCompass,
    FaRoad,
    FaTree,
    FaPlane,
    FaTrain,
    FaLandmark,
    FaCamera,
    FaWater
} from 'react-icons/fa';
import { GiTigerHead } from 'react-icons/gi';

export default function Section5() {
    const advantages = [
        {
            id: 1,
            icon: <GiTigerHead className="w-6 h-6 text-amber-500" />,
            title: 'Jim Corbett National Park',
            subtitle: 'Just 10 Minutes Drive',
            description: "India's premier wildlife sanctuary and a major tourist attraction.",
        },
        {
            id: 2,
            icon: <FaCamera className="w-6 h-6 text-amber-500" />,
            title: 'Major Tourist Attractions',
            subtitle: '5 – 30 Minutes',
            description: 'Temples, museums, river activities and wildlife safari experiences.',
        },
        {
            id: 3,
            icon: <FaRoad className="w-6 h-6 text-amber-500" />,
            title: 'Excellent Road Connectivity',
            subtitle: 'NH-24',
            description: 'Seamless connectivity to major cities and tourist destinations.',
        },
        {
            id: 4,
            icon: <FaMapMarkerAlt className="w-6 h-6 text-amber-500" />,
            title: 'Nearby Destinations',
            subtitle: 'Multiple Options',
            description: 'Nainital, Ramnagar, Kashipur and more within easy reach.',
        },
    ];

    const destinations = [
        {
            id: 1,
            name: 'Jim Corbett National Park',
            duration: '10 Minutes',
            icon: <GiTigerHead className="w-4 h-4 text-amber-500" />,
            image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=600',
        },
        {
            id: 2,
            name: 'Garjiya Devi Temple',
            duration: '15 Minutes',
            icon: <FaLandmark className="w-4 h-4 text-amber-500" />,
            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
        },
        {
            id: 3,
            name: 'Kainchi Dham ',
            duration: '20 Minutes',
            icon: <FaLandmark className="w-4 h-4 text-amber-500" />,
            image: 'https://static1.squarespace.com/static/5e46d3773bf1ec51a04b43f8/5e4ac92571f6217a28b98aa4/5e4ac92571f6217a28b98aa5/1607096660126/kainchi-dham-e1458255355599.jpg?format=1500w',
        },
        {
            id: 4,
            name: 'Ramnagar Railway Station',
            duration: '20 Minutes',
            icon: <FaTrain className="w-4 h-4 text-amber-500" />,
            image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=600',
        },
        {
            id: 5,
            name: 'Nainital',
            duration: '1.5 Hours',
            icon: <FaCompass className="w-4 h-4 text-amber-500" />,
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        },
        {
            id: 6,
            name: 'Pili Dam',
            duration: '2 Hours',
            icon: <FaWater className="w-4 h-4 text-amber-500" />,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9IMXqCNP26EoptJgP7oWSZQdRBWtz6KIjSqZb3sjDYQ&s=10',
        },
    ];

    return (
        <div className="min-h-screen bg-[#F7F4EB] text-slate-800 font-sans p-6 md:p-12 relative overflow-hidden">
            {/* Background Decorative Plant Accent */}
            <div className="absolute top-0 left-0 w-48 h-48 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <p className="tracking-[0.2em] text-xs font-semibold uppercase text-amber-700">
                        PRIME LOCATION
                    </p>
                    <h1 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight">
                        Location Advantages
                    </h1>
                    <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600 leading-relaxed pt-1">
                        Strategically located near Jim Corbett National Park with excellent connectivity
                        and surrounded by renowned tourist destinations.
                    </p>
                    {/* Added Address Subtext with Clickable Link */}

                </div>

                {/* Top Split: Map + Advantage Items */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                    {/* Map Embed Container */}
                    <div className="relative w-full h-[360px] lg:h-auto min-h-[340px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-stone-200">
                        <iframe
                            title="Echo Jungle Resort Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111551.99264152777!2d79.0886!3d29.3919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a2416b0429f6b%3A0xb30909e76686175b!2sJim%20Corbett%20National%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            className="w-full h-full border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        {/* Custom Property Overlay Badge (Clickable) */}
                        <a
                            href="https://earth.google.com/web/search/Gurudwara+Road,+Village+Narainwala,+Dhampur+District+Bijnor,+Uttar+Pradesh,+246735%2e/@29.85639196,76.32715326,991.31779548a,2567289.73631233d,35y,-0h,0t,0r/data=CsMBGpQBEo0BCiUweDM5MGEzM2NhMDZjZTVkM2I6MHg2NGYwMmI2MmNiNjkwZWViGU1dnnNcfD1AIYOBjCVRqlNAKlJHdXJ1ZHdhcmEgUm9hZCwgVmlsbGFnZSBOYXJhaW53YWxhLCBEaGFtcHVyIERpc3RyaWN0IEJpam5vciwgVXR0YXIgUHJhZGVzaCwgMjQ2NzM1GAIgASImCiQJt0WexdCZMUARtEWexdCZMcAZoRKBozQkSEAhyZJ5tsGGSMBCAggBOgMKATBCAggASg0I____________ARAA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 left-4 bg-[#0F261C]/90 text-white backdrop-blur-md p-3 rounded-xl border border-amber-500/30 flex items-center space-x-3 shadow-lg max-w-[280px] hover:bg-[#0F261C] transition-colors group cursor-pointer"
                        >
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/40 flex-shrink-0">
                                <FaMapMarkerAlt className="w-4 h-4 text-amber-400" />
                            </div>
                            <div>
                                <h4 className="text-xs tracking-wider uppercase font-semibold text-amber-400 group-hover:underline">ECHO</h4>
                                <p className="text-[10px] text-slate-300 leading-tight">Gurudwara Road, Narainwala, Dhampur, Bijnor, UP - 246735</p>
                            </div>
                        </a>
                    </div>

                    {/* Advantage Cards List */}
                    <div className="flex flex-col justify-between space-y-4">
                        {advantages.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl p-4 md:p-5 border border-slate-100 shadow-sm flex items-center space-x-4 transition-all duration-200 hover:shadow-md"
                            >
                                <div className="w-14 h-14 rounded-xl bg-[#0F261C] flex-shrink-0 flex items-center justify-center shadow-inner">
                                    {item.icon}
                                </div>
                                <div className="flex-1 min-w-0 pr-2">
                                    <h3 className="font-semibold text-slate-900 text-sm md:text-base">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-amber-700 font-medium">
                                        {item.subtitle}
                                    </p>
                                </div>
                                <div className="w-1/2 border-l border-slate-200 pl-4 text-xs text-slate-500 leading-snug hidden sm:block">
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section Divider Header */}
                <div className="relative text-center my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-300/60"></div>
                    </div>
                    <div className="relative inline-block bg-[#F7F4EB] px-4">
                        <span className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
                            POPULAR NEARBY DESTINATIONS
                        </span>
                    </div>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {destinations.map((dest) => (
                        <div
                            key={dest.id}
                            className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-300"
                        >
                            <div className="relative h-28 overflow-hidden bg-slate-100">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-2 left-2 w-7 h-7 rounded-full bg-[#0F261C] flex items-center justify-center border border-amber-400/40 shadow">
                                    {dest.icon}
                                </div>
                            </div>
                            <div className="p-3 flex-1 flex flex-col justify-between">
                                <h4 className="text-xs font-semibold text-slate-900 line-clamp-2">
                                    {dest.name}
                                </h4>
                                <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-2">
                                    <FaCar className="w-3 h-3 text-amber-700 flex-shrink-0" />
                                    <span>{dest.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar Highlight */}
                <div className="bg-[#0F261C] text-white rounded-2xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-800/60 shadow-lg">
                    <div className="flex items-center justify-center space-x-3 pt-2 md:pt-0">
                        <FaCar className="w-6 h-6 text-amber-400" />
                        <div className="text-left">
                            <p className="font-semibold text-sm">3 Hours</p>
                            <p className="text-xs text-emerald-200/70">From Delhi NCR</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-3 pt-4 md:pt-0">
                        <FaRoad className="w-6 h-6 text-amber-400" />
                        <div className="text-left">
                            <p className="font-semibold text-sm">NH-24</p>
                            <p className="text-xs text-emerald-200/70">Excellent Connectivity</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-3 pt-4 md:pt-0">
                        <FaTree className="w-6 h-6 text-amber-400" />
                        <div className="text-left">
                            <p className="font-semibold text-sm">Surrounded by</p>
                            <p className="text-xs text-emerald-200/70">Nature & Serenity</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}