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

    // Pause video when scrolled out of view
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && !videoElement.paused) {
                    videoElement.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(videoElement);

        return () => {
            if (videoElement) observer.unobserve(videoElement);
        };
    }, []);

    // Toggle play/pause state manually with sound
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch((err) => console.log("Playback error:", err));
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
        <section className="bg-black text-stone-200 py-3 md:py-4 px-4 min-h-screen flex flex-col justify-center items-center overflow-hidden">
            {/* Reduced max-width to max-w-2xl for a compact laptop layout */}
            <div className="max-w-xl md:max-w-2xl w-full flex flex-col justify-center space-y-2.5">

                {/* Header Section */}
                <div className="text-center space-y-0.5 flex-shrink-0">
                    <div className="flex items-center justify-center space-x-1.5 text-[#C5A253] text-[9px] sm:text-[10px] font-semibold tracking-[0.2em]">
                        <span className="w-4 h-[1px] bg-[#C5A253]/60"></span>
                        <span>OUR DESTINATION</span>
                        <span className="w-4 h-[1px] bg-[#C5A253]/60"></span>
                    </div>

                    <h2 className="text-base sm:text-lg md:text-xl font-serif text-[#C5A253] tracking-wide uppercase font-light">
                        Echo – The Jungle Resort & Villa
                    </h2>

                    <p className="text-stone-400 text-[10px] sm:text-[11px] font-light max-w-md mx-auto leading-tight px-2">
                        A cinematic escape into the heart of nature. Watch the experience unfold<br className="hidden sm:inline" /> where luxury meets wilderness.
                    </p>
                </div>

                {/* Interactive Video Player - Max height restricted */}
                <div className="relative w-full rounded-lg overflow-hidden border border-[#C5A253]/40 shadow-lg bg-stone-900 group">
                    <div className="relative w-full aspect-video max-h-[280px] md:max-h-[320px] flex items-center justify-center bg-black mx-auto">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-contain cursor-pointer"
                            src={videoSrc}
                            loop
                            playsInline
                            onClick={togglePlay}
                        />

                        {/* Centered Overlay Play/Pause Button */}
                        <button
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause video" : "Play video"}
                            className={`absolute inset-0 m-auto w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/50 border border-[#C5A253] text-[#C5A253] flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                                }`}
                        >
                            {isPlaying ? (
                                <Pause className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-[#C5A253]" />
                            ) : (
                                <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-[#C5A253] translate-x-0.5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
                    {features.map((feature, idx) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={idx}
                                className="flex items-start space-x-1.5 border-l border-emerald-900/40 pl-2 py-0.5 lg:first:border-none"
                            >
                                <div className="text-[#C5A253] pt-0.5 flex-shrink-0">
                                    <IconComponent className="w-3.5 h-3.5 stroke-[1.5]" />
                                </div>
                                <div className="space-y-0">
                                    <h4 className="text-stone-200 text-[10px] sm:text-[11px] font-serif font-medium tracking-wide">
                                        {feature.title}
                                    </h4>
                                    <p className="text-stone-400 text-[9px] sm:text-[10px] font-light leading-tight">
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