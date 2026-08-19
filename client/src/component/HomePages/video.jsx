import React, { useRef, useState, useEffect } from 'react';
import {
    Leaf,
    Home,
    Mountain,
    ShieldCheck,
    Play,
    Pause
} from 'lucide-react';

import videoSrc from '/video.mp4';

export default function Video() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Auto play/pause video when it scrolls in/out of view
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoElement.play()
                        .then(() => setIsPlaying(true))
                        .catch(() => setIsPlaying(false)); // Handles browser autoplay restrictions
                } else {
                    videoElement.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.5 } // Triggers when 50% of the video is visible
        );

        observer.observe(videoElement);

        return () => {
            if (videoElement) observer.unobserve(videoElement);
        };
    }, []);

    // Toggle play/pause state manually
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

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

                {/* Interactive Video Player */}
                <div className="relative rounded-xl overflow-hidden border border-[#C5A253]/40 shadow-xl bg-stone-900 group">
                    <div className="relative w-full h-[240px] sm:h-[320px] md:h-[380px] bg-black">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover cursor-pointer"
                            src={videoSrc}
                            loop

                            playsInline
                            onClick={togglePlay}
                        />

                        {/* Centered Overlay Play/Pause Button */}
                        <button
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause video" : "Play video"}
                            className={`absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/50 border border-[#C5A253] text-[#C5A253] flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                                }`}
                        >
                            {isPlaying ? (
                                <Pause className="w-8 h-8 fill-[#C5A253]" />
                            ) : (
                                <Play className="w-8 h-8 fill-[#C5A253] translate-x-0.5" />
                            )}
                        </button>
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