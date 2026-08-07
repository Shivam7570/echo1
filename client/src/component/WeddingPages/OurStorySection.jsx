import React from 'react';

export const OurStorySection = () => {
    const timeline = [
        'First Consultation',
        'Venue Visit',
        'Wedding Planning',
        'Decoration Setup',
        'Wedding Ceremony',
        'Reception Celebration',
        'Happily Ever After',
    ];

    return (
        <section className="bg-[#0F1E19] text-white">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3">
                <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop"
                    alt="Wedding Couple"
                    className="w-full h-[500px] object-cover"
                />

                <div className="p-10 flex flex-col justify-center">
                    <span className="text-amber-400 text-xs tracking-widest uppercase">Our Wedding Story</span>
                    <h2 className="text-3xl font-serif mt-2 mb-6">
                        Every Love Story Deserves a Beautiful Beginning
                    </h2>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        Imagine exchanging vows beneath a canopy of towering trees, with soft sunlight filtering through the leaves and your loved ones gathered around. From your first consultation to your final farewell, our dedicated wedding specialists ensure every moment is thoughtfully planned and beautifully executed.
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Whether you dream of an intimate celebration or a grand destination wedding, Echo transforms your vision into unforgettable memories. Every ceremony, every smile, and every celebration becomes a cherished chapter in your unique love story.
                    </p>
                </div>

                <div className="bg-[#152922] p-10 flex flex-col justify-center gap-4">
                    {timeline.map((step, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                            <span className="w-7 h-7 rounded-full bg-amber-600/20 border border-amber-500 flex items-center justify-center text-xs">
                                {i + 1}
                            </span>
                            <span>{step}</span>
                            {i !== timeline.length - 1 && (
                                <span className="ml-auto text-amber-500">↓</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};