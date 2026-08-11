import React, { useState } from 'react';
import { ArrowRight, Utensils, Camera, Flower2, Home, X } from 'lucide-react';
import { submitResortEnquiry } from '../../lib/api';

export default function RSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitResortEnquiry({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: `Preferred Visit Date: ${formData.preferredDate}`,
                source: 'resort-site-visit'
            });
            alert("Thank you! Your site visit request has been received.");
            setIsModalOpen(false);
            setFormData({ name: '', email: '', phone: '', preferredDate: '' });
        } catch (err) {
            alert('Error: ' + (err.message || 'Failed to submit booking.'));
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-[#070b07] text-white font-serif overflow-hidden flex flex-col justify-between">

            {/* Background Image with Dark Gradient Overlays */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/src/assets/ResortHero.png')`
                }}
            >
                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#040804] via-[#040804]/80 via-40% to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040804] via-transparent to-[#040804]/50" />
            </div>

            {/* Main Content Overlay */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full flex-1 flex flex-col justify-between">

                {/* Hero Body Content */}
                <div className="max-w-xl py-12 space-y-6">

                    {/* Main Title Heading */}
                    <div className="space-y-1">
                        <h1 className="text-5xl md:text-6xl font-light tracking-wide text-white">
                            DISCOVER
                        </h1>
                        <h1 className="text-5xl md:text-6xl font-light tracking-wide text-[#c29b4b]">
                            THE DESTINATION
                        </h1>
                    </div>

                    {/* Decorative Gold Divider */}
                    <div className="flex items-center gap-3 w-48 py-1">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#c29b4b] to-transparent" />
                        <span className="text-[#c29b4b] text-xs">❖</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-[#c29b4b] to-transparent" />
                    </div>

                    {/* Subtitle & Body Text */}
                    <div className="space-y-3 font-sans">
                        <h3 className="text-xl md:text-2xl font-serif text-amber-100/90 font-normal">
                            Where Luxury Meets Nature
                        </h3>
                        {/* Paragraph updated with Times New Roman font */}
                        <p
                            className="text-xs md:text-sm text-stone-300 font-light leading-relaxed max-w-md"
                            style={{ fontFamily: "'Times New Roman', Times, serif" }}
                        >
                            Immerse yourself in the lap of wilderness with world-class villas, curated experiences, and unforgettable moments.
                        </p>
                    </div>

                    {/* Icon Features Grid */}
                    <div className="grid grid-cols-4 gap-4 pt-6 pb-2 border-t border-stone-800/80 font-sans">

                        {/* Feature 1 */}
                        <div className="flex flex-col items-center text-center space-y-2 border-r border-stone-800/80 pr-2">
                            <Home className="w-6 h-6 text-[#c29b4b] stroke-[1.25]" />
                            <span className="text-[10px] tracking-wider text-amber-100 uppercase font-medium leading-tight">
                                LUXURY<br />VILLAS
                            </span>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col items-center text-center space-y-2 border-r border-stone-800/80 pr-2">
                            <Utensils className="w-6 h-6 text-[#c29b4b] stroke-[1.25]" />
                            <span className="text-[10px] tracking-wider text-amber-100 uppercase font-medium leading-tight">
                                FINE<br />DINING
                            </span>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex flex-col items-center text-center space-y-2 border-r border-stone-800/80 pr-2">
                            <Flower2 className="w-6 h-6 text-[#c29b4b] stroke-[1.25]" />
                            <span className="text-[10px] tracking-wider text-amber-100 uppercase font-medium leading-tight">
                                WELLNESS &<br />REJUVENATION
                            </span>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex flex-col items-center text-center space-y-2">
                            <Camera className="w-6 h-6 text-[#c29b4b] stroke-[1.25]" />
                            <span className="text-[10px] tracking-wider text-amber-100 uppercase font-medium leading-tight">
                                EXPERIENCES<br />TO REMEMBER
                            </span>
                        </div>

                    </div>

                    {/* Call-to-Action Button */}
                    <div className="pt-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 bg-[#c29b4b] hover:bg-[#a8833b] text-stone-950 font-sans font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded-sm transition cursor-pointer shadow-lg"
                        >
                            <span>BOOK A SITE VISIT</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>

                {/* Empty bottom spacer for balance */}
                <div />

            </div>

            {/* ================= BOOK A SITE VISIT POPUP MODAL ================= */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                    <div className="relative w-full max-w-md bg-[#0d140e] border border-[#c29b4b]/40 rounded-lg p-6 md:p-8 shadow-2xl text-stone-200 font-sans">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-stone-400 hover:text-white transition"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Header */}
                        <div className="text-center mb-6 space-y-1">
                            <h2 className="text-2xl font-serif text-[#c29b4b] font-normal tracking-wide">
                                Book a Site Visit
                            </h2>
                            <p className="text-xs text-stone-400 font-light">
                                Schedule your exclusive walkthrough experience with us.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-amber-100/80 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className="w-full bg-[#040804] border border-stone-800 rounded px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-[#c29b4b] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-amber-100/80 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="name@example.com"
                                    className="w-full bg-[#040804] border border-stone-800 rounded px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-[#c29b4b] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-amber-100/80 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91 00000 00000"
                                    className="w-full bg-[#040804] border border-stone-800 rounded px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-[#c29b4b] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-amber-100/80 mb-1">
                                    Preferred Visit Date
                                </label>
                                <input
                                    type="date"
                                    name="preferredDate"
                                    required
                                    value={formData.preferredDate}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#040804] border border-stone-800 rounded px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-[#c29b4b] transition [color-scheme:dark]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 bg-[#c29b4b] hover:bg-[#a8833b] text-stone-950 font-semibold text-xs tracking-wider uppercase py-3 rounded transition cursor-pointer shadow-md"
                            >
                                Confirm Booking
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}