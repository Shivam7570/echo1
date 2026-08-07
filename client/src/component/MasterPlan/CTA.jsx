import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendar } from 'react-icons/hi';
import { TbHeadset } from 'react-icons/tb';

export default function CTA() {
    return (
        <section id="investment" className="relative py-20 md:py-24 px-6 md:px-10 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
                    alt="Echo aerial luxury development"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-forest-dark/85" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 max-w-3xl mx-auto text-center"
            >
                <h2 className="text-3xl md:text-5xl font-heading font-semibold text-white mb-4 leading-tight">
                    Invest Today. Build Tomorrow. Enjoy Forever.
                </h2>
                <p className="text-white/70 text-sm md:text-base mb-9">
                    Own premium land inside Echo – The Jungle Resort &amp; Villa.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <button className="bg-gold hover:bg-gold/90 text-forest-dark font-semibold px-7 py-3.5 rounded-md text-sm flex items-center gap-2 transition-transform hover:scale-[1.03]">
                        Book a Site Visit <HiOutlineCalendar />
                    </button>
                    <button className="border border-white/50 hover:border-gold hover:text-gold text-white px-7 py-3.5 rounded-md text-sm flex items-center gap-2 transition-colors">
                        Talk to Our Expert <TbHeadset />
                    </button>
                </div>
            </motion.div>
        </section>
    );
}