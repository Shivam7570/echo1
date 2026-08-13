import React, { useState } from 'react';
import { submitEnquiry } from '../../lib/api';
import {
    ArrowRight,
    Download,
    Calendar,
    X,
    User,
    Mail,
    Phone,
    MapPin,
    Building2,
    Send
} from 'lucide-react';
import contactHero from "../../assets/contactHero.jpg";


export default function ContactHero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state used for both inline and modal forms
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        resortType: '',
        preferredDate: '',
    });

    // Handle Form Inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit Handler for Site Visit / Contact
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitEnquiry({
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                resortName: formData.resortType,
                visitDate: formData.preferredDate,
                source: 'contact-page'
            });
            alert(`Thank you ${formData.fullName}! Your request has been received.`);
            setIsModalOpen(false);
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                city: '',
                resortType: '',
                preferredDate: '',
            });
        } catch (err) {
            alert('Error: ' + (err.message || 'Failed to submit enquiry.'));
        }
    };

    // Download Brochure Handler
    const handleDownloadBrochure = () => {
        const pdfUrl = 'https://drive.google.com/uc?export=download&id=1_KTN2gb4tdGVJmWOiidoQd4F01Tp5jud';
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="relative min-h-screen w-full bg-stone-950 text-white font-sans overflow-hidden flex flex-col justify-center">

            {/* Background Image with Dark Vignette Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%), linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%), url(${contactHero})`
                }}
            />

            {/* Main Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-12 flex flex-col justify-between min-h-screen">

                {/* Top Empty Space */}
                <div className="h-12"></div>

                {/* Center Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">

                    {/* Left Text Block */}
                    <div className="lg:col-span-7 space-y-6">

                        <p className="font-serif italic text-2xl md:text-3xl text-[#D4A359] font-light">
                            Get In Touch
                        </p>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-100 tracking-wide font-normal leading-[1.15]">
                            Let’s Build <br />
                            <span className="text-stone-100">Something </span> <br />
                            <span className="text-[#D4A359]">Extraordinary</span>
                        </h1>

                        <p className="text-stone-300/90 text-sm md:text-base leading-relaxed max-w-lg font-light pt-2">
                            Whether it’s a luxurious villa, a smart investment, or a dream wedding, we’re here to help you create unforgettable experiences.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-4">

                            {/* Primary CTA (Opens Form Modal) */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#D4A359] hover:bg-[#c29249] text-stone-950 font-bold text-xs tracking-wider px-6 py-3.5 rounded-lg shadow-lg flex items-center space-x-2 transition-all uppercase cursor-pointer"
                            >
                                <span>SCHEDULE A SITE VISIT</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            {/* Secondary CTA (Downloads Brochure) */}
                            <button
                                onClick={handleDownloadBrochure}
                                className="bg-stone-900/40 hover:bg-stone-900/80 border border-stone-500/60 backdrop-blur-md text-stone-200 font-bold text-xs tracking-wider px-6 py-3.5 rounded-lg flex items-center space-x-2 transition-all uppercase cursor-pointer"
                            >
                                <span>DOWNLOAD BROCHURE</span>
                                <Download className="w-4 h-4 text-stone-300" />
                            </button>
                        </div>

                    </div>

                    {/* Right Side - Embedded Contact Form */}
                    <div className="lg:col-span-5">
                        <div className="bg-[#181816]/90 border border-[#D4A359]/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl text-stone-100">
                            <div className="text-center mb-6 space-y-1">
                                <p className="font-serif italic text-[#D4A359] text-sm">Send Us A Message</p>
                                <h3 className="text-2xl font-serif text-stone-100 uppercase tracking-wider">Book An Enquiry</h3>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-3.5">
                                <div className="relative">
                                    <User className="w-4 h-4 absolute left-3 top-3 text-[#D4A359]" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#D4A359]"
                                    />
                                </div>

                                <div className="relative">
                                    <Mail className="w-4 h-4 absolute left-3 top-3 text-[#D4A359]" />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#D4A359]"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="relative">
                                        <Phone className="w-4 h-4 absolute left-3 top-3 text-[#D4A359]" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#D4A359]"
                                        />
                                    </div>

                                    <div className="relative">
                                        <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#D4A359]" />
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="Your City"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#D4A359]"
                                        />
                                    </div>
                                </div>

                                    <div className="relative">
                                        <Building2 className="w-4 h-4 absolute left-3 top-3 text-[#D4A359]" />
                                        <select
                                            name="resortType"
                                            value={formData.resortType}
                                            onChange={handleInputChange}
                                            className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-300 focus:outline-none focus:border-[#D4A359] appearance-none"
                                        >
                                            <option value="">Resort Type</option>
                                            <option value="Deer Meadow Suites">Deer Meadow Suites</option>
                                            <option value="Gazelle Retreat">Gazelle Retreat</option>
                                            <option value="Leopard Crest Suites">Leopard Crest Suites</option>
                                            <option value="Tusker Havens">Tusker Havens</option>
                                            <option value="Tiger Apex Pavilions">Tiger Apex Pavilions</option>
                                        </select>
                                    </div>

                                <button
                                    type="submit"
                                    className="w-full mt-2 bg-[#D4A359] hover:bg-[#c29249] text-stone-950 font-bold text-xs tracking-widest py-3 rounded-lg transition-all uppercase flex items-center justify-center space-x-2 cursor-pointer"
                                >
                                    <span>SUBMIT ENQUIRY</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Bottom Empty Space */}
                <div className="h-12"></div>

            </div>

            {/* Floating Vertical "ENQUIRE NOW" Tab */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#D4A359] hover:bg-[#c29249] text-stone-950 font-bold text-xs tracking-widest px-3 py-5 rounded-l-xl shadow-2xl flex flex-col items-center space-y-3 transition-all cursor-pointer"
            >
                <Calendar className="w-4 h-4" />
                <span className="[writing-mode:vertical-rl] rotate-180 uppercase">
                    ENQUIRE NOW
                </span>
            </button>

            {/* Site Visit Modal Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-[#181816] border border-[#D4A359]/30 rounded-2xl w-full max-w-lg p-6 md:p-8 relative shadow-2xl text-stone-100">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-stone-400 hover:text-stone-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Heading */}
                        <div className="text-center mb-6 space-y-1">
                            <p className="font-serif italic text-[#D4A359] text-sm">Schedule Your Experience</p>
                            <h3 className="text-2xl font-serif text-stone-100 uppercase tracking-wider">Book A Site Visit</h3>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleFormSubmit} className="space-y-3.5">

                            <div className="relative">
                                <User className="w-4 h-4 absolute left-3 top-3 text-[#D4A359]" />
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#D4A359]"
                                />
                            </div>

                            <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3 top-3 text-[#D4A359]" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#D4A359]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="relative">
                                    <Phone className="w-4 h-4 absolute left-3 top-3 text-[#D4A359]" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#D4A359]"
                                    />
                                </div>

                                <div className="relative">
                                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#D4A359]" />
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="Your City"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#D4A359]"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <Building2 className="w-4 h-4 absolute left-3 top-3 text-[#D4A359]" />
                                <select
                                    name="resortType"
                                    value={formData.resortType}
                                    onChange={handleInputChange}
                                    className="w-full bg-stone-900/80 border border-stone-700/80 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-300 focus:outline-none focus:border-[#D4A359] appearance-none"
                                >
                                    <option value="">Select Resort Type</option>
                                    <option value="Deer Meadow Suites">Deer Meadow Suites</option>
                                    <option value="Gazelle Retreat">Gazelle Retreat</option>
                                    <option value="Leopard Crest Suites">Leopard Crest Suites</option>
                                    <option value="Tusker Havens">Tusker Havens</option>
                                    <option value="Tiger Apex Pavilions">Tiger Apex Pavilions</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 bg-[#D4A359] hover:bg-[#c29249] text-stone-950 font-bold text-xs tracking-widest py-3 rounded-lg transition-all uppercase flex items-center justify-center space-x-2"
                            >
                                <span>CONFIRM SITE VISIT</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}