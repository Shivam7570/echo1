import React, { useState } from 'react';
import {
    MapPin,
    Users,
    DollarSign,
    ChevronDown,
    Heart,
    Star,
    Wifi,
    Bed,
    Home,
    Waves,
    Maximize2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ResortsPage() {
    const [favorites, setFavorites] = useState([]);

    // Initial database of all available resorts
    const initialResorts = [
        {
            id: 1,
            name: "Jungle Cabin Resort",
            location: "Dhela Zone, Jim Corbett",
            tag: "BEST SELLER",
            tagColor: "bg-emerald-800",
            rating: 4.7,
            reviews: 128,
            price: 5499,
            originalPrice: 7999,
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800",
            features: [
                { icon: <Home className="w-4 h-4" />, label: "Deluxe Room" },
                { icon: <Users className="w-4 h-4" />, label: "2 Guests" },
                { icon: <Bed className="w-4 h-4" />, label: "1 King Bed" },
                { icon: <Wifi className="w-4 h-4" />, label: "Free Wi-Fi" }
            ]
        },
        {
            id: 2,
            name: "River View Villa",
            location: "Garjia, Jim Corbett",
            tag: "POPULAR",
            tagColor: "bg-emerald-800",
            rating: 4.6,
            reviews: 96,
            price: 8999,
            originalPrice: 12999,
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
            features: [
                { icon: <Home className="w-4 h-4" />, label: "Villa" },
                { icon: <Users className="w-4 h-4" />, label: "4 Guests" },
                { icon: <Bed className="w-4 h-4" />, label: "2 King Beds" },
                { icon: <Waves className="w-4 h-4" />, label: "Pool" }
            ]
        },
        {
            id: 3,
            name: "Forest Edge Resort",
            location: "Bijrani Zone, Jim Corbett",
            tag: "PREMIUM",
            tagColor: "bg-emerald-800",
            rating: 4.8,
            reviews: 156,
            price: 6999,
            originalPrice: 9999,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
            features: [
                { icon: <Home className="w-4 h-4" />, label: "Premium Room" },
                { icon: <Users className="w-4 h-4" />, label: "2 Guests" },
                { icon: <Bed className="w-4 h-4" />, label: "1 King Bed" },
                { icon: <Wifi className="w-4 h-4" />, label: "Free Wi-Fi" }
            ]
        },
        {
            id: 4,
            name: "Luxury Jungle Villa",
            location: "Kosi Zone, Jim Corbett",
            tag: "NEW ARRIVAL",
            tagColor: "bg-emerald-800",
            rating: 4.9,
            reviews: 78,
            price: 12999,
            originalPrice: 18999,
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
            features: [
                { icon: <Home className="w-4 h-4" />, label: "Villa" },
                { icon: <Users className="w-4 h-4" />, label: "6 Guests" },
                { icon: <Bed className="w-4 h-4" />, label: "3 King Beds" },
                { icon: <Waves className="w-4 h-4" />, label: "Pool" }
            ]
        }
    ];

    // Extra resorts to load when clicking the button
    const additionalResorts = [
        {
            id: 5,
            name: "Whispering Pines Retreat",
            location: "Sitabani Zone, Jim Corbett",
            tag: "FEATURED",
            tagColor: "bg-emerald-800",
            rating: 4.8,
            reviews: 112,
            price: 7499,
            originalPrice: 10500,
            image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800",
            features: [
                { icon: <Home className="w-4 h-4" />, label: "Cottage" },
                { icon: <Users className="w-4 h-4" />, label: "3 Guests" },
                { icon: <Bed className="w-4 h-4" />, label: "1 King Bed" },
                { icon: <Wifi className="w-4 h-4" />, label: "Free Wi-Fi" }
            ]
        },
        {
            id: 6,
            name: "Elephant Corridor Lodge",
            location: "Jhirna Zone, Jim Corbett",
            tag: "BEST SELLER",
            tagColor: "bg-emerald-800",
            rating: 4.7,
            reviews: 204,
            price: 6200,
            originalPrice: 8999,
            image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800",
            features: [
                { icon: <Home className="w-4 h-4" />, label: "Log Cabin" },
                { icon: <Users className="w-4 h-4" />, label: "2 Guests" },
                { icon: <Bed className="w-4 h-4" />, label: "1 Queen Bed" },
                { icon: <Waves className="w-4 h-4" />, label: "Pool" }
            ]
        },
        {
            id: 7,
            name: "Wild Canopy Haven",
            location: "Durga Devi Zone, Jim Corbett",
            tag: "EXCLUSIVE",
            tagColor: "bg-emerald-800",
            rating: 4.9,
            reviews: 64,
            price: 14500,
            originalPrice: 19999,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
            features: [
                { icon: <Home className="w-4 h-4" />, label: "Treehouse" },
                { icon: <Users className="w-4 h-4" />, label: "2 Guests" },
                { icon: <Bed className="w-4 h-4" />, label: "1 King Bed" },
                { icon: <Wifi className="w-4 h-4" />, label: "Free Wi-Fi" }
            ]
        },
        {
            id: 8,
            name: "Tiger Trail Eco Resort",
            location: "Phato Zone, Jim Corbett",
            tag: "ECO FRIENDLY",
            tagColor: "bg-emerald-800",
            rating: 4.5,
            reviews: 87,
            price: 4999,
            originalPrice: 6999,
            image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&q=80&w=800",
            features: [
                { icon: <Home className="w-4 h-4" />, label: "Eco Tent" },
                { icon: <Users className="w-4 h-4" />, label: "2 Guests" },
                { icon: <Bed className="w-4 h-4" />, label: "2 Twin Beds" },
                { icon: <Wifi className="w-4 h-4" />, label: "Free Wi-Fi" }
            ]
        }
    ];

    const [resortsList, setResortsList] = useState(initialResorts);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = () => {
        setResortsList(prev => [...prev, ...additionalResorts]);
        setHasMore(false); // Hide button after loading the extra resorts
    };

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen p-20 z-0 bg-[#FBF9F5] font-sans text-slate-800 pb-16">

            {/* Hero Header Section */}
            <div
                className="relative bg-[#1A3323] text-white py-16 px-6 md:px-12 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(20, 38, 27, 0.92) 0%, rgba(20, 38, 27, 0.75) 100%), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1600')`
                }}
            >
                <div className="max-w-7xl mx-auto space-y-3">
                    <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-wide">
                        Our Resorts
                    </h1>
                    <p className="text-sm md:text-base text-slate-200 max-w-xl font-light">
                        Explore our handpicked resorts and villas, designed for comfort, luxury and unforgettable jungle experiences.
                    </p>
                </div>
            </div>

            {/* Floating Filter Toolbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-12 -mt-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-3 md:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border border-gray-100">

                    {/* Location Filter */}
                    <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-xl transition">
                        <MapPin className="w-5 h-5 text-gray-700" />
                        <div className="flex-1">
                            <span className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase">LOCATION</span>
                            <span className="text-sm font-semibold text-gray-800">All Locations</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* Guests Filter */}
                    <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-xl transition">
                        <Users className="w-5 h-5 text-gray-700" />
                        <div className="flex-1">
                            <span className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase">GUESTS</span>
                            <span className="text-sm font-semibold text-gray-800">2 Guests</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* Price Range Filter */}
                    <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-xl transition">
                        <DollarSign className="w-5 h-5 text-gray-700" />
                        <div className="flex-1">
                            <span className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase">PRICE RANGE</span>
                            <span className="text-sm font-semibold text-gray-800">All Prices</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* Sort By Filter */}
                    <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-xl transition">
                        <div className="flex-1">
                            <span className="block text-[10px] font-bold text-gray-400 tracking-wider uppercase">SORT BY</span>
                            <span className="text-sm font-semibold text-gray-800">Price: Low to High</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>

                </div>
            </div>

            {/* Resorts Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-14 mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {resortsList.map((resort) => {
                        const isFav = favorites.includes(resort.id);
                        return (
                            <div
                                key={resort.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Card Image Container */}
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={resort.image}
                                            alt={resort.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />

                                        {/* Badge */}
                                        <span className={`absolute top-3 left-3 text-white text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full ${resort.tagColor}`}>
                                            {resort.tag}
                                        </span>

                                        {/* Heart Icon Button */}
                                        <button
                                            onClick={() => toggleFavorite(resort.id)}
                                            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-white hover:text-red-500 transition cursor-pointer"
                                        >
                                            <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                                        </button>
                                    </div>

                                    {/* Card Main Info */}
                                    <div className="p-4 space-y-3">
                                        <div>
                                            <h3 className="font-serif text-base font-bold text-gray-900 leading-snug">
                                                {resort.name}
                                            </h3>
                                            <p className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                                                <MapPin className="w-3 h-3 text-gray-400" />
                                                {resort.location}
                                            </p>
                                        </div>

                                        {/* Rating & Reviews */}
                                        <div className="flex items-center gap-1 text-xs">
                                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                            <span className="font-bold text-gray-800">{resort.rating}</span>
                                            <span className="text-gray-400 text-[11px]">({resort.reviews} reviews)</span>
                                        </div>

                                        {/* Features Row */}
                                        <div className="grid grid-cols-4 gap-1 pt-2 border-t border-gray-100 text-center">
                                            {resort.features.map((feat, idx) => (
                                                <div key={idx} className="flex flex-col items-center gap-1">
                                                    <div className="text-gray-600">
                                                        {feat.icon}
                                                    </div>
                                                    <span className="text-[9px] text-gray-500 leading-tight">
                                                        {feat.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer: Price & View Button */}
                                <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-gray-50 mt-2">
                                    <div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-base font-bold text-gray-900">₹ {resort.price.toLocaleString()}</span>
                                        </div>
                                        <div className="text-[10px] text-gray-400">
                                            / night · <span className="line-through">₹ {resort.originalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button className="bg-[#1A3323] hover:bg-[#122418] text-white px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition cursor-pointer">
                                        VIEW DETAILS
                                    </button>
                                </div>

                            </div>
                        );
                    })}
                </div>

                {/* Load More Button Container */}
                {hasMore ? (
                    <div className="mt-12 text-center">
                        <button
                            onClick={handleLoadMore}
                            className="border border-[#1A3323] text-[#1A3323] hover:bg-[#1A3323] hover:text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition inline-flex items-center gap-2 cursor-pointer shadow-sm"
                        >
                            <Maximize2 className="w-3.5 h-3.5" />
                            LOAD MORE RESORTS
                        </button>
                    </div>
                ) : (
                    <div className="mt-12 text-center text-xs text-gray-400 font-medium">
                        You have viewed all available resorts.
                    </div>
                )}
            </div>

        </div>
    );
}