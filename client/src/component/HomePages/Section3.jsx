import React, { useRef } from "react";
import {
    MapPin,
    TrendingUp,
    HandCoins,
    Hourglass,
    Leaf,
    Camera,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const palette = {
    forestDeep: "#16241C",
    gold: "#C6A15B",
    goldSoft: "#E8CE9A",
    ivory: "#F4EFE6",
};

const reasons = [
    {
        icon: MapPin,
        title: "Prime Location",
        titleLine2: "Near Jim Corbett",
        desc: "Strategically located near Jim Corbett National Park, offering unmatched accessibility and natural beauty.",
        video: "https://www.pexels.com/download/video/35985991/",
    },
    {
        icon: TrendingUp,
        title: "High Growth",
        titleLine2: "Investment Potential",
        desc: "Excellent appreciation potential driven by tourism and infrastructure growth.",
        video: "https://www.pexels.com/download/video/38800080/",
    },
    {
        icon: HandCoins,
        title: "Dual Benefit",
        titleLine2: "Opportunity",
        desc: "Use your villa for holidays and generate rental income throughout the year.",
        video: "https://www.pexels.com/download/video/8960131/", // house for rent
    },
    {
        icon: Hourglass,
        title: "Prime ",
        titleLine2: "Opportunities",
        desc: "Premium villas and plots with limited availability for long-term value.",
        video: "https://www.pexels.com/download/video/37957950/", // aerial view of coastal luxury villas
    },
    {
        icon: Leaf,
        title: "Nature-Centric",
        titleLine2: "Development",
        desc: "Designed around forests, rivers and peaceful mountain surroundings.",
        video: "https://www.pexels.com/download/video/38105811/", // scenic aerial view of forest and river
    },
    {
        icon: Camera,
        title: "Tourism Driven",
        titleLine2: "Destination",
        desc: "A year-round tourist destination with strong rental demand.",
        video: "https://www.pexels.com/download/video/20230491/", // the mountains (travel/tourism)
    },
];

export default function Section3() {
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        sliderRef.current?.scrollBy({ left: -350, behavior: "smooth" });
    };

    const scrollRight = () => {
        sliderRef.current?.scrollBy({ left: 350, behavior: "smooth" });
    };

    return (
        <section
            className="relative py-7 overflow-hidden"
            style={{ background: palette.ivory }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2
                        className="text-5xl md:text-6xl mb-6"
                        style={{
                            color: palette.forestDeep,
                            fontFamily: "'Playfair Display',serif",
                        }}
                    >
                        Why Invest In Echo
                    </h2>

                    <div className="flex items-center justify-center gap-3 mb-8">
                        <span
                            className="w-16 h-[2px]"
                            style={{ background: palette.gold }}
                        ></span>
                        <Leaf color={palette.gold} />
                        <span
                            className="w-16 h-[2px]"
                            style={{ background: palette.gold }}
                        ></span>
                    </div>

                    <p className="text-gray-600 text-lg">
                        Invest in more than property. Invest in nature, luxury and a
                        destination that keeps growing.
                    </p>
                </div>

                <div className="relative mt-16">
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-xl p-3 hover:bg-[#16241C] hover:text-white transition"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full shadow-xl p-3 hover:bg-[#16241C] hover:text-white transition"
                    >
                        <ChevronRight />
                    </button>

                    <div
                        ref={sliderRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth px-12 pb-4"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {reasons.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0 hover:-translate-y-2 transition duration-500"
                                >
                                    <div className="h-50">
                                        <video
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        >
                                            <source src={item.video} type="video/mp4" />
                                        </video>
                                    </div>

                                    <div className="flex justify-center -mt-8 relative z-10">
                                        <div
                                            className="w-16 h-16 rounded-full flex items-center justify-center"
                                            style={{
                                                background: palette.forestDeep,
                                                border: `2px solid ${palette.gold}`,
                                            }}
                                        >
                                            <Icon color={palette.goldSoft} size={24} />
                                        </div>
                                    </div>

                                    <div className="p-6 text-center">
                                        <h3
                                            className="text-2xl"
                                            style={{
                                                color: palette.forestDeep,
                                                fontFamily: "'Playfair Display',serif",
                                            }}
                                        >
                                            {item.title}
                                            <br />
                                            {item.titleLine2}
                                        </h3>

                                        <div
                                            className="w-10 h-[2px] mx-auto my-4"
                                            style={{ background: palette.gold }}
                                        ></div>

                                        <p className="text-gray-600 leading-5">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
        div::-webkit-scrollbar{
          display:none;
        }
      `}</style>
        </section>
    );
}