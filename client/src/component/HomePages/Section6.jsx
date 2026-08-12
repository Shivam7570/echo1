import React, { useState } from 'react';
import { submitEnquiry } from '../../lib/api';
import {
    User,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Pencil,
    ShieldCheck,
    Leaf,
    Sparkles,
    TrendingUp,
    Home,
    Headphones
} from 'lucide-react';

export default function Section6() {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        emailAddress: '',
        city: '',
        visitDate: '',
        visitTime: '',
        message: '',
        agreed: false
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const [status, setStatus] = useState({ loading: false, error: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: '' });
        try {
            await submitEnquiry({
                name: formData.fullName,
                phone: formData.mobileNumber,
                email: formData.emailAddress,
                city: formData.city,
                visitDate: formData.visitDate,
                visitTime: formData.visitTime,
                message: formData.message,
                source: 'home'
            });
            setStatus({ loading: false, error: '' });
            setSubmitted(true);
            setFormData({
                fullName: '', mobileNumber: '', emailAddress: '', city: '', visitDate: '', visitTime: '', message: '', agreed: false
            });
        } catch (err) {
            setStatus({ loading: false, error: err.message || 'Failed to send request. Please try again.' });
            alert('Error: ' + (err.message || 'Failed to send.'));
        }
    };

    const features = [
        {
            icon: <Calendar className="w-6 h-6 text-amber-400" />,
            title: 'Personalized Site Tour',
            desc: 'Guided tour of resort, villas & amenities'
        },
        {
            icon: <MapPin className="w-6 h-6 text-amber-400" />,
            title: 'Prime Location Experience',
            desc: 'See the serene surroundings and connectivity'
        },
        {
            icon: <Home className="w-6 h-6 text-amber-400" />,
            title: 'Explore Luxury Villas',
            desc: 'View villa options and master plan layout'
        },
        {
            icon: <Headphones className="w-6 h-6 text-amber-400" />,
            title: 'Expert Consultation',
            desc: 'Get all your queries answered by our experts'
        }
    ];

    const bottomBadges = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-amber-400" />,
            title: 'Safe & Secure',
            desc: 'Gated community with 24/7 security'
        },
        {
            icon: <Leaf className="w-8 h-8 text-amber-400" />,
            title: 'Nature Surroundings',
            desc: 'Lush greenery and peaceful environment'
        },
        {
            icon: <Sparkles className="w-8 h-8 text-amber-400" />,
            title: 'Premium Amenities',
            desc: 'World-class amenities for a luxurious lifestyle'
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-amber-400" />,
            title: 'Great Investment',
            desc: 'High appreciation potential in a prime location'
        }
    ];

    return (
        <div className="min-h-screen bg-[#071D12] text-white font-sans flex flex-col justify-between relative overflow-hidden">

            {/* Top Main Section with Background Image */}
            <div
                className="relative flex-1 bg-cover bg-center py-10 px-6 lg:px-16"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(7, 29, 18, 0.92) 0%, rgba(7, 29, 18, 0.75) 50%, rgba(7, 29, 18, 0.6) 100%), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920')`
                }}
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    {/* Left Column - Hero Content */}
                    <div className="lg:col-span-6 space-y-6">
                        <div>
                            <div className="flex items-center space-x-2 text-amber-400 text-xs tracking-[0.25em] font-semibold uppercase mb-2">
                                <span className="h-[1px] w-6 bg-amber-400/60" />
                                <span>Visit & Experience</span>
                                <span className="h-[1px] w-6 bg-amber-400/60" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide leading-tight">
                                Book A Site Visit
                            </h1>
                            <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">
                                Experience the perfect blend of nature and luxury. Visit Echo – The Jungle Resort & Villa and explore your future investment.
                            </p>
                        </div>

                        {/* Feature Item List */}
                        <div className="space-y-4 pt-1">
                            {features.map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-4 group">
                                    <div className="w-10 h-10 rounded-full bg-[#0E2C1E]/80 border border-amber-500/30 flex items-center justify-center flex-shrink-0 backdrop-blur-sm group-hover:border-amber-400 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white tracking-wide">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-slate-300">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Compact Booking Form */}
                    <div className="lg:col-span-6">
                        <div className="bg-[#FAF8F5] text-slate-800 rounded-2xl p-5 md:p-6 shadow-2xl border border-stone-200">

                            <div className="text-center mb-4">
                                <div className="text-amber-600 text-xs font-serif tracking-widest uppercase mb-0.5">
                                    ✦
                                </div>
                                <h2 className="text-lg md:text-xl font-serif text-slate-900 tracking-wider">
                                    Book a Free Consultation
                                </h2>
                                <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs mx-auto">
                                    Fill in your details and our team will get in touch.
                                </p>
                            </div>

                            {submitted ? (
                                <div className="py-10 text-center space-y-3">
                                    <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto text-lg font-bold">
                                        ✓
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-900">Thank You!</h3>
                                    <p className="text-xs text-slate-600 max-w-xs mx-auto">
                                        Your site visit request has been received. Our team will contact you shortly.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSubmitted(false)}
                                        className="mt-2 text-xs text-amber-700 underline font-medium cursor-pointer"
                                    >
                                        Book another visit
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                                    {status.error && (
                                        <div className="bg-rose-50 border border-rose-200 text-rose-600 px-3 py-2 rounded-md text-xs">
                                            {status.error}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-slate-700 font-medium mb-1">
                                                Full Name <span className="text-rose-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    placeholder="Enter full name"
                                                    className="w-full bg-[#F4F1EA] text-slate-800 rounded-md py-2 pr-8 pl-3 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400"
                                                />
                                                <User className="absolute right-2.5 top-2.5 text-slate-400 w-3.5 h-3.5" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-slate-700 font-medium mb-1">
                                                Mobile Number <span className="text-rose-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="mobileNumber"
                                                    required
                                                    value={formData.mobileNumber}
                                                    onChange={handleChange}
                                                    placeholder="Enter mobile number"
                                                    className="w-full bg-[#F4F1EA] text-slate-800 rounded-md py-2 pr-8 pl-3 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400"
                                                />
                                                <Phone className="absolute right-2.5 top-2.5 text-slate-400 w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-slate-700 font-medium mb-1">
                                                Email Address <span className="text-rose-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="emailAddress"
                                                    required
                                                    value={formData.emailAddress}
                                                    onChange={handleChange}
                                                    placeholder="Enter email address"
                                                    className="w-full bg-[#F4F1EA] text-slate-800 rounded-md py-2 pr-8 pl-3 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400"
                                                />
                                                <Mail className="absolute right-2.5 top-2.5 text-slate-400 w-3.5 h-3.5" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-slate-700 font-medium mb-1">
                                                City
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    placeholder="Enter city"
                                                    className="w-full bg-[#F4F1EA] text-slate-800 rounded-md py-2 pr-8 pl-3 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400"
                                                />
                                                <MapPin className="absolute right-2.5 top-2.5 text-slate-400 w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-slate-700 font-medium mb-1">
                                                Preferred Date
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    name="visitDate"
                                                    value={formData.visitDate}
                                                    onChange={handleChange}
                                                    className="w-full bg-[#F4F1EA] text-slate-800 rounded-md py-2 pr-8 pl-3 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400"
                                                />
                                                <Calendar className="absolute right-2.5 top-2.5 text-slate-400 w-3.5 h-3.5 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 font-medium mb-1">
                                            Message (Optional)
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                name="message"
                                                rows={2}
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Any questions or requirements?"
                                                className="w-full bg-[#F4F1EA] text-slate-800 rounded-md py-2 pr-8 pl-3 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-slate-400 resize-none"
                                            />
                                            <Pencil className="absolute right-2.5 top-2.5 text-slate-400 w-3.5 h-3.5" />
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-2 pt-0.5">
                                        <input
                                            type="checkbox"
                                            id="agreed"
                                            name="agreed"
                                            checked={formData.agreed}
                                            onChange={handleChange}
                                            className="mt-0.5 h-3.5 w-3.5 accent-amber-600 border-stone-300 rounded cursor-pointer"
                                        />
                                        <label htmlFor="agreed" className="text-[10px] text-slate-600 leading-tight cursor-pointer">
                                            I agree to be contacted by Echo – The Jungle Resort & Villa regarding my site visit.
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status.loading}
                                        className="w-full mt-1 bg-[#C69A43] hover:bg-[#B58B37] text-white font-medium py-2.5 px-4 rounded-md flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all text-xs tracking-wider uppercase cursor-pointer disabled:opacity-50"
                                    >
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{status.loading ? 'Submitting...' : 'Book a Free Consultation'}</span>
                                    </button>
                                </form>
                            )}

                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Highlight Bar */}
            <div className="bg-[#05160E] border-t border-emerald-900/40 py-5 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-emerald-900/40">
                    {bottomBadges.map((badge, idx) => (
                        <div key={idx} className={`flex items-center space-x-4 ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
                            <div className="flex-shrink-0">
                                {badge.icon}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-white tracking-wide">
                                    {badge.title}
                                </h4>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {badge.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}