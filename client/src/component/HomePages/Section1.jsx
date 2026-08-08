import React from "react";
import {
    TreePine,
    Home,
    TrendingUp,
    MapPin,
    ShieldCheck,
    Waves,
    Mountain,
    Milestone,
    Rocket,
    Download,
    Phone,
} from "lucide-react";

// 1. Import your PDF file

const palette = {
    forestDeep: "#16241C",
    gold: "#C6A15B",
    goldSoft: "#E8CE9A",
    ivory: "#F4EFE6",
    charcoal: "#0E0E0D",
};

const navLinks = [
    "Home",
    "About Us",
    "Villas",
    "Amenities",
    "Investment",
    "Gallery",
    "Location",
    "Contact Us",
];

const statBar = [
    {
        icon: TreePine,
        title: "Nature",
        desc: "Surrounded by Lush Greenery",
    },
    {
        icon: Home,
        title: "Luxury Villas",
        desc: "Premium Living Redefined",
    },
    {
        icon: TrendingUp,
        title: "High Returns",
        desc: "Best Investment Opportunity",
    },
    {
        icon: MapPin,
        title: "Prime Location",
        desc: "Near Jim Corbett National Park",
    },
    {
        icon: ShieldCheck,
        title: "Secure Investment",
        desc: "Gated Community with 24/7 Security",
    },
];

const highlights = [
    {
        icon: Home,
        title: "Luxury Villas",
        desc: "Spacious & Premium Living",
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    },
    {
        icon: Waves,
        title: "World Class Amenities",
        desc: "Experience Comfort & Luxury",
        image:
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
    },
    {
        icon: Mountain,
        title: "Scenic Location",
        desc: "Close to Nature, Close to Peace",
        image:
            "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=800&auto=format&fit=crop",
    },
    {
        icon: Milestone,
        title: "Villa Plots",
        desc: "Build Your Dream Villa",
        image:
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop",
    },
];

export default function EchoHome() {
    return (
        <div style={{ backgroundColor: palette.ivory }}>
            {/* ============ HERO ============ */}
            <section
                className="relative w-full min-h-screen flex flex-col"
                style={{
                    backgroundImage:
                        "linear-gradient(180deg, rgba(10,15,10,0.55) 0%, rgba(10,15,10,0.25) 35%, rgba(10,15,10,0.55) 100%), url('/src/assets/heroImg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* NAV */}

                {/* HERO CONTENT */}
                <div className="flex-1 flex p-20 flex-col justify-center px-6 md:px-14 pb-20 max-w-2xl">
                    <p
                        className="uppercase tracking-[0.3em] text-xs mb-5"
                        style={{ color: palette.goldSoft }}
                    >
                        Echo The Jungle Resort &amp; Villa
                    </p>
                    <h1
                        className="text-white text-5xl md:text-6xl leading-[1.1] mb-6"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                        Where Nature
                        <br />
                        Meets Opportunity
                    </h1>

                    <div className="flex items-center gap-3 mb-6" style={{ color: palette.gold }}>
                        <span className="w-10 h-px" style={{ backgroundColor: palette.gold }} />
                        <TreePine size={16} />
                        <span className="w-10 h-px" style={{ backgroundColor: palette.gold }} />
                    </div>

                    <p className="text-white/90 text-lg mb-9 leading-relaxed">
                        A Premium Resort, Villa &amp; Plot Destination Near{" "}
                        <span style={{ color: palette.goldSoft }}>Jim Corbett</span>
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#explore"
                            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-sm"
                            style={{ backgroundColor: palette.goldSoft, color: palette.charcoal }}
                        >
                            <Rocket size={16} />
                            Explore Project
                        </a>


                    </div>
                </div>

                {/* STAT BAR */}
                <div
                    className="w-full grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 px-6 md:px-14 py-8"
                    style={{ backgroundColor: "rgba(22,36,28,0.92)" }}
                >
                    {statBar.map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex items-start gap-3">
                            <Icon size={26} style={{ color: palette.gold, flexShrink: 0 }} />
                            <div>
                                <p className="text-sm font-semibold" style={{ color: palette.goldSoft }}>
                                    {title}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: "rgba(244,239,230,0.75)" }}>
                                    {desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ PROJECT HIGHLIGHTS ============ */}
            <section className="px-6 md:px-14 py-20">
                <div className="text-center mb-12">
                    <h2
                        className="text-4xl md:text-5xl"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif", color: palette.forestDeep }}
                    >
                        Our Project Highlights
                    </h2>
                    <div className="flex items-center justify-center gap-3 mt-4" style={{ color: palette.gold }}>
                        <span className="w-10 h-px" style={{ backgroundColor: palette.gold }} />
                        <TreePine size={16} />
                        <span className="w-10 h-px" style={{ backgroundColor: palette.gold }} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {highlights.map(({ icon: Icon, title, desc, image }) => (
                        <div
                            key={title}
                            className="relative rounded-xl overflow-hidden group h-80"
                        >
                            <img
                                src={image}
                                alt={title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(14,20,14,0.9) 100%)",
                                }}
                            />
                            <div
                                className="absolute top-4 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: palette.forestDeep }}
                            >
                                <Icon size={18} style={{ color: palette.goldSoft }} />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                                <p className="text-base font-semibold" style={{ color: palette.goldSoft }}>
                                    {title}
                                </p>
                                <p className="text-xs mt-1" style={{ color: "rgba(244,239,230,0.85)" }}>
                                    {desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}