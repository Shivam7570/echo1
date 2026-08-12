import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, Clock, Building2, Send, Sparkles } from 'lucide-react';
import { submitEnquiry } from '../../lib/api';

export default function ScheduleVisitModal({ isOpen, onClose, defaultProperty = 'Villas' }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        visitDate: '',
        visitTime: 'Morning (10 AM - 1 PM)',
        propertyType: defaultProperty,
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitEnquiry({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                visitDate: formData.visitDate,
                visitTime: formData.visitTime,
                villaName: formData.propertyType,
                message: formData.message || `Site visit requested for ${formData.propertyType}`,
                source: 'site-visit-modal'
            });
            setSubmitSuccess(true);
            setTimeout(() => {
                setSubmitSuccess(false);
                onClose();
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    city: '',
                    visitDate: '',
                    visitTime: 'Morning (10 AM - 1 PM)',
                    propertyType: defaultProperty,
                    message: ''
                });
            }, 2000);
        } catch (err) {
            alert('Submission failed: ' + (err.message || 'Please try again later.'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-lg bg-[#0C1B14] border border-[#C6A15B]/40 rounded-2xl p-6 md:p-8 shadow-2xl text-stone-200 font-sans max-h-[90vh] overflow-y-auto">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center space-y-1 mb-6">
                    <div className="flex items-center justify-center space-x-2 text-[#C6A15B] text-xs font-semibold uppercase tracking-widest">
                        <Sparkles className="w-4 h-4" />
                        <span>VIP Walkthrough Experience</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide font-normal">
                        Schedule A Site Visit
                    </h2>
                    <p className="text-xs text-stone-400">
                        Experience Echo – The Jungle Resort & Villa in person.
                    </p>
                </div>

                {submitSuccess ? (
                    <div className="py-10 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] text-[#C6A15B] flex items-center justify-center mx-auto">
                            ✓
                        </div>
                        <h3 className="text-xl font-serif text-white">Request Submitted!</h3>
                        <p className="text-xs text-stone-300">
                            Thank you, {formData.name}. Our dedicated relationships manager will call you shortly on {formData.phone} to confirm your visit.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#C6A15B] mb-1 font-semibold">
                                Full Name *
                            </label>
                            <div className="relative">
                                <User className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full bg-[#05110B] border border-stone-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#C6A15B] transition"
                                />
                            </div>
                        </div>

                        {/* Phone & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] uppercase tracking-wider text-[#C6A15B] mb-1 font-semibold">
                                    Phone Number *
                                </label>
                                <div className="relative">
                                    <Phone className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 92175 79077"
                                        className="w-full bg-[#05110B] border border-stone-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#C6A15B] transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] uppercase tracking-wider text-[#C6A15B] mb-1 font-semibold">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@example.com"
                                        className="w-full bg-[#05110B] border border-stone-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#C6A15B] transition"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* City & Interested Property */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] uppercase tracking-wider text-[#C6A15B] mb-1 font-semibold">
                                    Your City
                                </label>
                                <div className="relative">
                                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="e.g. Delhi, Bijnor"
                                        className="w-full bg-[#05110B] border border-stone-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#C6A15B] transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] uppercase tracking-wider text-[#C6A15B] mb-1 font-semibold">
                                    Interest / Project
                                </label>
                                <div className="relative">
                                    <Building2 className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                                    <select
                                        name="propertyType"
                                        value={formData.propertyType}
                                        onChange={handleChange}
                                        className="w-full bg-[#05110B] border border-stone-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#C6A15B] transition appearance-none"
                                    >
                                        <option value="Luxury Villas">Luxury Villas</option>
                                        <option value="Jungle Resort">Jungle Resort</option>
                                        <option value="Master Plan Plot">Master Plan Plot</option>
                                        <option value="Destination Wedding">Destination Wedding</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Visit Date & Preferred Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[11px] uppercase tracking-wider text-[#C6A15B] mb-1 font-semibold">
                                    Preferred Date *
                                </label>
                                <div className="relative">
                                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                                    <input
                                        type="date"
                                        name="visitDate"
                                        required
                                        value={formData.visitDate}
                                        onChange={handleChange}
                                        className="w-full bg-[#05110B] border border-stone-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#C6A15B] transition [color-scheme:dark]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] uppercase tracking-wider text-[#C6A15B] mb-1 font-semibold">
                                    Preferred Slot
                                </label>
                                <div className="relative">
                                    <Clock className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                                    <select
                                        name="visitTime"
                                        value={formData.visitTime}
                                        onChange={handleChange}
                                        className="w-full bg-[#05110B] border border-stone-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-[#C6A15B] transition appearance-none"
                                    >
                                        <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                                        <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                                        <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Message / Additional Note */}
                        <div>
                            <label className="block text-[11px] uppercase tracking-wider text-[#C6A15B] mb-1 font-semibold">
                                Special Requirements (Optional)
                            </label>
                            <textarea
                                name="message"
                                rows={2}
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Let us know if you require pickup or specific details..."
                                className="w-full bg-[#05110B] border border-stone-800 rounded-lg p-3 text-xs text-stone-200 focus:outline-none focus:border-[#C6A15B] transition"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-2 bg-[#C6A15B] hover:bg-[#b38e49] text-[#05110B] font-bold text-xs tracking-widest py-3.5 rounded-lg transition uppercase flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                        >
                            <span>{isSubmitting ? 'SUBMITTING...' : 'CONFIRM SITE VISIT'}</span>
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                )}

                {/* Direct Contact info at bottom */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Direct Hotline:</span>
                    <a
                        href="https://wa.me/919217579077"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#C6A15B] font-semibold hover:underline flex items-center space-x-1"
                    >
                        <span>WhatsApp +91 9217579077</span>
                    </a>
                </div>

            </div>
        </div>
    );
}
