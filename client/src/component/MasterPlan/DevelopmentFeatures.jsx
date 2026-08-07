import React from 'react';
import { motion } from 'framer-motion';
import { TbRoad, TbShieldLock, TbLeaf, TbBolt, TbBuildingSkyscraper } from 'react-icons/tb';

const FEATURES = [
    {
        icon: TbRoad,
        title: 'Wide Internal Roads',
        desc: "Well-planned 30 ft. & 40 ft. wide roads for smooth connectivity.",
        img: 'https://plus.unsplash.com/premium_photo-1664547606209-fb31ec979c85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2lkZSUyMEludGVybmFsJTIwUm9hZHN8ZW58MHx8MHx8fDA%3D',
    },
    {
        icon: TbShieldLock,
        title: '24x7 Security',
        desc: 'Gated community with 24x7 security, CCTV surveillance & trained staff.',
        img: 'https://www.knssamooha.net.in/images/project/24-7-cctv-and-security-infrastructure-at-kns-samooha.webp',
    },
    {
        icon: TbLeaf,
        title: 'Landscaping',
        desc: 'Beautifully landscaped parks, avenues, gardens & open green spaces.',
        img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop',
    },
    {
        icon: TbBolt,
        title: 'Utilities',
        desc: 'Underground electricity, water supply, drainage & other essential utilities.',
        img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    },
    {
        icon: TbBuildingSkyscraper,
        title: 'Infrastructure',
        desc: 'Modern infrastructure with streetlights, signage & well-developed amenities.',
        img: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800&auto=format&fit=crop',
    },
];

export default function DevelopmentFeatures() {
    return (
        <section id="amenities" className="bg-white py-20 md:py-24 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="eyebrow justify-center mb-3">Infrastructure</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-forest-dark">
                        Development Features
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
                    {FEATURES.map(({ icon: Icon, title, desc, img }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: i * 0.1, duration: 0.55 }}
                            whileHover={{ y: -6 }}
                            className="rounded-2xl overflow-hidden bg-ivory shadow-sm hover:shadow-luxe transition-shadow duration-300 group"
                        >
                            <div className="relative h-32 overflow-hidden">
                                <img
                                    src={img}
                                    alt={title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-forest-dark/30" />
                                <div className="absolute bottom-2 left-2 w-9 h-9 rounded-lg bg-gold flex items-center justify-center text-forest-dark text-lg">
                                    <Icon />
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-heading text-base font-semibold text-forest-dark mb-1">
                                    {title}
                                </h3>
                                <p className="text-xs text-ink/60 leading-relaxed">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}