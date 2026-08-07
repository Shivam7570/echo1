import React from "react";

export default function Section4() {
    return (
        <section
            id="master-plan"
            className="py-4 px-6 bg-[#F4EFE6]"
        >
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16">
                    <span className="uppercase tracking-[5px] text-[#C6A15B] text-sm">
                        Site Layout
                    </span>

                    <h2
                        className="text-5xl font-serif mt-4 text-[#16241C]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Master Plan
                    </h2>

                    <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
                        A thoughtfully designed layout blending luxury living with the
                        surrounding forest landscape.
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-3xl shadow-2xl group">

                    <img
                        src="https://www.echothejungle.com/wp-content/uploads/2020/02/ECCHO-scaled.png"
                        alt="Master Plan"
                        className="w-full transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

                        <a
                            href="https://www.echothejungle.com/wp-content/uploads/2020/02/ECCHO-scaled.png"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full bg-[#C6A15B] text-[#16241C] font-semibold hover:scale-105 transition"
                        >
                            Explore Full Master Plan
                        </a>

                    </div>

                </div>

            </div>
        </section>
    );
}