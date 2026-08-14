import React, { useState } from 'react';
import { ChevronDown, Send, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitEnquiry } from '../../lib/api';

export default function OverviewS2() {
    // Popup modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // Form state handling
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        preferredPlot: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOpenModalWithPlot = (plotName) => {
        if (plotName) {
            setFormData(prev => ({ ...prev, preferredPlot: plotName }));
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            await submitEnquiry({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                preferredPlot: formData.preferredPlot,
                message: formData.message,
                source: 'masterplan'
            });

            setSubmitSuccess(true);
            setFormData({ name: '', email: '', phone: '', preferredPlot: '', message: '' });
            setTimeout(() => {
                setSubmitSuccess(false);
                setIsModalOpen(false);
            }, 2500);
        } catch (err) {
            console.error('Enquiry submission error:', err);
            setSubmitError(err.message || 'Failed to submit enquiry. Please check your internet connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Left side data: Updated to 4 plot sizes
    const plotSizes = [
        { size: '126', dimensions: "₹ 28 lakh", label: "126 Sq. Yd." },
        { size: '145', dimensions: "₹ 40 lakh", label: "145 Sq. Yd." },
        { size: '188', dimensions: "₹ 52.5 lakh", label: "188 Sq. Yd." },
        { size: '220', dimensions: "₹ 61.5 lakh", label: "220 Sq. Yd." },
    ];

    // Right side data: Updated to 4 interactive plot cards
    const interactivePlots = [
        {
            id: 'Plot A-12',
            price: '₹ 28 Lakh',
            size: '126 Sq. Yd.',

            badge: 'Premium',
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=500',
        },
        {
            id: 'Plot B-07',
            price: '₹ 40 Lakh',
            size: '145 Sq. Yd.',
            facing: 'North Facing',
            badge: null,
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=500',
        },
        {
            id: 'Plot C-15',
            price: '₹ 52.5 Lakh',
            size: '188 Sq. Yd.',
            facing: 'East Facing',
            badge: null,
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=500',
        },
        {
            id: 'Plot D-04',
            price: '₹ 61.5 Lakh',
            size: '220 Sq. Yd.',
            facing: 'South Facing',
            badge: 'Popular',
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=500',
        },
    ];

    return (
        <div className="min-h-screen bg-[#FAF7F2] p-4 md:p-8 flex items-center justify-center font-sans relative">
            <div className="max-w-6xl w-full flex flex-col gap-6">

                {/* TOP GRID: PLOT SIZES & INTERACTIVE PLOTS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* LEFT CARD: AVAILABLE PLOT SIZES */}
                    <div className="lg:col-span-5 bg-[#FAF7F2] border border-stone-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            {/* Title Header */}
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-serif text-[#1C3026] font-bold tracking-wider">
                                    AVAILABLE PLOT SIZES
                                </h2>
                                <div className="flex items-center justify-center space-x-2 text-amber-700/60 my-2">
                                    <span className="h-[1px] w-12 bg-amber-700/30" />
                                    <span className="text-xs">🍃 🍃</span>
                                    <span className="h-[1px] w-12 bg-amber-700/30" />
                                </div>
                            </div>

                            {/* 2x2 Grid for 4 Plot Sizes */}
                            <div className="grid grid-cols-2 gap-3">
                                {plotSizes.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleOpenModalWithPlot(item.label)}
                                        className="bg-[#FAF7F2] border border-stone-200 rounded-xl p-3 text-center flex flex-col items-center justify-between shadow-2xs hover:border-amber-700/40 transition-colors cursor-pointer group"
                                    >
                                        <div>
                                            <div className="text-2xl font-serif font-bold text-[#1C3026] group-hover:text-amber-800 transition-colors">
                                                {item.size}
                                            </div>
                                            <div className="text-[10px] font-bold text-slate-700 tracking-wider">
                                                SQ. YD.
                                            </div>
                                            <div className="text-[10px] text-slate-500 font-medium my-0.5">
                                                ({item.dimensions})
                                            </div>
                                        </div>

                                        {/* Abstract Plot Schematic SVG */}
                                        <div className="w-full mt-2 pt-1 border-t border-stone-200/60 flex items-center justify-center">
                                            <div className="w-full h-5 border border-stone-300 rounded-xs bg-[#F3EEE5] relative flex items-center justify-between px-1">
                                                <span className="w-1 h-1 rounded-full bg-emerald-800/40"></span>
                                                <span className="w-1 h-1 rounded-full bg-amber-800/40"></span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CARD: INTERACTIVE PLOT OPTIONS */}
                    <div className="lg:col-span-7 bg-[#FAF7F2] border border-stone-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            {/* Title Header */}
                            <div className="text-center mb-5">
                                <h2 className="text-xl font-serif text-[#1C3026] font-bold tracking-wider">
                                    INTERACTIVE PLOT OPTIONS
                                </h2>
                                <div className="flex items-center justify-center space-x-2 text-amber-700/60 my-2">
                                    <span className="h-[1px] w-12 bg-amber-700/30" />
                                    <span className="text-xs">🍃 🍃</span>
                                    <span className="h-[1px] w-12 bg-amber-700/30" />
                                </div>
                            </div>

                            {/* Filter Dropdowns */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
                                {['Plot Size', 'Plot Type', 'Facing', 'Price Range'].map((filter, idx) => (
                                    <div key={idx} className="relative">
                                        <select className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md py-1.5 px-2.5 text-[11px] font-medium text-slate-700 appearance-none focus:outline-none focus:border-[#1C3026] cursor-pointer">
                                            <option>{filter}</option>
                                        </select>
                                        <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2.5 pointer-events-none" />
                                    </div>
                                ))}
                            </div>

                            {/* Grid for 4 Interactive Plots */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {interactivePlots.map((plot, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleOpenModalWithPlot(plot.id + ' (' + plot.size + ')')}
                                        className="bg-[#FAF7F2] border border-stone-200 rounded-xl overflow-hidden shadow-2xs flex flex-col justify-between hover:border-amber-700/50 transition-colors cursor-pointer group"
                                    >
                                        <div>
                                            {/* Image Container with Badge */}
                                            <div className="relative h-28 w-full bg-slate-200 overflow-hidden">
                                                <img
                                                    src={plot.image}
                                                    alt={plot.id}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                {plot.badge && (
                                                    <span className="absolute top-2 left-2 bg-amber-500/90 text-white text-[9px] font-semibold px-2 py-0.5 rounded shadow-xs">
                                                        {plot.badge}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content Details */}
                                            <div className="p-2.5 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-[#1C3026] font-serif group-hover:text-amber-800 transition-colors">
                                                        {plot.id}
                                                    </span>
                                                    <span className="text-xs font-bold text-[#1C3026]">
                                                        {plot.price}
                                                    </span>
                                                </div>

                                                <div className="text-[10px] text-slate-600 font-medium">
                                                    {plot.size}
                                                </div>

                                                <div className="text-[10px] text-slate-500">
                                                    {plot.facing}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* SINGLE ENQUIRY BUTTON */}
                <div className="flex justify-center pt-2">
                    <button
                        onClick={() => handleOpenModalWithPlot('')}
                        className="bg-[#0B2219] hover:bg-[#143125] text-white font-medium py-3 px-8 rounded-lg text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center space-x-2"
                    >
                        <span>Enquire Now</span>
                        <Send className="w-4 h-4 text-amber-300" />
                    </button>
                </div>

            </div>

            {/* POPUP ENQUIRY MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-[#FAF7F2] border border-stone-200/80 rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-serif text-[#1C3026] font-bold tracking-wider">
                                ENQUIRE ABOUT A PLOT
                            </h2>
                            <div className="flex items-center justify-center space-x-2 text-amber-700/60 my-2">
                                <span className="h-[1px] w-12 bg-amber-700/30" />
                                <span className="text-xs">🍃 🍃</span>
                                <span className="h-[1px] w-12 bg-amber-700/30" />
                            </div>
                            <p className="text-xs text-slate-600 mt-1">
                                Fill out the form below and our team will contact you shortly.
                            </p>
                        </div>

                        {/* Status Banners */}
                        {submitSuccess && (
                            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Thank you! Your enquiry has been saved successfully. We will reach out soon.</span>
                            </div>
                        )}

                        {submitError && (
                            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-md text-xs flex items-center space-x-2">
                                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>{submitError}</span>
                            </div>
                        )}

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="space-y-3.5">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name *"
                                    required
                                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md py-2.5 px-3 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#1C3026]"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address *"
                                    required
                                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md py-2.5 px-3 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#1C3026]"
                                />
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number *"
                                    required
                                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md py-2.5 px-3 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#1C3026]"
                                />
                            </div>

                            <div className="relative">
                                <select
                                    name="preferredPlot"
                                    value={formData.preferredPlot}
                                    onChange={handleChange}
                                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md py-2.5 px-3 text-xs text-slate-700 appearance-none focus:outline-none focus:border-[#1C3026] cursor-pointer"
                                >
                                    <option value="">Preferred Size / Plot</option>
                                    <option value="126 Sq. Yd.">126 Sq. Yd.</option>
                                    <option value="145 Sq. Yd.">145 Sq. Yd.</option>
                                    <option value="188 Sq. Yd.">188 Sq. Yd.</option>
                                    <option value="220 Sq. Yd.">220 Sq. Yd.</option>
                                    <option value="Plot A-12 (126 Sq. Yd.)">Plot A-12 (126 Sq. Yd.)</option>
                                    <option value="Plot B-07 (145 Sq. Yd.)">Plot B-07 (145 Sq. Yd.)</option>
                                    <option value="Plot C-15 (188 Sq. Yd.)">Plot C-15 (188 Sq. Yd.)</option>
                                    <option value="Plot D-04 (220 Sq. Yd.)">Plot D-04 (220 Sq. Yd.)</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Any specific requirements or notes..."
                                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-md py-2.5 px-3 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#1C3026] resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#0B2219] hover:bg-[#143125] disabled:bg-[#0B2219]/70 text-white text-xs font-medium py-3 rounded-md flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Submit Enquiry</span>
                                            <Send className="w-3.5 h-3.5 text-amber-300" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}