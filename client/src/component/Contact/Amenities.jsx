import React from 'react';

const Amenities = () => {
    const cardsData = [
        {
            id: "01",
            title: "Curated Poolside Leisure",
            description: "Unwind in a resort-style swimming pool surrounded by lush landscapes. Designed for families and groups, this space offers comfort, recreation, and a refreshing escape amidst nature.",
            image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&auto=format&fit=crop",
            icons: [
                { icon: "fa-water", label: "Infinity Swimming Pool" },
                { icon: "fa-umbrella-beach", label: "Luxury Sun Deck" },
                { icon: "fa-users", label: "Family Friendly" },
                { icon: "fa-mountain-sun", label: "Scenic Green Views" }
            ]
        },
        {
            id: "02",
            title: "Signature Fine Dining Experience",
            description: "Indulge in an exquisite culinary journey with world-class ambiance and curated menus. Every meal becomes a celebration of taste, elegance, and unforgettable moments.",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop",
            icons: [
                { icon: "fa-utensils", label: "Multi Cuisine Restaurant" },
                { icon: "fa-wine-glass", label: "Elegant Ambience" },
                { icon: "fa-couch", label: "Indoor Seating" },
                { icon: "fa-concierge-bell", label: "Premium Hospitality" }
            ]
        },
        {
            id: "03",
            title: "Executive Conference & Event Pavilion",
            description: "Host corporate meetings, private events, and celebrations in a sophisticated pavilion equipped with modern facilities and beautiful natural surroundings.",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop",
            icons: [
                { icon: "fa-briefcase", label: "Corporate Meetings" },
                { icon: "fa-ring", label: "Wedding Functions" },
                { icon: "fa-champagne-glasses", label: "Private Parties" },
                { icon: "fa-desktop", label: "Audio Visual Setup" }
            ]
        },
        {
            id: "04",
            title: "Tranquil Wellness Courtyard",
            description: "Reconnect with yourself in a peaceful space designed for mindfulness and rejuvenation. Surrounded by nature, it is your personal sanctuary for holistic well-being.",
            image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop",
            icons: [
                { icon: "fa-spa", label: "Yoga Sessions" },
                { icon: "fa-om", label: "Meditation Area" },
                { icon: "fa-tree", label: "Peaceful Garden" },
                { icon: "fa-wind", label: "Fresh Natural Air" }
            ]
        }
    ];

    return (
        <div className="bg-[#040f07] min-h-screen text-[#e2d9c8] p-4 md:p-10 font-sans flex justify-center items-center">
            {/* Main Outer Container */}
            <div className="max-w-5xl w-full border-2 border-[#8a6d2b] p-6 md:p-10 relative shadow-2xl bg-[#040f07]">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <p className="font-[Cinzel] text-sm md:text-base tracking-[0.3em] text-[#d4af37] uppercase">
                        International Level
                    </p>
                    <h1 className="font-[Cinzel] text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] text-[#d4af37] my-2 font-semibold">
                        AMENITIES
                    </h1>
                    <p className="text-xs md:text-sm text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
                        World-class facilities, nature-inspired luxury, and unforgettable moments crafted for every guest.
                    </p>
                </div>

                {/* 2x2 Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {cardsData.map((card) => (
                        <div
                            key={card.id}
                            className="border border-[#8a6d2b] rounded-3xl p-4 flex flex-col md:flex-row items-center gap-2 bg-[radial-gradient(circle_at_center,_#0a2212_0%,_#030d06_100%)] shadow-lg"
                        >
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full md:w-1/2 h-56 object-cover rounded-2xl"
                            />
                            <div className="w-full md:w-1/2 text-center md:text-left px-2">
                                <span className="inline-block border border-[#8a6d2b] rounded-full px-3 py-0.5 text-xs text-[#d4af37] mb-2 font-[Cinzel]">
                                    {card.id}
                                </span>
                                <h3 className="font-[Cinzel] text-[#d4af37] text-base md:text-lg font-bold leading-tight uppercase">
                                    {card.title}
                                </h3>
                                <p className="text-[11px] text-gray-300 my-2 leading-relaxed font-light">
                                    {card.description}
                                </p>

                                {/* Feature Icons */}
                                <div className="grid grid-cols-4 gap-1 border-t border-[#8a6d2b]/40 pt-3 mt-2 text-center text-[10px] text-[#d4af37]">
                                    {card.icons.map((item, index) => (
                                        <div key={index} className="flex flex-col items-center justify-center">
                                            <i className={`fa-solid ${item.icon} text-sm mb-1`}></i>
                                            <span className="leading-tight">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Section */}


            </div>
        </div>
    );
};

export default Amenities;