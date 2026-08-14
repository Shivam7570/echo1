import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { TbCompass } from 'react-icons/tb';

const FILTERS = [
    { label: 'Plot Size', options: ['All Sizes', '100 Sq.Yd', '150 Sq.Yd', '200 Sq.Yd', '300 Sq.Yd'] },
    { label: 'Facing', options: ['All Facing', 'North', 'South', 'East', 'West'] },
    { label: 'Corner Plot', options: ['Any', 'Corner Only', 'Non-Corner'] },
    { label: 'Price Range', options: ['Any Budget', 'Under ₹20L', '₹20L–₹30L', '₹30L+'] },
];

const PLOTS = [
    {
        id: 'Plot A-12',
        area: '200 Sq. Yd.',
        facing: 'West Facing',
        price: '₹ 28.5 Lakh',
        status: 'Premium',
        img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=900&auto=format&fit=crop',
    },
    {
        id: 'Plot B-07',
        area: '150 Sq. Yd.',
        facing: 'North Facing',
        price: '₹ 22.5 Lakh',
        status: 'Available',
        img: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=900&auto=format&fit=crop',
    },
    {
        id: 'Plot C-15',
        area: '300 Sq. Yd.',
        facing: 'East Facing',
        price: '₹ 36.5 Lakh',
        status: 'Available',
        img: 'https://images.unsplash.com/photo-1592595896616-c37162298647?q=80&w=900&auto=format&fit=crop',
    },
    {
        id: 'Plot D-04',
        area: '250 Sq. Yd.',
        facing: 'South Facing',
        price: '₹ 31 Lakh',
        status: 'Few Left',
        img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=900&auto=format&fit=crop',
    },
];

const STATUS_STYLES = {
    Premium: 'bg-gold text-forest-dark',
    Available: 'bg-forest text-white',
    'Few Left': 'bg-red-500/90 text-white',
};

export default function PlotOptions() {
    const visiblePlots = useMemo(() => PLOTS, []);

    return (
        <section className="bg-ivory py-20 md:py-24 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <span className="eyebrow justify-center mb-3">Interactive Plot Options</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-forest-dark">
                        Find Your Perfect Plot
                    </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5 flex flex-wrap gap-3 mb-10">
                    {FILTERS.map((f) => (
                        <select
                            key={f.label}
                            className="flex-1 min-w-[160px] text-sm border border-forest/10 rounded-lg px-4 py-2.5 text-ink/80 bg-ivory focus:outline-none focus:ring-1 focus:ring-gold"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                {f.label}
                            </option>
                            {f.options.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    ))}
                </div>

                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="!pb-2"
                >
                    {visiblePlots.map((plot, i) => (
                        <SwiperSlide key={plot.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-luxe transition-shadow duration-300 h-full flex flex-col"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={plot.img}
                                        alt={plot.id}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    <span
                                        className={`absolute top-3 left-3 text-[10px] font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[plot.status]}`}
                                    >
                                        {plot.status}
                                    </span>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-heading text-lg font-semibold text-forest-dark">
                                            {plot.id}
                                        </h3>
                                        <span className="text-sm font-semibold text-gold">{plot.price}</span>
                                    </div>
                                    <p className="text-xs text-ink/60 mb-1">{plot.area}</p>
                                    <p className="text-xs text-ink/60 flex items-center gap-1">
                                        <TbCompass className="text-forest" /> {plot.facing}
                                    </p>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}