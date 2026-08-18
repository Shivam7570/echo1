import React from 'react';
import {
    Leaf,
    Home,
    Mountain,
    ShieldCheck
} from 'lucide-react';

// Importing the video file directly from the path provided
import videoSrc from '/video.mp4';

export default function Video() {
    const features = [
        {
            icon: Leaf,
            title: "Surrounded by Nature",
            description: "Deep in the wilderness of Jim Corbett."
        },
        {
            icon: Home,
            title: "Luxury Redefined",
            description: "World-class villas with modern comforts."
        },
        {
            icon: Mountain,
            title: "Breathtaking Views",
            description: "Unmatched views of mountains, rivers & forest."
        },
        {
            icon: ShieldCheck,
            title: "Secure Investment",
            description: "High return potential in a growing destination."
        }
    ];

    return (
        <section className="bg-black text-stone-200 py-8 px-4 md:px-8 min-h-screen flex flex-col justify-center items-center">
            <div className="max-w-4xl w-full space-y-6">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-[#C5A253] text-[10px] sm:text-xs font-semibold tracking-[0.2em]">
                        <span className="w-6 h-[1px] bg-[#C5A253]/60"></span>
                        <span>02</span>
                        <span>OUR DESTINATION</span>
                        <span className="w-6 h-[1px] bg-[#C5A253]/60"></span>
                    </div>

                    <h2 className="text-xl md:text-3xl lg:text-4xl font-serif text-[#C5A253] tracking-wide uppercase font-light">
                        Echo – The Jungle Resort & Villa
                    </h2>

                    <p className="text-stone-400 text-xs font-light max-w-xl mx-auto leading-relaxed">
                        A cinematic escape into the heart of nature. Watch the experience unfold<br className="hidden sm:inline" /> where luxury meets wilderness.
                    </p>
                </div>

                {/* Clean Video Player */}
                <div className="relative rounded-xl overflow-hidden border border-[#C5A253]/40 shadow-xl bg-stone-900">
                    <div className="relative w-full h-[240px] sm:h-[320px] md:h-[380px] bg-black">
                        <video
                            className="w-full h-full object-cover"
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    {features.map((feature, idx) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={idx}
                                className="flex items-start space-x-3 border-l border-emerald-900/40 pl-3 py-1 lg:border-l lg:first:border-none"
                            >
                                <div className="text-[#C5A253] pt-0.5 flex-shrink-0">
                                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-stone-200 text-xs font-serif font-medium tracking-wide">
                                        {feature.title}
                                    </h4>
                                    <p className="text-stone-400 text-[11px] font-light leading-snug">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}