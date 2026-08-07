import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { TbRulerMeasure } from 'react-icons/tb';

const SIZES = [
    { size: '100', dims: "30' x 30'" },
    { size: '150', dims: "30' x 45'" },
    { size: '200', dims: "30' x 60'" },
    { size: '250', dims: "30' x 75'" },
    { size: '300', dims: "30' x 90'" },
    { size: '500', dims: "30' x 150'" },
];

export default function PlotSizes() {
    return (
        <section id="plots" className="bg-white py-20 md:py-24 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="eyebrow justify-center mb-3">Plot Sizes</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-forest-dark">
                        Choose Your Ideal Plot
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
                    {SIZES.map((plot, i) => (
                        <motion.div
                            key={plot.size}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: i * 0.08, duration: 0.55 }}
                            whileHover={{ y: -6 }}
                            className="bg-ivory rounded-2xl p-6 border border-forest/5 hover:border-gold/40 hover:shadow-luxe transition-all duration-300"
                        >
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-4xl font-heading font-bold text-forest-dark">
                                    {plot.size}
                                </span>
                                <span className="text-xs tracking-widest text-ink/50 uppercase">
                                    Sq. Yd.
                                </span>
                            </div>
                            <p className="text-xs text-ink/50 mb-4">({plot.dims})</p>

                            <div className="flex items-center gap-2 text-gold/70 mb-5">
                                <TbRulerMeasure className="text-lg" />
                                <div className="h-px flex-1 bg-gradient-to-r from-gold/50 to-transparent" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-ink/40 uppercase tracking-wide">
                                        Starting From
                                    </p>
                                    <p className="text-sm font-semibold text-forest-dark">
                                        ₹ ---.-- Lakh
                                    </p>
                                </div>
                                <button className="text-xs bg-forest-dark hover:bg-gold hover:text-forest-dark text-white px-4 py-2 rounded-md transition-colors">
                                    Book
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <button className="inline-flex items-center gap-2 bg-forest-dark hover:bg-forest text-white px-7 py-3.5 rounded-md text-sm font-medium transition-transform hover:scale-[1.03]">
                        View All Plot Details <HiArrowRight />
                    </button>
                </div>
            </div>
        </section>
    );
}